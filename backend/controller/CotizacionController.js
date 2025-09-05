const CotizacionModel = require('../models/CotizacionModel');

class CotizacionController {
    async getAllCotizaciones(req, res) {
        try {
            const filters = req.params;
            const options = {
                orderBy: req.query.orderBy,
                orderDirection: req.query.orderDirection,
                limit: req.query.limit ? parseInt(req.query.limit) : undefined,
                offset: req.query.offset ? parseInt(req.query.offset) : undefined,
            };
            const cotizaciones = await CotizacionModel.getAllCotizaciones(filters, options);
            res.json(cotizaciones);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener cotizaciones', error });
        }
    }

    async getCotizacionById(req, res) {
        try {
            const cotizacion = await CotizacionModel.getCotizacionById(req.params.id);
            if (!cotizacion) {
                return res.status(404).json({ message: 'Cotización no encontrada' });
            }
            res.json(cotizacion);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener cotización', error });
        }
    }

    async createCotizacion(req, res) {
        try {
            const nuevaCotizacion = await CotizacionModel.createCotizacion(req.body);
            res.status(201).json(nuevaCotizacion);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear cotización', error });
        }
    }

    async updateCotizacion(req, res) {
        try {
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
}

module.exports = new CotizacionController();