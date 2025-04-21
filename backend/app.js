//importamos las variables de entorno
require('dotenv').config()
//importamos express
const express = require('express');
//importamos cors para evitar error de cors
const cors = require('cors');
//creamos una app con express
const app = express();
//importamos el router de citas
const citaRouter = require('./routes/citaRoutes')

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/citas', citaRouter);


//manejamos errores -> en caso de ingresar una ruta que no exista
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Hay algun error en la ruta ingresada'
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
})

module.exports = app;