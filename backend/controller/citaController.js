//importamos el modelo Cita
const cita = require('../models/Cita')

const citaController = {
    //funcion asincronica para obtener todas las citas
    //los parametros son request, response y next, next se usa para indicar que continuara ejecutando el codigo
    async obtenerCitas(req, res, next){
        //esperamos como promesa que del modelo cita, obtenda todos los registros a traves del metodo getAll()
        try{
            const citas = await cita.getAll();
            //posteriormente se envia la respuesta obtenida en formato Json
            res.json(citas)
        }catch(error){
            //en caso de error enviamos en error
            next(error)
        }
    }

    //resto de metodos
};

module.exports = citaController;