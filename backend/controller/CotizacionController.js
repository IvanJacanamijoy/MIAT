const CotizacionModel = require('../models/CotizacionModel');
const ServicioModel = require('../models/ServicioModel');
const knex = require('knex')(require('../config/knexfile').development);

class CotizacionController {
    // Obtener todas las cotizaciones con control de permisos
    async getAllCotizaciones(req, res) {
        try {
            const filters = req.query;
            const options = {
                orderBy: req.query.orderBy,
                orderDirection: req.query.orderDirection,
                limit: req.query.limit ? parseInt(req.query.limit) : undefined,
                offset: req.query.offset ? parseInt(req.query.offset) : undefined,
            };
            
            // Filtrar según el rol del usuario
            if (req.userRole === 1) { // Cliente
                filters.IdCliente = req.userId;
            } else if (req.userRole === 2) { // Técnico
                filters.IdTecnico = req.userId;
            }
            // Admin (rol 3) puede ver todas
            
            const cotizaciones = await CotizacionModel.getAllCotizaciones(filters, options);
            res.json(cotizaciones);
        } catch (error) {
            console.error("Error en getAllCotizaciones:", error);
            res.status(500).json({ message: 'Error al obtener cotizaciones', error });
        }
    }

    // Obtener cotización por ID con control de permisos
    async getCotizacionById(req, res) {
        try {
            const cotizacion = await CotizacionModel.getCotizacionById(req.params.id);
            if (!cotizacion) {
                return res.status(404).json({ message: 'Cotización no encontrada' });
            }

            // Verificar permisos
            if (req.userRole === 1 && cotizacion.IdCliente !== req.userId) {
                return res.status(403).json({ message: 'Acceso denegado' });
            }
            if (req.userRole === 2 && cotizacion.IdTecnico !== req.userId) {
                return res.status(403).json({ message: 'Acceso denegado' });
            }

            res.json(cotizacion);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener cotización', error });
        }
    }

    async createCotizacion(req, res) {
        try {
            const cotizacionData = {
                ...req.body,
                FechaCreacion: new Date() // Agregar fecha de creación
            };
            
            const nuevaCotizacion = await CotizacionModel.createCotizacion(cotizacionData);
            res.status(201).json({
                success: true,
                message: 'Cotización creada exitosamente',
                data: nuevaCotizacion
            });
        } catch (error) {
            console.error('Error al crear cotización:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor',
                error: error.message
            });
        }
    }

    // Actualizar cotización con control de permisos
    async updateCotizacion(req, res) {
        try {
            const cotizacion = await CotizacionModel.getCotizacionById(req.params.id);
            if (!cotizacion) {
                return res.status(404).json({ message: 'Cotización no encontrada' });
            }

            // Solo técnico que la creó o admin pueden editarla
            if (req.userRole === 2 && cotizacion.IdTecnico !== req.userId) {
                return res.status(403).json({ message: 'Acceso denegado' });
            }

            const cotizacionActualizada = await CotizacionModel.updateCotizacion(req.params.id, req.body);
            res.json(cotizacionActualizada);
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar cotización', error });
        }
    }

    async deleteCotizacion(req, res) {
        try {
            await CotizacionModel.deleteCotizacion(req.params.id);
            res.json({ message: 'Cotización eliminada' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar cotización', error });
        }
    }

    // Actualizar estado de cotización (aceptar/rechazar) - Método mejorado de QuoteController
    async updateQuoteStatus(req, res) {
        try {
            const { id } = req.params;
            const { IdEstado } = req.body;

            if (!IdEstado) {
                return res.status(400).json({ message: 'IdEstado es requerido' });
            }

            const cotizacion = await CotizacionModel.getCotizacionById(id);
            if (!cotizacion) {
                return res.status(404).json({ message: 'Cotización no encontrada' });
            }

            // Verificar permisos: solo el cliente puede aceptar/rechazar su cotización
            if (req.userRole === 1 && cotizacion.IdCliente !== req.userId) {
                return res.status(403).json({ message: 'Solo puede modificar sus propias cotizaciones' });
            }

            // Verificar que la cotización esté en estado "Pendiente" (IdEstado = 5)
            if (cotizacion.IdEstado !== 5) {
                return res.status(400).json({ message: 'Solo se pueden aceptar/rechazar cotizaciones pendientes' });
            }

            // Actualizar el estado de la cotización
            await CotizacionModel.updateCotizacion(id, { IdEstado });

            let mensaje = 'Estado de cotización actualizado';
            let servicioId = null;

            // Si se acepta la cotización (IdEstado = 6 "Aceptada")
            if (IdEstado == 6) {
                try {
                    // Validar que la cotización tenga IdCliente e IdTecnico
                    if (!cotizacion.IdCliente || !cotizacion.IdTecnico) {
                        console.error('Error: Cotización sin IdCliente o IdTecnico:', {
                            IdCotizacion: id,
                            IdCliente: cotizacion.IdCliente,
                            IdTecnico: cotizacion.IdTecnico,
                            cotizacion: cotizacion
                        });
                        return res.status(400).json({ 
                            message: 'La cotización no tiene cliente o técnico asignado' 
                        });
                    }

                    // Crear el servicio automáticamente
                    const nuevoServicio = {
                        Descripcion: `Servicio generado desde cotización #${id}`,
                        IdCliente: cotizacion.IdCliente,
                        IdTecnico: cotizacion.IdTecnico,
                        IdCotizacion: parseInt(id),
                        IdEstado: 5 // Pendiente
                    };

                    console.log('Creando servicio con datos:', nuevoServicio);
                    const servicio = await ServicioModel.createServicio(nuevoServicio);
                    servicioId = servicio.IdServicio;
                    mensaje = 'Cotización aceptada y servicio creado exitosamente';
                } catch (serviceError) {
                    console.error('Error al crear servicio:', serviceError);
                    // Revertir el cambio de estado si falla la creación del servicio
                    await CotizacionModel.updateCotizacion(id, { IdEstado: 5 });
                    return res.status(500).json({ 
                        message: 'Error al crear el servicio. La cotización permanece pendiente.' 
                    });
                }
            } else if (IdEstado == 7) {
                mensaje = 'Cotización rechazada';
            }

            res.json({ 
                message: mensaje,
                servicioId: servicioId,
                cotizacionId: id,
                nuevoEstado: IdEstado
            });

        } catch (error) {
            console.error('Error al actualizar estado de cotización:', error);
            res.status(500).json({ message: 'Error al actualizar estado de cotización', error });
        }
    }

    // Método legacy para compatibilidad - redirige al método mejorado
    async aceptarCotizacion(req, res) {
        // Redirigir al método updateQuoteStatus con IdEstado = 6 (Aceptada)
        req.body = { IdEstado: 6 };
        return this.updateQuoteStatus(req, res);
    }

}

module.exports = new CotizacionController();