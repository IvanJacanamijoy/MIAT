//usamos las variables de entorno
require('dotenv').config();

//conexion a la base de datos

//importamos la libra de knex para realizar la conexion a la base de datos
//y le pasamos como parametro el gestor de base de datos que vamos a usar
//y los datos para conectarnos a la base de datos
const knex = require('knex');({
    client: 'mysql2',
    connection:{
        host: process.env.DB_HOST,
        user: process.env.DB_PASSWORD,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    }
})

//exportamos la conexion a la base de datos
module.exports = knex;
