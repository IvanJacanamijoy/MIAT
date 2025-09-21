import apiRequest from '../utils/apiclient';

const ENDPOINT = '/visitas-tecnicas';

export const fetchVisitasTecnicasApi = async (authToken, filters = {}) => {
  try {
    // GET con query string
    const queryParams = new URLSearchParams(filters).toString();
    const url = `${ENDPOINT}?${queryParams}`;
    const data = await apiRequest(url, 'GET', null, authToken);
    return data;
  } catch (error) {
    console.error('Error fetching visitas técnicas:', error);
    throw error;
  }
};

export const createVisitaTecnicaApi = async (citaData, authToken) => {
  try {
    const data = await apiRequest(ENDPOINT, 'POST', citaData, authToken);
    return data;
  } catch (error) {
    console.error('Error creating visita técnica:', error);
    throw error;
  }
};

export const updateVisitaTecnicaApi = async (citaId, updatedData, authToken) => {
  try {
    const data = await apiRequest(`${ENDPOINT}/${citaId}`, 'PUT', updatedData, authToken);
    return data;
  } catch (error) {
    console.error('Error updating visita técnica:', error);
    throw error;
  }
};

export const assignTechnicianToVisitApi = async (citaId, tecnicoId, authToken) => {
  try {
    const body = { IdTecnico: tecnicoId };
    const data = await apiRequest(`${ENDPOINT}/${citaId}/asignar-tecnico`, 'PATCH', body, authToken);
    return data;
  } catch (error) {
    console.error('Error asignando técnico a visita técnica:', error);
    throw error;
  }
};