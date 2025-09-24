// Script para debuggear el UserDashboard
// Simula las llamadas que hace el frontend

const API_BASE_URL = 'http://localhost:3000/api';

// Simular token y usuario (reemplazar con datos reales)
const authToken = 'tu_token_aqui';
const usuario = { id: 20 }; // ID del usuario recién registrado

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

async function debugDashboard() {
    console.log('=== DEBUG: UserDashboard Frontend ===\n');
    
    console.log('Simulando llamada del UserDashboard...');
    console.log('Usuario ID:', usuario.id);
    
    // Simular la llamada exacta que hace el UserDashboard
    const serviciosData = await fetchAllServicesApi(authToken, { clienteId: usuario.id });
    
    console.log('\n=== Análisis de los datos recibidos ===');
    console.log('Servicios recibidos:', serviciosData.length);
    
    if (serviciosData.length > 0) {
        console.log('\n⚠️  PROBLEMA: Se recibieron servicios cuando no debería haber ninguno');
        console.log('Primeros 5 servicios:');
        serviciosData.slice(0, 5).forEach((servicio, index) => {
            console.log(`${index + 1}. ID: ${servicio.IdServicio}, Cliente: ${servicio.IdCliente}, Descripción: ${servicio.Descripcion}`);
        });
    } else {
        console.log('✅ Correcto: No se recibieron servicios');
    }
    
    // Simular el cálculo de estadísticas
    const serviciosActivos = serviciosData.filter(s => s.IdEstado !== 3);
    const serviciosCompletados = serviciosData.filter(s => s.IdEstado === 3);
    
    console.log('\n=== Estadísticas calculadas ===');
    console.log('Servicios activos:', serviciosActivos.length);
    console.log('Servicios completados:', serviciosCompletados.length);
    console.log('Total servicios:', serviciosData.length);
}

// Ejecutar solo si se proporciona un token válido
if (process.argv[2]) {
    const token = process.argv[2];
    console.log('Usando token:', token.substring(0, 20) + '...');
    debugDashboard();
} else {
    console.log('Uso: node debug_dashboard.js <token>');
    console.log('Ejemplo: node debug_dashboard.js eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
}