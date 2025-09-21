// src/service/cotizacion.js
import apiRequest from '../utils/apiclient';

const ENDPOINT = '/cotizaciones';

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

  return params.toString();
};

/**
 * 🔍 Obtener cotizaciones con filtros
 * @param {string} authToken - Token de autenticación
 * @param {object} filters - Objeto con filtros (estadoId, tipoServicioId, fecha, etc.)
 * @returns {Promise<Array>} - Lista de cotizaciones
 */
export const fetchCotizacionesApi = async (authToken, filters = {}) => {
  try {
    const queryString = buildQueryParams(filters);
    const url = `${ENDPOINT}${queryString ? `?${queryString}` : ''}`;
    const data = await apiRequest(url, 'GET', null, authToken);
    return data;
  } catch (error) {
    console.error('Error fetching cotizaciones:', error);
    throw error;
  }
};

/**
 * 📝 Crear una nueva cotización
 * @param {object} cotizacionData - Datos de la cotización
 * @param {string} authToken - Token de autenticación
 * @returns {Promise<object>} - Cotización creada
 */
export const createCotizacionApi = async (cotizacionData, authToken) => {
  try {
    console.log(cotizacionData);
    const data = await apiRequest(ENDPOINT, 'POST', cotizacionData, authToken);
    return data;
  } catch (error) {
    console.error('Error creating cotización:', error);
    throw error;
  }
};

/**
 * 🔄 Actualizar estado de cotización (aceptar/rechazar)
 * @param {number} cotizacionId - ID de la cotización
 * @param {number} IdEstado - Nuevo estado (6 = Aceptada, 7 = Cancelada)
 * @param {string} authToken - Token de autenticación
 * @returns {Promise<object>} - Respuesta del servidor
 */
export const updateCotizacionStatusApi = async (cotizacionId, IdEstado, authToken) => {
  try {
    const data = await apiRequest(`${ENDPOINT}/${cotizacionId}/status`, 'PATCH', { IdEstado }, authToken);
    return data;
  } catch (error) {
    console.error('Error updating cotización status:', error);
    throw error;
  }
};

/**
 * ✏️ Actualizar cotización
 * @param {number} cotizacionId - ID de la cotización
 * @param {object} updatedData - Datos actualizados
 * @param {string} authToken - Token de autenticación
 * @returns {Promise<object>} - Cotización actualizada
 */
export const updateCotizacionApi = async (cotizacionId, updatedData, authToken) => {
  try {
    const data = await apiRequest(`${ENDPOINT}/${cotizacionId}`, 'PUT', updatedData, authToken);
    return data;
  } catch (error) {
    console.error('Error updating cotización:', error);
    throw error;
  }
};

/**
 * 🗑️ Eliminar cotización
 * @param {number} cotizacionId - ID de la cotización
 * @param {string} authToken - Token de autenticación
 * @returns {Promise<object>} - Respuesta del servidor
 */
export const deleteCotizacionApi = async (cotizacionId, authToken) => {
  try {
    const data = await apiRequest(`${ENDPOINT}/${cotizacionId}`, 'DELETE', null, authToken);
    return data;
  } catch (error) {
    console.error('Error deleting cotización:', error);
    throw error;
  }
};

