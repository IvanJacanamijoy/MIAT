//importamos la conexion a la base de datos
const pool = require('../config/database')

class Cita{
    //metodo asincronico para obtener todos los datos de la tabla cita
    static async getAll(){
        //a traves de una funcion asincronica obtenemos todos los registros de la tabla citas
        const [rows] = await pool.query('SELECT * FROM citas');
        return rows;
    }

    //resto de metodos de (create, update, delete)
}

//exportamos el modelo cita
module.exports = Cita;




