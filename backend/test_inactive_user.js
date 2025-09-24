const knex = require('knex')(require('./config/knexfile').development);
const bcrypt = require('bcryptjs');

async function createInactiveUser() {
    try {
        // Crear un usuario inactivo para probar la funcionalidad
        const hashedPassword = await bcrypt.hash('password123', 10);
        
        const [userId] = await knex('Usuario').insert({
            Nombres: 'Usuario',
            Apellidos: 'Inactivo',
            Email: 'inactivo@test.com',
            Identificacion: '9999999999',
            Contraseña: hashedPassword,
            Direccion: 'Dirección de prueba',
            Telefono: '3000000000',
            IdRol: 1, // Usuario
            IdEstado: 2 // Inactivo
        });

        console.log('Usuario inactivo creado con ID:', userId);
        console.log('Email: inactivo@test.com');
        console.log('Contraseña: password123');
        
    } catch (error) {
        console.error('Error creando usuario inactivo:', error);
    } finally {
        await knex.destroy();
    }
}

createInactiveUser();