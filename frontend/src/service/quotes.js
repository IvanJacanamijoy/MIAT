import axios from 'axios';

const API_COTIZACIONES_URL = 'http://localhost:3000/cotizaciones'; // Ajusta según tu ruta real

// 🔍 Obtener cotizaciones con filtros
export const fetchCotizacionesApi = async (authToken, filters = {}) => {
  console.log("Estos son los filtros: "  + filters)
  try {
    const response = await axios.get(API_COTIZACIONES_URL, {
      headers: { Authorization: `Bearer ${authToken}` },
      params: filters // Se envían como query params
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cotizaciones:', error);
    throw error;
  }
};

// 📝 Crear una nueva cotización
export const createCotizacionApi = async (cotizacionData, authToken) => {
  try {
    const response = await axios.post(API_COTIZACIONES_URL, cotizacionData, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating cotización:', error);
    throw error;
  }
};

// ✏️ Actualizar una cotización existente
export const updateCotizacionApi = async (cotizacionId, updatedData, authToken) => {
  try {
    const response = await axios.put(`${API_COTIZACIONES_URL}/${cotizacionId}`, updatedData, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating cotización:', error);
    throw error;
  }
};

// ❌ Eliminar una cotización
export const deleteCotizacionApi = async (cotizacionId, authToken) => {
  try {
    const response = await axios.delete(`${API_COTIZACIONES_URL}/${cotizacionId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting cotización:', error);
    throw error;
  }
};
