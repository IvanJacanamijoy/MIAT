//usamos las variables de entorno
require('dotenv').config();

//Exportamos la configuración de knex para realizar la conexion a la base de datos
// pasando las variables para la conexion a traves de las variables de entorno
module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            //  por si no funciona la conexion -> port: "3307"
        }
    }
}
