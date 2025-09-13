import apiRequest from '../utils/apiclient';

export const fetchAllServicesApi = async (authToken, queryParams = '') => {
  try {
    // Construir la URL con query string si existe
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
