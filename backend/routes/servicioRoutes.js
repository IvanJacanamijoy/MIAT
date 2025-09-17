const express = require('express');
const servicioController = require('../controller/ServicioController');
const router = express.Router();

// POST -> ruta para crear un nuevo usuario
router.get('/', servicioController.getAllServicios);
// POST -> ruta que logea un usuario
// router.post('/', authController.login);

module.exports = router;
