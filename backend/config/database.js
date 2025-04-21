//conexion a la base de datos

//importamos mysql
const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'miat',
})

//exportamos la conexion a la base de datos
module.exports = pool;
