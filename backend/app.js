//importamos las variables de entorno
const environment = process.env.NODE_ENV || 'development';
const knex = require('knex')(require('./config/knexfile')[environment]);
//importamos express
const express = require('express');
//importamos cors para evitar error de cors
const cors = require('cors');
//creamos una app con express
const app = express();
//importamos las rutas de usuario
const usuarioRouter = require('./routes/usuarioRoutes');
//importamos las rutas de usuario autenticacion
const authRouter = require('./routes/authRoutes');
//importamos las rutas de servicios
const servicioRouter = require('./routes/servicioRoutes');
//importamos las rutas de visitas tecnicas
const visitaTecnicaRouter = require('./routes/VisitaTecnicaRoutes')
//importamos las rutas de diagnostico
const diagnosticoRouter = require('./routes/diagnosticoRoutes');
//importamos las rutas de cotizacion
const cotizacionRouter = require('./routes/cotizacionRoutes');

//puerto del proyecto
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de autenticacion (login, registro)
app.use('/auth', authRouter)
// Rutas de usuario
app.use('/usuarios', usuarioRouter);
// Rutas de servicios
app.use('/servicios', servicioRouter);
// Rutas de visitas tecnicas
app.use('/visitatecnica', visitaTecnicaRouter);
// Rutas de diagnostico
app.use('/diagnostico', diagnosticoRouter);
// Rutas de cotizacion
app.use('/cotizaciones', cotizacionRouter);

// Probando ruta de prueba
app.use('/prueba', (req, res) => {
    res.send('ruta funcionando')
})

//Verificando la conexion a la base de datos
//ejecutamos la consulta 'SELECT 1' se usa comunmente para verificar la conexion 
// sin acceder a ninguna tabla en especifico
knex.raw('SELECT 1').then(() => {
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
    });
});



module.exports = app;
