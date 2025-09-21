const express = require('express');
const router = express.Router();
const ServicioController = require('../controller/ServicioController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const { uploadServicePhotos, handleMulterError } = require('../middleware/uploadMiddleware');

// Rutas protegidas
router.get('/', authenticateToken, ServicioController.getAllServicios);
router.get('/:id', authenticateToken, ServicioController.getServicioById);
router.post('/', authenticateToken, ServicioController.createServicio);
router.put('/:id', authenticateToken, ServicioController.updateServicio);
router.put('/:id/finalizar', authenticateToken, ServicioController.finalizarServicio);
router.get('/:id/validar', authenticateToken, ServicioController.validarDatosCompletos);

// Ruta para subir fotos de servicios
router.put('/:id/upload-photos', 
    authenticateToken, 
    uploadServicePhotos, 
    handleMulterError, 
    ServicioController.uploadServicePhotos
);

module.exports = router;