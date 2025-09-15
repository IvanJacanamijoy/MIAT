// src/api/cotizaciones.js
import apiRequest from '../utils/apiclient';

/**
 * Convierte un objeto de filtros en una query string válida.
 * Serializa arrays como JSON y omite valores vacíos o undefined.
 */
const buildQueryParams = (filters = {}) => {
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

  return params.toString(); // Ejemplo: "estadoId=2&tipoServicioId=%5B1%2C2%5D"
};

/**
 * 🔍 Obtener cotizaciones con filtros
 * @param {string} authToken - Token de autenticación
 * @param {object} filters - Objeto con filtros (estadoId, tipoServicioId, fecha, etc.)
 * @returns {Promise<Array>} - Lista de cotizaciones
 */
export const fetchCotizacionesApi = async (authToken, filters = {}) => {
  // console.log("Recibido en fetchCotizacionesApi:", filters);

  try {
    // console.log("Filters being sent to fetchCotizacionesApi:", filters);
    const queryString = buildQueryParams(filters);
    // console.log("Fetching cotizaciones with filters:", filters);
    const url = `/cotizaciones${queryString ? `?${queryString}` : ''}`;

    const data = await apiRequest(url, 'GET', null, authToken);

    return data;
  } catch (error) {
    console.error('Error fetching cotizaciones:', error);
    throw error;
  }
};


// 📝 Crear una nueva cotización
export const createCotizacionApi = async (cotizacionData, authToken) => {
  try {
    const data = await apiRequest('/cotizaciones', 'POST', cotizacionData, authToken);
    return data;
  } catch (error) {
    console.error('Error creating cotización:', error);
    throw error;
  }
};

// ✏️ Actualizar cotización
export const updateCotizacionApi = async (cotizacionId, updatedData, authToken) => {
  try {
    const data = await apiRequest(`/cotizaciones/${cotizacionId}`, 'PUT', updatedData, authToken);
    return data;
  } catch (error) {
    console.error('Error updating cotización:', error);
    throw error;
  }
};

// 🗑️ Eliminar cotización
export const deleteCotizacionApi = async (cotizacionId, authToken) => {
  try {
    const data = await apiRequest(`/cotizaciones/${cotizacionId}`, 'DELETE', null, authToken);
    return data;
  } catch (error) {
    console.error('Error deleting cotización:', error);
    throw error;
  }
};

