//importamos knex y pasamos la configuracion para la conexion a la base de datos
const knex = require('knex')(require('../config/knexfile').development);
//importamos bcrypt para encriptar las contraseñas
const bcrypt = require('bcrypt');

class UsuarioModel {
    /*Obtener un Usuario por ID*/
    async getUsuarioById(id) {
        try {
            const resultQuery = await knex('usuario').where({ IdUsuario: id }).first();
            return resultQuery;
        } catch (error) {
            return 'Error buscando Usuario con id ' + id + ': ' + error;
        }
    }

    /*Obtener un Usuario por Email*/
    async getUsuarioByEmail(email) {
        try {
            const resultQuery = await knex('usuario').where({ Email: email }).first();
            return resultQuery || false;
        } catch (error) {
            return error;
        }
    }

    /* Obtener todos los usuarios */
    async getAllUsuarios() {
        try {
            return await knex('usuario').select('*');
        } catch (error) {
            return 'Error buscando usuarios: ' + error;
        }
    }

    /* Obtener todos los técnicos (IdRol=2 por defecto) */
    async getAllTecnicos() {
        try {
            return await knex('usuario').where({ IdRol: 2 }).select('*');
        } catch (error) {
            return 'Error buscando técnicos: ' + error;
        }
    }

    /* Encriptar contraseña */
    async hashPassword(password) {
        if (!password) throw new Error('La contraseña no puede estar vacía');
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    /* Crear un Usuario */
    async createUsuario(UsuarioData) {
        try {
            const contraseñaHash = await this.hashPassword(UsuarioData.Contraseña);
            const [IdUsuario] = await knex('usuario').insert({
                Nombres: UsuarioData.Nombres,
                Apellidos: UsuarioData.Apellidos,
                Email: UsuarioData.Email,
                Identificacion: UsuarioData.Identificacion,
                Contraseña: contraseñaHash,
                Direccion: UsuarioData.Direccion,
                Telefono: UsuarioData.Telefono,
                IdRol: UsuarioData.IdRol,
                IdEstado: 1,
            });
            return this.getUsuarioById(IdUsuario);
        } catch (error) {
            return 'Error creando un Usuario : ' + error;
        }
    }

    /* Actualizar Usuario */
    async updateUsuario(id, UsuarioData) {
        try {
            const affectRows = await knex('usuario').where({ IdUsuario: id }).update(UsuarioData);
            if (affectRows === 0) return 'No se encontró usuario con ese id';
            return this.getUsuarioById(id);
        } catch (error) {
            return 'Error actualizando usuario con id ' + id + ': ' + error;
        }
    }

    /* Eliminar Usuario */
    async deleteUsuario(id) {
        try {
            await knex('usuario').where({ IdUsuario: id }).del();
            return 'Usuario eliminado correctamente';
        } catch (error) {
            return 'Error al eliminar usuario con id ' + id + ': ' + error;
        }
    }

    /* Login de usuario */
    async loginUsuario(email, password) {
        try {
            const usuario = await knex('usuario').where({ Email: email }).first();
            if (!usuario) return false;

            const contraseñaCoincide = await bcrypt.compare(password, usuario.Contraseña);
            return contraseñaCoincide ? this.getUsuarioById(usuario.IdUsuario) : false;
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            return false;
        }
    }

    /* ======================== NUEVOS MÉTODOS PARA RESET ======================== */

    // Guardar el token de recuperación
    async saveResetToken(idUsuario, tokenHash, expireTime) {
        try {
            await knex('usuario')
                .where({ IdUsuario: idUsuario })
                .update({
                    ResetPasswordToken: tokenHash,
                    ResetPasswordExpire: expireTime
                });
            return true;
        } catch (error) {
            console.error("Error guardando reset token:", error);
            return false;
        }
    }

    // Buscar usuario por token de recuperación
    async findByResetToken(tokenHash) {
        try {
            return await knex('usuario')
                .where({ ResetPasswordToken: tokenHash })
                .first();
        } catch (error) {
            console.error("Error buscando usuario por token:", error);
            return null;
        }
    }

    // Actualizar contraseña
    async updatePassword(idUsuario, newPasswordHash) {
        try {
            await knex('usuario')
                .where({ IdUsuario: idUsuario })
                .update({ Contraseña: newPasswordHash });
            return true;
        } catch (error) {
            console.error("Error actualizando contraseña:", error);
            return false;
        }
    }

    // Limpiar token de recuperación
    async clearResetToken(idUsuario) {
        try {
            await knex('usuario')
                .where({ IdUsuario: idUsuario })
                .update({
                    ResetPasswordToken: null,
                    ResetPasswordExpire: null
                });
            return true;
        } catch (error) {
            console.error("Error limpiando reset token:", error);
            return false;
        }
    }
}

module.exports = new UsuarioModel();
