//importamos las variables de entorno
require('dotenv').config()
//importamos express
const express = require('express');
//importamos cors para evitar error de cors
const cors = require('cors');
//creamos una app con express
const app = express();
//importamos las rutas de persona
const personaRouter = require('./routes/personaRoutes');
//inicializamos knex
const knex = require('knex')(require('./knexfile').development);
//puerto del proyecto
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de persona
app.use('/personas', personaRouter);

// Probando ruta de prueba
app.use('/prueba', (req, res)=>{
    res.send('ruta funcionando')
})

//Verificando la conexion a la base de datos
//ejecutamos la consulta 'SELECT 1' se usa comunmente para verificar la conexion 
// sin acceder a ninguna tabla en especifico
knex.raw('SELECT 1').then( () => {
    //si la conexion es esxitosa se muestra en la consola un mensaje indicando esto
    console.log(`Conexión a la base de datos de ${process.env.DB_NAME} exitosa`);
    //El servidor se inicia solo si laconexion a la base de datos es exitosa
    app.listen(PORT, () => {
        console.log('Servidor corriendo en http//localhost:' + PORT);
    })
}).catch((error) => {
    //en caso de algun error se muestro en la consola un mensaje de error
    console.log('Error conectando a la base de datos ', error);
    //detenemos el proceso en caso de no conectarnos a la base de datos
    process.exit(1);
})

//manejamos errores -> en caso de ingresar una ruta que no exista
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Hay algun error en la ruta ingresada'
    })
})



module.exports = app;