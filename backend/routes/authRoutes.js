const express = require('express');
const authController = require('../controller/AuthController');
const router = express.Router();

// POST -> ruta para crear un nuevo usuario
router.post('/register', authController.register);

// POST -> ruta que logea un usuario
router.post('/login', authController.login);

// POST -> ruta para solicitar recuperación de contraseña (envía correo con token)
router.post('/forgetpassword', authController.forgetPassword);

// POST -> ruta para restablecer la contraseña con token
router.post('/resetpassword/:token', authController.resetPassword);

module.exports = router;
