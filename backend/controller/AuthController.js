//importamos la dependencia de jsonwebtoken
const jwt = require('jsonwebtoken');
//importamos el modelo del usuario
const UsuarioModel = require('../models/UsuarioModel');
//importamos la configuracion de jwt
const jwtConfig = require('../config/jwtConfig');

class AuthController {
    /* Manejando la solicitud para inciar sesión del usuario
        Metodo asincronico que logea al usuario*/
    async login(req, res) {
        //obtenemos el usuario y la contraseña enviada como parametro de la solicitud
        const email = req.body.email;
        const password = req.body.password;

        try {
            //guardamos el resultado de inicio de sesion (true o false)
            const loginUsuario = await UsuarioModel.loginUsuario(email, password);

            if (loginUsuario) {
                //informacion que se enviara a traves de un token
                const payload = {
                    user: {
                        id: loginUsuario.IdUsuario,
                        email: loginUsuario.Email,
                        rol: loginUsuario.IdRol,
                        nombre: loginUsuario.Nombres,
                    }
                }
                //ingresamos la informacion, la contraseña secreta, el tiempo en que se demora en expirar el token, realizamos manejo de errores, en caso de no tener errores se envia el token
                jwt.sign(
                    payload,
                    jwtConfig.secret,
                    { expiresIn: jwtConfig.expiresIn },
                    (err, token) => {
                        if (err) throw err;
                        res.json({ token });
                    }
                );
            } else {
                //en caso de que el usuario no pueda logearse se envia un mensaje que dice "usuario no encontrado"
                res.status(404).json({ message: 'Usuario no encontrado' })
            }
        } catch (error) {
            //en caso de que el usuario tenga la contraseña o usuario incorrecto se envia un mensaje de error"
            res.status(500).json({ message: `Usuario o contraseña incorrecto` })
        }
    }
    /* Manejando la solicitud para crear una Usuario
        metodo asincronico que crea una Usuario */
    async register(req, res) {
        try {
            //obtenemos todos los datos del cuerpo de la request
            const UsuarioData = req.body;
            //comprobamos si el usuario ya se encuentra en la base de datos
            const existingUser = await UsuarioModel.getUsuarioByEmail(UsuarioData.Email);
            if (existingUser) {
                return res.status(409).json({ message: 'El usuario ya existe' });
            }

            //-----------Pendiente validacion de datos------------

            //Manejo de errores
            //intentamos crear un Usuario
            //a partir de los datos enviados creamos una Usuario con el modelo de Usuario
            await UsuarioModel.createUsuario(UsuarioData);
            //si al crear una Usuario nos genera error, se envia una respuesta con 
            //status 201 inidicando que el usuario fue creado exitosamente
            res.status(201).json({ message: 'Usuario registrado correctamente' })
        } catch (error) {
            //-----------Pendiente - Manejar error de email duplicado en la base de datos------------
            //si la request genera un error quedara con un status 500 
            // y retornara un mensaje de error en formato json
            res.status(500).json({ message: 'Error creando al Usuario ', error: error.message })
        }
    }
}

module.exports = new AuthController();