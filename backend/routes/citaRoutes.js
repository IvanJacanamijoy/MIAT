//importamos express
const express = require('express')
//guardamos el metodo router de express
const router = express.Router();
//importamos en controlador de la cita
const citaController = require('../controller/citaController')

//pendiente validacion de los datos
// //importamos el esquema de validacion de la cita
// const {obtenerCitasSchema} = require('../validations/citaValidations')
// //importamos el middleware que valida el esquema
// const validateSchema = require('../middlewares/validateSchema')

router.get('/',  citaController.obtenerCitas)

module.exports = router;