const express = require('express');
const router = express.Router();
const CitaServicioController = require('../controller/CitaServicioController');

router.post('/', CitaServicioController.createCita);

module.exports = router;
