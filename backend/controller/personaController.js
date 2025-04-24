//importamos una instancia de la clase persona
const personaModel = require('../models/personaModel')
//exportamos la clase persona
class PersonaController {
    /* Manejando la solicitud de para obtener todas las personas
    metodo asincrono que obtiene a todas las personas de la base de datos*/
    async getAllPersonas(req, res) {
        //Manejo de errores
        //intentamos ejecutar la consulta
        try {
            //guardamos a todas las personas en la variable personas
            const personas = await personaModel.getAllPersonas();
            //enviamos la respuesta en formato json
            res.json(personas)
        } catch (error) {
            /* si hay un error buscando las personas respondemos con un
             status 500 y el mensaje de error en dormato json*/
            res.status(500).json({
                message: 'Error buscando personas', error: error.message
            });
        }
    }
    /* Manejando la solicitud para obtener una persona por su id
    metodo asincronico que obtiene una persona por su id */
    async getPersonaById(req, res) {
        //obtenemos el id de los parametros de la request
        const id = req.params.id;
        //Manejo de errores
        //intentamos ejecutar la consulta
        try {
            //guardamos el resultado de la consulta en la variable persona
            const persona = await personaModel.getPersonaById(id);
            //si persona existe devolvemos la persona en formato json
            if (persona) {
                res.json(persona);
            } else {
                //sino la request quedara con un status 404 y retornara un mensaje de error en formato json
                res.status(404).json({ message: 'Persona no encontrada' })
            }
        } catch (error) {
            //si la request genera un error quedara con un status 500 
            // y retornara un mensaje de error en formato json
            res.status(500).json({ message: `Error buscando a la persona con id ${id}`, error: error.message })
        }
    }
    /* Manejando la solicitud para crear una persona
    metodo asincronico que crea una persona */
    async createPersona(req, res) {
        //obtenemos todos los datos del cuerpo de la request
        const personaData = req.body;
        //-----------Pendiente validacion de datos------------
        //Manejo de errores
        //intentamos crear una persona
        try {
            //a partir de los datos enviados creamos una persona con el modelo de persona
            const newPersona = await personaModel.createPersona(personaData);
            //si al crear una persona no genera error, se envia una respuesta con 
            //status 201 donde se encuentra los datos de la persona recien creada en formato json
            res.status(201).json(newPersona)
        } catch (error) {
            //-----------Pendiente - Manejar error de email duplicado en la base de datos------------
            //si la request genera un error quedara con un status 500 
            // y retornara un mensaje de error en formato json
            res.status(500).json({ message: 'Error creando a la persona ', error: error.message })
        }
    }
    /* Manejando la solicitud para actualizar una persona 
    metodo asincronico que actualiza una persona */
    async updatePersona(req, res) {
        //obtenemos el id de los parametros de la request 
        const id = req.params.id;
        //obtenemos todos los datos del cuerpo de la request
        const personaData = req.body;
        //-----------Pendiente validacion de datos------------
        //Manejo de errores
        //intenamos actualizar una persona
        try {
            //guardamos el resultado de intentar actualizar a la persona, usando su id 
            // y los datos ingresados en la request
            const updatePersona = await personaModel.updatePersona(id, personaData);
            //si se actualizo exitosamente regresamos los datos de la persona actualizada en formato json
            if (updatePersona) {
                res.json(updatePersona);
            } else {
                //sino la respuesta tendra un status 404 y retornara una respuesta en formato json
                res.status(404).json({ message: 'Persona no encontrada' })
            }
        } catch (error) {
            //-----------Pendiente - Manejar error de email duplicado en la base de datos------------
            //si la request genera un error quedara con un status 500 
            // y retornara un mensaje de error en formato json
            res.status(500).json({ message: `Error actualizando a la persona con el id ${id}`, error: error.message })
        }
    }
    /* Manejando la solicitud para eliminar una persona 
    metodo asincronico que elimina una persona */
    async deletePersona(req, res) {
        //obtenemos el id de los parametros de la request 
        const id = req.params.id;
        //Manejo de errores
        //intenamos eliminar una persona
        try {
            //guardamos el resultado de intentar eliminar a la persona, usando su id
            const deletePersona = await personaModel.deletePersona(id);
            //si se elimino la persona respondemos la solicitud con un mensaje exitoso en formato json
            if (deletePersona) {
                res.json({ message: 'Persona eliminada exitosamente' });
            } else {
                //sino respondemos la solicitud con un status 404 y un mensaje en formato json
                res.status(404).json({ message: 'Persona no encontrada' })
            }
        } catch (error) {
            //si la request genera un error quedara con un status 500 
            // y retornara un mensaje de error en formato json
            res.status(500).json({ message: `Error eliminando a la persona con el id ${id}`, error: error.message })
        }
    }
}
//exportamos una instancia de la clase personaController
module.exports = new PersonaController();