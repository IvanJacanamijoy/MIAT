//importamos express
const express = require('express')
//guardamos el metodo router de express
const router = express.Router();
//importamos en instancia de la clase controlador de la usuario
const usuarioController = require('../controller/usuarioController');


// GET -> obtener una usuario por id
router.get('/:id', usuarioController.getUsuarioById);
router.get('/', usuarioController.getTodosLosUsuarios);
// POST -> crear una nueva usuario
router.post('/register', usuarioController.createUsuario);
// PUT -> actualizamos los datos de una usuario
router.put('/:id', usuarioController.updateUsuario);
// DELETE -> eliminar una usuario por su id
router.delete('/:id', usuarioController.deleteUsuario);
// POST -> login del usuario
router.post('/login', usuarioController.loginUsuario)
//exportamos el modulo router

//modulo ejecucuion

module.exports = router;