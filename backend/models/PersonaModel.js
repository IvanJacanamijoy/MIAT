//importamos knex y pasamos la configuracion para la conexion a la base de datos
const knex = require('knex')(require('../knexfile').development);


class PersonaModel {
    /*Obtener todas las personas
        Funcion asincrona que espera el resultado de la consulta (SELECT * FROM persona)*/
    async getAllPersonas(){
        //intentamos ajecutar la consulta (manejo de errores)
        try{
            const resultQuery = await knex('Persona').select('*');
            return resultQuery;
        }catch(error){
            //en caso de error retornamos el error
            return 'Error buscando persona : ' + error;
        }
    }
    /*Obtener una persona por ID 
        funcion asyncrona que espera el resultado de la consulta ()*/
    async getPersonaById(id){
        //intentamos ajecutar la consulta (manejo de errores)
        try {
            //guardamos el primer registro que cumpla con la condicion (IdPersona = id)
            // y retornamos el resultado de la consulta
            const resultQuery = knex('persona').where({IdPersona : id}).first();
            return resultQuery;
        } catch (error) {
            //en caso de algun error retornamos el error
            return 'Error buscando persona con id ' + id + ': ' + error;
        }
    }
    /*Crear una persona
        funcion asyncrona que espera el resultado de la consulta*/
    async createPersona(personaData){
        //intentamos ajecutar la consulta (manejo de errores)
        try {
            //guardamos el resultado de la consulta
            const [id] = await knex('persona').insert(personaData);
            //guardamos la persona recien creada ejecutando una consulta
            const newPersona = this.getPersonaById(id);
            //retornamos la persona creada
            return newPersona;
        } catch (error) {
            //en caso de algun error retornamos el error
            return 'Error creando una persona : ' + error;
        }
    }
    /*Actualizando una persona
        funcion asyncrona que espera el resultado de la consulta*/
    async updatePersona(id, personaData){
        //intentamos ajecutar la consulta (manejo de errores)
        try {
            //guardamos el resultado de la consulta
            const affectRows = await knex('persona').where({IdPersona: id}).update(personaData);
            //si nunguna fue afectada se retorna un string indicando que no se encontro a la persona con dicho id
            if (affectRows === 0){
                return 'No se encontro a la persona con ese id'
            }
            //devolvemos la persona actualizada
            return this.getPersonaById(id);
        } catch (error) {
            //en caso de algun error retornamos el error
            return 'Error actualizando persona con id ' + id + ': ' + error;
        }
    }
    /*Eliminando una persona
        funcion asyncrona que espera el resultado de la consulta*/
    async deletePersona(id){
        //intentamos ajecutar la consulta (manejo de errores)
        try {
            //capturamos la cantidad de filas afectadas
            const affectRows = await knex('persona').where({IdPersona: id}).del();
            return 'se elimino a la persona correctamente';
        } catch (error) {
            //en caso de algun error retornamos el error
            return 'Error al eliminar la persona con el ' + id + ': ' + error;
        }
    }
}
//exportamos una instancia del modelo
module.exports = new PersonaModel();