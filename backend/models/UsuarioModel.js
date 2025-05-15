//importamos knex y pasamos la configuracion para la conexion a la base de datos
const knex = require('knex')(require('../knexfile').development);
//importamos bcrypt para encriptar las contraseñas
const bcrypt = require('bcrypt')

class UsuarioModel {
    /*Obtener una Usuario por ID 
        funcion asincrona que espera el resultado de la consulta ()*/
    async getUsuarioById(id){
        //intentamos ajecutar la consulta (manejo de errores)
        try {
            //guardamos el primer registro que cumpla con la condicion (IdUsuario = id)
            // y retornamos el resultado de la consulta
            const resultQuery = knex('usuario').where({IdUsuario : id}).first();
            return resultQuery;
        } catch (error) {
            //en caso de algun error retornamos el error
            return 'Error buscando Usuario con id ' + id + ': ' + error;
        }
    }
    /* funcion asincrona para encripitar la contraseña */
    async hashPassword(password) {
        if(!password){
            throw new Error('La contraseña no puede estar vacia')
        }
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt) 
    }
    /*Crear una Usuario
        funcion asincrona que espera el resultado de la consulta*/
    async createUsuario(UsuarioData){
        //intentamos ajecutar la consulta (manejo de errores)
        try {
            //guardamos la contraseña ingresada por el usuario
            const password = UsuarioData.Contraseña;
            //encriptamos la contraseña
            const contraseñaHash = await this.hashPassword(password);
            //guardamos el resultado de la consulta
            const [IdUsuario] = await knex('usuario').insert({
                nombres: UsuarioData.Nombres,
                apellidos: UsuarioData.Apellidos,
                email: UsuarioData.Email,
                identificacion: UsuarioData.Identificacion,
                contraseña: contraseñaHash,
                direccion: UsuarioData.Direccion,
                telefono: UsuarioData.Telefono,
                IdRol: UsuarioData.IdRol
            });
            //guardamos la Usuario recien creada ejecutando una consulta
            const newUsuario = this.getUsuarioById(IdUsuario);
            //retornamos la Usuario creado
            return newUsuario;
        } catch (error) {
            //en caso de algun error retornamos el error
            return 'Error creando una Usuario : ' + error;
        }
    }
    /*Actualizando una Usuario
        funcion asincrona que espera el resultado de la consulta*/
    async updateUsuario(id, UsuarioData){
        //intentamos ajecutar la consulta (manejo de errores)
        try {
            //guardamos el resultado de la consulta
            const affectRows = await knex('usuario').where({IdUsuario: id}).update(UsuarioData);
            //si nunguna fue afectada se retorna un string indicando que no se encontro a la Usuario con dicho id
            if (affectRows === 0){
                return 'No se encontro a la usuario con ese id'
            }
            //devolvemos la Usuario actualizada
            return this.getUsuarioById(id);
        } catch (error) {
            //en caso de algun error retornamos el error
            return 'Error actualizando usuario con id ' + id + ': ' + error;
        }
    }
    /*Eliminando una Usuario
        funcion asincrona que espera el resultado de la consulta*/
    async deleteUsuario(id){
        //intentamos ajecutar la consulta (manejo de errores)
        try {
            //capturamos la cantidad de filas afectadas
            const affectRows = await knex('usuario').where({IdUsuario: id}).del();
            return 'se elimino a la Usuario correctamente';
        } catch (error) {
            //en caso de algun error retornamos el error
            return 'Error al eliminar la Usuario con el ' + id + ': ' + error;
        }
    }

    /* Lugin del usuario
        funcion asincrona para buscar un usuario por email y verificar contraseña */
    async loginUsuario(email, password){
        //capturamos el email y la contraseña, luego los buscamos en la base de datos
        try {
            const correo = await knex('usuario').where({Email: email});
            const contraseña = await knex('usuario').where({Contraseña:  password});
            const idCorreo = correo.map(correo => correo.IdUsuario)[0];
            const idContraseña = contraseña.map(contraseña => contraseña.IdUsuario)[0];
            if (idCorreo === idContraseña) {
                return this.getUsuarioById(idCorreo);
            }
        } catch (error) {
            return false;
        }
    }
}
//exportamos una instancia del modelo
module.exports = new UsuarioModel();