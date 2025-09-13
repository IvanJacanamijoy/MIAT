// src/api/cotizaciones.js
import apiRequest from '../utils/apiclient';

// 🔍 Obtener cotizaciones con filtros
export const fetchCotizacionesApi = async (authToken, filters = {}) => {
  try {
    const queryString = new URLSearchParams(filters).toString();
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

