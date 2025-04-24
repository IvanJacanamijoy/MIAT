//importamos express
const express = require('express')
//guardamos el metodo router de express
const router = express.Router();
//importamos en instancia de la clase controlador de la persona
const personaController = require('../controller/personaController');


// GET -> obtener todas las personas
router.get('/', personaController.getAllPersonas);
// GET -> obtener una persona por id
router.get('/:id', personaController.getPersonaById);
// POST -> crear una nueva persona
router.post('/', personaController.createPersona);
// PUT -> actualizamos los datos de una persona
router.put('/:id', personaController.updatePersona);
// DELETE -> eliminar una persona por su id
router.delete('/:id', personaController.deletePersona);
//exportamos el modulo router
module.exports = router;