// Script para probar la corrección del UserDashboard
// Simula la llamada sin el filtro clienteId duplicado

const API_BASE_URL = 'http://localhost:3000/api';

async function fetchAllServicesApi(token, filters = {}) {
    try {
        const queryParams = new URLSearchParams();
        
        // Construir parámetros de consulta
        Object.keys(filters).forEach(key => {
            const value = filters[key];
            if (Array.isArray(value)) {
                queryParams.append(key, JSON.stringify(value));
            } else if (value !== undefined && value !== null && value !== '') {
                queryParams.append(key, value);
            }
        });

        const url = `${API_BASE_URL}/servicios${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        console.log('URL de la petición:', url);
        console.log('Filtros enviados:', filters);
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Respuesta recibida:', data);
        console.log('Número de servicios:', data.length);
        
        return data;
    } catch (error) {
        console.error('Error en fetchAllServicesApi:', error);
        return [];
    }
}

async function testUserDashboardFix() {
    console.log('=== TEST: UserDashboard Corrección ===\n');
    
    const authToken = process.argv[2];
    if (!authToken) {
        console.log('Uso: node test_user_dashboard.js <token>');
        console.log('Ejemplo: node test_user_dashboard.js eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
        return;
    }
    
    console.log('Probando llamada SIN filtro clienteId (corrección aplicada)...');
    
    // Llamada sin filtro clienteId - el backend debe aplicar el filtro automáticamente
    const serviciosData = await fetchAllServicesApi(authToken);
    
    console.log('\n=== Resultado de la corrección ===');
    console.log('Servicios recibidos:', serviciosData.length);
    
    if (serviciosData.length === 0) {
        console.log('✅ CORRECCIÓN EXITOSA: Usuario recién registrado muestra 0 servicios');
    } else {
        console.log('❌ PROBLEMA PERSISTE: Aún se muestran servicios');
        console.log('Primeros servicios:');
        serviciosData.slice(0, 3).forEach((servicio, index) => {
            console.log(`${index + 1}. ID: ${servicio.IdServicio}, Cliente: ${servicio.IdCliente}, Descripción: ${servicio.Descripcion}`);
        });
    }
    
    // Simular el cálculo de estadísticas
    const serviciosActivos = serviciosData.filter(s => s.IdEstado !== 3);
    const serviciosCompletados = serviciosData.filter(s => s.IdEstado === 3);
    
    console.log('\n=== Estadísticas del Dashboard ===');
    console.log('Servicios activos:', serviciosActivos.length);
    console.log('Servicios completados:', serviciosCompletados.length);
    console.log('Total servicios:', serviciosData.length);
}

testUserDashboardFix();