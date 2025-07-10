//importamos express
const express = require('express')
//guardamos el metodo router de express
const router = express.Router();
//importamos en instancia de la clase controlador de la usuario
const usuarioController = require('../controller/UsuarioController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');


/* Cada ruta esta protegida con un token de autenticacion y segun el rol que lo solicita*/
// GET -> ruta que obtiene todos los usuarios
router.get('/',authenticateToken, authorizeRoles([3]), usuarioController.getAllUsuarios);
// GET -> ruta para obtener un usuario por id
router.get('/:id',authenticateToken, authorizeRoles([3]), usuarioController.getUsuarioById);
// PUT -> ruta para actualizar los datos de un usuario
router.put('/:id',authenticateToken, authorizeRoles([3]), usuarioController.updateUsuario);
// DELETE -> ruta para eliminar un usuario por su id
router.delete('/:id',authenticateToken, authorizeRoles([3]), usuarioController.deleteUsuario);

//exportamos el modulo router
module.exports = router;