//importamos una instancia de la clase Usuario
const UsuarioModel = require('../models/UsuarioModel')
//exportamos la clase Usuario
class UsuarioController {
    /* Manejando la solicitud para obtener una Usuario por su id
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
    async getTodosLosUsuarios(req, res) {
        try {
            const usuarios = await UsuarioModel.getTodosLosUsuarios();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los usuarios', error: error });
        }
    }
    /* Manejando la solicitud para obtener un Usuario por su identificacion
    metodo asincronico que obtiene una Usuario por su identificacion */
    async getUsuarioByIdentificacion(req, res) {
        console.log(`La identificacion es : ${req.params.identificacion}`)
        // obtenemos la identificacion de los parametros de la request
        const identificacion = req.params.identificacion;

        // Manejo de errores
        // intentamos ejecutar la consulta
        try {
            // guardamos el resultado de la consulta en la variable usuario
            const usuario = await UsuarioModel.getUsuarioByIdentificacion(identificacion);
            // si usuario existe devolvemos el usuario en formato json
            if (usuario) {
                console.log(usuario)
                // Mapea el ID de Knex a _id para compatibilidad con el frontend si es necesario
                res.json(usuario);
            } else {
                // sino la request quedara con un status 404 y retornara un mensaje de error en formato json
                res.status(404).json({ message: 'Usuario no encontrado alv' });
            }
        } catch (error) {
            // si la request genera un error quedara con un status 500
            // y retornara un mensaje de error en formato json
            // Nota: Aquí se usaba 'id' en el mensaje de error, lo cambié a 'identificacion'
            res.status(500).json({ message: `Error buscando al usuario con identificación ${identificacion}`, error: error.message });
        }
    }
    /* Manejando la solicitud para crear una Usuario
    metodo asincronico que crea una Usuario */
    async createUsuario(req, res) {
        //obtenemos todos los datos del cuerpo de la request
        const UsuarioData = req.body;
        //-----------Pendiente validacion de datos------------
        //Manejo de errores
        //intentamos crear una Usuario
        try {
            //a partir de los datos enviados creamos una Usuario con el modelo de Usuario
            const newUsuario = await UsuarioModel.createUsuario(UsuarioData);
            //si al crear una Usuario no genera error, se envia una respuesta con 
            //status 201 donde se encuentra los datos de la Usuario recien creada en formato json
            res.status(201).json(newUsuario)
        } catch (error) {
            //-----------Pendiente - Manejar error de email duplicado en la base de datos------------
            //si la request genera un error quedara con un status 500 
            // y retornara un mensaje de error en formato json
            res.status(500).json({ message: 'Error creando al Usuario ', error: error.message })
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
        //intenamos actualizar una Usuario
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
            //-----------Pendiente - Manejar error de email duplicado en la base de datos------------
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
    /* Manejando la solicitud para inciar sesión del usuario
        Metodo asincronico que logea al usuario*/
    async loginUsuario(req, res) {
        //obtenemos el usuario y la contraseña enviada como parametro de la solicitud
        const email = req.body.email;
        const password = req.body.password;
        try {
            //guardamos el resultado de inicio de sesion
            const loginUsuario = await UsuarioModel.loginUsuario(email, password);

            if (loginUsuario) {
                res.json({
                    id: loginUsuario.IdUsuario,
                    email: loginUsuario.Email,
                    rol: loginUsuario.IdRol,
                    nombre: loginUsuario.Nombres,
                })
            } else {
                res.status(404).json({ message: 'Usuario no encontrado' })
            }
        } catch (error) {
            res.status(500).json({ message: `Usuario o contraseña incorrecto` })
        }
    }
}
//exportamos una instancia de la clase UsuarioController
module.exports = new UsuarioController();