const knex = require('knex')(require('./config/knexfile').development);

async function debugServicios() {
    try {
        console.log('=== DEBUG: Servicios por Cliente ===\n');
        
        // Obtener todos los usuarios clientes
        const clientes = await knex('Usuario')
            .select('IdUsuario', 'Nombres', 'Apellidos', 'Email')
            .where('IdRol', 1)
            .orderBy('IdUsuario', 'desc');
        
        console.log('Clientes registrados:');
        clientes.forEach((cliente, index) => {
            console.log(`${index + 1}. ID: ${cliente.IdUsuario}, Nombre: ${cliente.Nombres} ${cliente.Apellidos}, Email: ${cliente.Email}`);
        });
        
        console.log('\n=== Servicios por Cliente ===\n');
        
        // Para cada cliente, contar sus servicios
        for (const cliente of clientes) {
            const servicios = await knex('Servicio')
                .select('IdServicio', 'Descripcion', 'IdCliente')
                .where('IdCliente', cliente.IdUsuario);
            
            console.log(`Cliente: ${cliente.Nombres} ${cliente.Apellidos} (ID: ${cliente.IdUsuario})`);
            console.log(`  - Servicios: ${servicios.length}`);
            
            if (servicios.length > 0) {
                servicios.forEach(servicio => {
                    console.log(`    * Servicio ID: ${servicio.IdServicio}, Descripción: ${servicio.Descripcion}`);
                });
            }
            console.log('');
        }
        
        // Verificar servicios sin cliente asignado o con cliente inexistente
        console.log('=== Servicios con problemas ===\n');
        
        const serviciosSinCliente = await knex('Servicio')
            .select('IdServicio', 'Descripcion', 'IdCliente')
            .whereNull('IdCliente');
        
        console.log(`Servicios sin cliente asignado: ${serviciosSinCliente.length}`);
        serviciosSinCliente.forEach(servicio => {
            console.log(`  - Servicio ID: ${servicio.IdServicio}, Descripción: ${servicio.Descripcion}`);
        });
        
        const serviciosClienteInexistente = await knex('Servicio as S')
            .select('S.IdServicio', 'S.Descripcion', 'S.IdCliente')
            .leftJoin('Usuario as U', 'S.IdCliente', '=', 'U.IdUsuario')
            .whereNull('U.IdUsuario')
            .whereNotNull('S.IdCliente');
        
        console.log(`\nServicios con cliente inexistente: ${serviciosClienteInexistente.length}`);
        serviciosClienteInexistente.forEach(servicio => {
            console.log(`  - Servicio ID: ${servicio.IdServicio}, Cliente ID: ${servicio.IdCliente}, Descripción: ${servicio.Descripcion}`);
        });
        
        // Obtener el cliente más reciente (probablemente el que reporta el problema)
        const clienteReciente = clientes[0];
        if (clienteReciente) {
            console.log(`\n=== Análisis del cliente más reciente ===`);
            console.log(`Cliente: ${clienteReciente.Nombres} ${clienteReciente.Apellidos} (ID: ${clienteReciente.IdUsuario})`);
            console.log(`Email: ${clienteReciente.Email}`);
            
            // Simular la consulta que hace el dashboard
            const serviciosDelCliente = await knex('Servicio as S')
                .select(
                    'S.IdServicio',
                    'S.Descripcion',
                    'S.IdCliente',
                    'Cliente.Nombres as ClienteNombres',
                    'Cliente.Apellidos as ClienteApellidos'
                )
                .join('Usuario as Cliente', 'S.IdCliente', '=', 'Cliente.IdUsuario')
                .where('S.IdCliente', clienteReciente.IdUsuario);
            
            console.log(`Servicios encontrados para este cliente: ${serviciosDelCliente.length}`);
            serviciosDelCliente.forEach(servicio => {
                console.log(`  - Servicio ID: ${servicio.IdServicio}, Descripción: ${servicio.Descripcion}`);
            });
        }
        
    } catch (error) {
        console.error('Error en debug:', error);
    } finally {
        await knex.destroy();
    }
}

debugServicios();