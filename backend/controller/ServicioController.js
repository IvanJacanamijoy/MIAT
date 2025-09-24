const ServicioModel = require('../models/ServicioModel');
class ServicioController {
    /**
     * Obtiene un servicio específico por su ID.
     * GET /api/servicios/:id
     */
    async getServicioById(req, res) {
        try {
            const { id } = req.params;
            const servicio = await ServicioModel.getById(id);

            if (!servicio) {
                return res.status(404).json({ message: 'Servicio no encontrado.' });
            }

            // Lógica de autorización: el usuario solo puede ver sus propios servicios o si es técnico/admin
            if (req.userRole === 1 && req.userId !== servicio.IdCliente) {
                return res.status(403).json({ message: 'Acceso denegado. No tiene permiso para ver este servicio.' });
            }
            if (req.userRole === 2 && req.userId !== servicio.IdTecnico) {
                return res.status(403).json({ message: 'Acceso denegado. No tiene permiso para ver este servicio.' });
            }
            // Si es administrador (req.userRole === 3), tiene acceso completo

            res.status(200).json(servicio);
        } catch (error) {
            console.error('Error al obtener el servicio:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener el servicio.' });
        }
    };

    /**
 * Obtiene una lista de servicios, con filtros.
 * GET /api/servicios
 */
    async getAllServicios(req, res) {
        try {
            const filters = req.query;
            const options = {
                orderBy: req.query.orderBy || 'IdServicio',
                orderDirection: req.query.orderDirection || 'DESC'
            };

            console.log("Rol del usuario:", req.userRole);
            // Filtrar según el rol del usuario (igual que en CotizacionController)
            if (req.userRole === 1) { // Cliente
                filters.clienteId = req.userId;
            } else if (req.userRole === 2) { // Técnico
                filters.tecnicoId = req.userId;
            }
            // Admin (rol 3) puede ver todos

            // Filtros adicionales desde query
            if (req.query.estadoId) {
                filters.estadoId = parseInt(req.query.estadoId);
            }

            if (req.query.cotizacionId) {
                filters.cotizacionId = parseInt(req.query.cotizacionId);
            }

            if (req.query.fecha && req.query.fecha !== "") {
                filters.fecha = req.query.fecha; // formato YYYY-MM-DD
            }

            if (req.query.clienteIdentificacion !== undefined) {
                filters.clienteIdentificacion = req.query.clienteIdentificacion;
            }

            if (req.query.tipoServicioId) {
                try {
                    filters.tipoServicioId = JSON.parse(req.query.tipoServicioId); // espera un array
                } catch (error) {
                    console.warn("Error al parsear tipoServicioId:", error);
                    filters.tipoServicioId = [];
                }
            }

            const servicios = await ServicioModel.getAll(filters, options);
            res.status(200).json(servicios);
        } catch (error) {
            console.error('Error al obtener la lista de servicios:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener los servicios.' });
        }
    }

    async createServicio(req, res) {
        try {
            const nuevoServicio = await ServicioModel.createServicio(req.body);
            res.status(201).json(nuevoServicio);
        } catch (error) {
            console.error('Error al crear servicio:', error);
            res.status(500).json({ message: 'Error al crear servicio', error });
        }
    }

    async finalizarServicio(req, res) {
        try {
            const { id } = req.params;
            const datosFinales = req.body;

            const servicioFinalizado = await ServicioModel.finalizarServicio(id, datosFinales);
            res.status(200).json(servicioFinalizado);
        } catch (error) {
            console.error('Error al finalizar servicio:', error);
            
            // Si el error es de validación, devolvemos un 400 con el mensaje específico
            if (error.message.includes('Faltan los siguientes datos')) {
                return res.status(400).json({ 
                    message: error.message,
                    type: 'validation_error'
                });
            }
            
            res.status(500).json({ message: 'Error al finalizar servicio', error: error.message });
        }
    }

    async updateServicio(req, res) {
        try {
            const { id } = req.params;
            const datosActualizados = req.body;

            const servicioActualizado = await ServicioModel.updateServicio(id, datosActualizados);
            res.status(200).json(servicioActualizado);
        } catch (error) {
            console.error('Error al actualizar servicio:', error);
            res.status(500).json({ message: 'Error al actualizar servicio', error: error.message });
        }
    }

    async validarDatosCompletos(req, res) {
        try {
            const { id } = req.params;
            const validacion = await ServicioModel.validarDatosCompletos(id);
            res.status(200).json(validacion);
        } catch (error) {
            console.error('Error al validar datos del servicio:', error);
            res.status(500).json({ message: 'Error al validar datos del servicio', error: error.message });
        }
    }

    async uploadServicePhotos(req, res) {
        try {
            const { id } = req.params;
            const files = req.files;

            if (!files || (!files.fotoAntes && !files.fotoDespues)) {
                return res.status(400).json({
                    success: false,
                    message: 'No se han subido archivos'
                });
            }

            const updateData = {};
            
            if (files.fotoAntes && files.fotoAntes[0]) {
                updateData.FotosAntes = files.fotoAntes[0].filename;
            }
            
            if (files.fotoDespues && files.fotoDespues[0]) {
                updateData.FotosDespues = files.fotoDespues[0].filename;
            }

            const servicioActualizado = await ServicioModel.updateServicePhotos(id, updateData);
            
            res.status(200).json({
                success: true,
                message: 'Fotos subidas exitosamente',
                data: servicioActualizado,
                files: {
                    fotoAntes: files.fotoAntes ? files.fotoAntes[0].filename : null,
                    fotoDespues: files.fotoDespues ? files.fotoDespues[0].filename : null
                }
            });
        } catch (error) {
            console.error('Error al subir fotos del servicio:', error);
            res.status(500).json({ 
                success: false,
                message: 'Error al subir fotos del servicio', 
                error: error.message 
            });
        }
    }


}

module.exports = new ServicioController();