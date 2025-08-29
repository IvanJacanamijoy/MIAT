const express = require('express');
const router = express.Router();
const CotizacionController = require('../controller/CotizacionController');

// Obtener todas las cotizaciones
router.get('/', CotizacionController.getAllCotizaciones.bind(CotizacionController));

// Obtener una cotización por ID
router.get('/:id', CotizacionController.getCotizacionById.bind(CotizacionController));

// Crear una cotización
router.post('/', CotizacionController.createCotizacion.bind(CotizacionController));

// Actualizar una cotización
router.put('/:id', CotizacionController.updateCotizacion.bind(CotizacionController));

// Eliminar una cotización
router.delete('/:id', CotizacionController.deleteCotizacion.bind(CotizacionController));

module.exports = router;