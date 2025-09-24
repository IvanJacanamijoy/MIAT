const knex = require('knex')(require('./config/knexfile').development);
const ServicioController = require('./controller/ServicioController');

async function debugFrontendCall() {
    try {
        console.log('=== DEBUG: Simulando llamada del frontend ===\n');
        
        // Obtener el cliente más reciente (ID: 20 - ivan rojas)
        const clienteId = 20;
        
        console.log(`Simulando llamada para cliente ID: ${clienteId}`);
        
        // Simular el objeto req que llega al controlador
        const mockReq = {
            query: {
                clienteId: clienteId
            },
            userRole: 1, // Cliente
            userId: clienteId
        };
        
        const mockRes = {
            status: function(code) {
                this.statusCode = code;
                return this;
            },
            json: function(data) {
                console.log(`\nRespuesta del controlador (status ${this.statusCode}):`);
                console.log(`Número de servicios devueltos: ${data.length}`);
                
                if (data.length > 0) {
                    console.log('\nPrimeros 5 servicios:');
                    data.slice(0, 5).forEach((servicio, index) => {
                        console.log(`${index + 1}. ID: ${servicio.IdServicio}, Cliente ID: ${servicio.IdCliente}, Descripción: ${servicio.Descripcion}`);
                    });
                    
                    // Verificar si hay servicios que no deberían estar
                    const serviciosIncorrectos = data.filter(s => s.IdCliente !== clienteId);
                    if (serviciosIncorrectos.length > 0) {
                        console.log(`\n⚠️  PROBLEMA ENCONTRADO: ${serviciosIncorrectos.length} servicios no pertenecen al cliente ${clienteId}:`);
                        serviciosIncorrectos.forEach(servicio => {
                            console.log(`   - Servicio ID: ${servicio.IdServicio}, Cliente ID: ${servicio.IdCliente}, Descripción: ${servicio.Descripcion}`);
                        });
                    }
                } else {
                    console.log('✅ Correcto: No se devolvieron servicios para este cliente');
                }
                
                return this;
            }
        };
        
        // Llamar al controlador
        await ServicioController.getAllServicios(mockReq, mockRes);
        
        console.log('\n=== Verificación directa en base de datos ===');
        
        // Verificación directa con la misma consulta que usa el modelo
        const serviciosDirectos = await knex('Servicio as S')
            .select('S.IdServicio', 'S.Descripcion', 'S.IdCliente')
            .where('S.IdCliente', clienteId);
        
        console.log(`Servicios encontrados directamente en BD para cliente ${clienteId}: ${serviciosDirectos.length}`);
        
        // También verificar sin filtro para ver todos los servicios
        console.log('\n=== Verificación sin filtro ===');
        const todosLosServicios = await knex('Servicio as S')
            .select('S.IdServicio', 'S.Descripcion', 'S.IdCliente')
            .limit(5);
        
        console.log('Primeros 5 servicios en la BD (sin filtro):');
        todosLosServicios.forEach(servicio => {
            console.log(`  - ID: ${servicio.IdServicio}, Cliente ID: ${servicio.IdCliente}, Descripción: ${servicio.Descripcion}`);
        });
        
    } catch (error) {
        console.error('Error en debug:', error);
    } finally {
        await knex.destroy();
    }
}

debugFrontendCall();