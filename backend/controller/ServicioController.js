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
        const filters = {};
        const options = {
            orderBy: req.query.orderBy || 'IdServicio',
            orderDirection: req.query.orderDirection || 'DESC'
        };

        // Aplicar filtros basados en el rol del usuario autenticado
        if (req.userRole === 1) { // Rol: Cliente
            filters.clienteId = req.userId;
        } else if (req.userRole === 2) { // Rol: Técnico
            filters.tecnicoId = req.userId;
        }

        // Otros filtros desde la query parameters
        if (req.query.estadoId) filters.estadoId = parseInt(req.query.estadoId);
        if (req.query.cotizacionId) filters.cotizacionId = parseInt(req.query.cotizacionId);

        try {
            const servicios = await ServicioModel.getAll(filters, options);
            console.log(servicios)
            res.status(200).json(servicios);
        } catch (error) {
            console.error('Error al obtener la lista de servicios:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener los servicios.' });
        }
    };
}

module.exports = new ServicioController();