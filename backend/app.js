//importamos las variables de entorno
require('dotenv').config()
//importamos express
const express = require('express');
//importamos cors para evitar error de cors
const cors = require('cors');
const path = require('path');
//creamos una app con express
const app = express();

//inicializamos knex
const knex = require('knex')(require('./config/knexfile').development);
//puerto del proyecto
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const citaServicioRoutes = require('./routes/citaServicio');
const visitaTecnicaRoutes = require('./routes/VisitaTecnicaRoutes');
const diagnosticoRoutes = require('./routes/diagnosticoRoutes');
const cotizacionRoutes = require('./routes/cotizacionRoutes');
const servicioRoutes = require('./routes/servicioRoutes');

// Usar rutas
app.use('/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/citas', citaServicioRoutes);
app.use('/visitas-tecnicas', visitaTecnicaRoutes);
app.use('/diagnosticos', diagnosticoRoutes);
app.use('/cotizaciones', cotizacionRoutes);
app.use('/servicios', servicioRoutes);


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
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
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