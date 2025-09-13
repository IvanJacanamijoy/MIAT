// src/api/diagnostico.js
import apiRequest from '../utils/apiclient';

export const createDiagnosticoApi = async (diagnosticoData, token) => {
  try {
    const data = await apiRequest('/diagnostico', 'POST', diagnosticoData, token);
    return data;
  } catch (error) {
    console.error('Error creating diagnóstico:', error);
    throw error;
  }
};
