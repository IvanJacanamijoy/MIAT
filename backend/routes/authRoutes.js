const express = require('express');
const authController = require('../controller/authController');
const router = express.Router();

// POST -> ruta para crear un nuevo usuario
router.post('/register', authController.register);
// POST -> ruta que logea un usuario
router.post('/login', authController.login);

module.exports = router;