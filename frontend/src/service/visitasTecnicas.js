import axios from 'axios';

const API_VISITAS_URL = 'http://localhost:3000/visitatecnica';

export const fetchVisitasTecnicasApi = async (authToken, filters = {}) => {
  try {
    console.log("filtros: " + filters)
    const response = await axios.get(API_VISITAS_URL, {
      headers: { Authorization: `Bearer ${authToken}` },
      params: filters
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching visitas técnicas:', error);
    throw error;
  }
};

export const createVisitaTecnicaApi = async (citaData, authToken) => {
  try {
    const response = await axios.post(API_VISITAS_URL, citaData, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating visita técnica:', error);
    throw error;
  }
};

export const updateVisitaTecnicaApi = async (citaId, updatedData, authToken) => {
  try {
    const response = await axios.put(`${API_VISITAS_URL}/${citaId}`, updatedData, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating visita técnica:', error);
    throw error;
  }
};

// ✅ Nueva función para asignar técnico
export const assignTechnicianToVisitApi = async (citaId, tecnicoId, authToken) => {
  try {
    const response = await axios.patch(
      `${API_VISITAS_URL}/${citaId}/asignar-tecnico`,
      { IdTecnico: tecnicoId },
      {
        headers: { Authorization: `Bearer ${authToken}` }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error asignando técnico a la visita técnica:', error);
    throw error;
  }
};
