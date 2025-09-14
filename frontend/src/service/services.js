import apiRequest from '../utils/apiclient';

/**
 * Convierte un objeto de filtros en una cadena de consulta URL válida.
 * Arrays como tipoServicioId se serializan como JSON.
 */
export const buildQueryParams = (filters = {}) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      if (value.length > 0) {
        params.append(key, JSON.stringify(value));
      }
    } else if (value !== undefined && value !== '') {
      params.append(key, value);
    }
  });

  return params.toString(); // Ejemplo: "fecha=2024-08-01&tipoServicioId=%5B1%5D"
};

/**
 * Realiza una petición GET a /servicios con filtros opcionales.
 * @param {string} authToken - Token de autenticación
 * @param {object} filters - Objeto con filtros (fecha, tipoServicioId, etc.)
 * @returns {Promise<Array>} - Lista de servicios
 */
export const fetchAllServicesApi = async (authToken, filters = {}) => {
  try {
    const queryParams = buildQueryParams(filters);
    const url = `/servicios${queryParams ? `?${queryParams}` : ''}`;

    const data = await apiRequest(url, 'GET', null, authToken);

    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.servicios)) {
      return data.servicios;
    }

    throw new Error('Formato de respuesta de la API incorrecto para servicios');
  } catch (error) {
    console.error('Error en fetchAllServicesApi:', error);
    throw error;
  }
};
