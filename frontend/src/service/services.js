// src/api/services.js
const API_BASE_URL = 'http://localhost:3000'; // Asegúrate de que esta sea tu URL base del backend

export const fetchAllServicesApi = async (authToken, queryParams = '') => {
    try {
        // Construye la URL con los parámetros de consulta
        const url = `${API_BASE_URL}/servicios${queryParams ? `?${queryParams}` : ''}`;
        console.log("fetchAllServicesApi: Llamando a URL:", url); // Para depuración

        // Petición siempre será GET para el filtrado por URL
        const response = await fetch(url, {
            method: 'GET', // <-- ¡CORRECCIÓN CLAVE! Siempre 'GET' para query parameters
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${authToken}` // Es recomendable mantener la autenticación aquí
            }
        });

        const data = await response.json(); 

        if (!response.ok) {
            // Si el backend envía un mensaje de error en formato JSON, 'data.message' lo capturará.
            // Si el backend envía HTML o texto, el catch del JSON.parse lo manejará.
            throw new Error(data.message || `Error al obtener los servicios: ${response.status} - ${response.statusText}`);
        }
        
        // Verifica que la respuesta sea un array. 
        // Si tu backend envuelve el array (ej. { data: [...] } o { servicios: [...] }),
        // deberás ajustar esta lógica para extraerlo.
        console.log(data);
        if (Array.isArray(data)) {
            return data;
        } 
        // Si tu backend devuelve un objeto que contiene el array (ej. { servicios: [...] })
        else if (data && typeof data === 'object' && Array.isArray(data.servicios)) { // <-- Ajusta 'servicios' a la clave real de tu backend
            console.warn('La respuesta de la API envuelve el array de servicios en una propiedad "servicios".');
            return data.servicios;
        }
        // Puedes añadir más condiciones 'else if' si hay otras claves (ej. data.results)
        
        // Si no es un array directamente ni un objeto con un array en 'servicios', lanza el error
        console.warn('La respuesta de la API para servicios no es un array como se esperaba, ni un objeto con array reconocido:', data);
        throw new Error('Formato de respuesta de la API incorrecto para servicios: Se esperaba un array o un objeto con array.');
    } catch (error) {
        console.error('Error en fetchAllServicesApi:', error);
        // Si el error original fue por JSON malformado (SyntaxError), lo relanza con un mensaje más claro
        if (error instanceof SyntaxError && error.message.includes('JSON.parse')) {
            throw new Error('Error al parsear la respuesta del servidor como JSON. Posiblemente el servidor no devolvió JSON válido para servicios.');
        }
        throw error; // Relanza el error para que el GenericEntityManager lo capture
    }
};