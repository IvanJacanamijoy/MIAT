//importamos una instancia de la clase Usuario
const UsuarioModel = require('../models/UsuarioModel')
//exportamos la clase Usuario
class UsuarioController {
    /* Manejando la solicitud para obtener un Usuario por su id
    metodo asincronico que obtiene un Usuario por su id */
    async getUsuarioById(req, res) {
        //obtenemos el id de los parametros de la request
        const id = req.params.id;
        //Manejo de errores
        //intentamos ejecutar la consulta
        try {
            //guardamos el resultado de la consulta en la variable Usuario
            const Usuario = await UsuarioModel.getUsuarioById(id);
            //si Usuario existe devolvemos la Usuario en formato json
            if (Usuario) {
                res.json(Usuario);
            } else {
                //sino la request quedara con un status 404 y retornara un mensaje de error en formato json
                res.status(404).json({ message: 'Usuario no encontrada' })
            }
        } catch (error) {
            //si la request genera un error quedara con un status 500 
            // y retornara un mensaje de error en formato json
            res.status(500).json({ message: `Error buscando a la Usuario con id ${id}`, error: error.message })
        }
    }
    /* Manejando la solicitud para obtener todos los usuarios del sistema
    metodo asincronico que obtiene todos los usuario del sistema */
    async getAllUsuarios(req, res) {
        try {
            //obtenemos todos los usuarios a traves del modelo del usuario y respondemos con el resultado
            const usuarios = await UsuarioModel.getAllUsuarios();
            res.json(usuarios);
        } catch (error) {
            //en caso de algun error retornamos un mensaje de error
            res.status(500).json({ message: 'Error al obtener los usuarios', error: error });
        }
    }
    /* Manejando la solicitud para actualizar una Usuario 
    metodo asincronico que actualiza una Usuario */
    async updateUsuario(req, res) {
        //obtenemos el id de los parametros de la request 
        const id = req.params.id;
        //obtenemos todos los datos del cuerpo de la request
        const UsuarioData = req.body;

        //-----------Pendiente validacion de datos------------

        //Manejo de errores
        //intentamos actualizar una Usuario
        try {
            //guardamos el resultado de intentar actualizar a la Usuario, usando su id 
            // y los datos ingresados en la request
            const updateUsuario = await UsuarioModel.updateUsuario(id, UsuarioData);
            //si se actualizo exitosamente regresamos los datos de la Usuario actualizada en formato json
            if (updateUsuario) {
                res.json(updateUsuario);
            } else {
                //sino la respuesta tendra un status 404 y retornara una respuesta en formato json
                res.status(404).json({ message: 'Usuario no encontrada' })
            }
        } catch (error) {
            //si la request genera un error quedara con un status 500 
            // y retornara un mensaje de error en formato json
            res.status(500).json({ message: `Error actualizando a la Usuario con el id ${id}`, error: error.message })
        }
    }
    /* Manejando la solicitud para eliminar una Usuario 
    metodo asincronico que elimina una Usuario */
    async deleteUsuario(req, res) {
        //obtenemos el id de los parametros de la request 
        const id = req.params.id;
        //Manejo de errores
        //intenamos eliminar una Usuario
        try {
            //guardamos el resultado de intentar eliminar a la Usuario, usando su id
            const deleteUsuario = await UsuarioModel.deleteUsuario(id);
            //si se elimino la Usuario respondemos la solicitud con un mensaje exitoso en formato json
            if (deleteUsuario) {
                res.json({ message: 'Usuario eliminada exitosamente' });
            } else {
                //sino respondemos la solicitud con un status 404 y un mensaje en formato json
                res.status(404).json({ message: 'Usuario no encontrada' })
            }
        } catch (error) {
            //si la request genera un error quedara con un status 500 
            // y retornara un mensaje de error en formato json
            res.status(500).json({ message: `Error eliminando a la Usuario con el id ${id}`, error: error.message })
        }
    }
}
//exportamos una instancia de la clase UsuarioController
module.exports = new UsuarioController();