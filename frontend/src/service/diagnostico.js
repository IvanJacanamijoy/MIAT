// src/api/diagnostico.js
import apiRequest from '../utils/apiclient';

export const createDiagnosticoApi = async (diagnosticoData, token) => {
  try {
    const data = await apiRequest('/diagnosticos', 'POST', diagnosticoData, token);
    return data;
  } catch (error) {
    console.error('Error creating diagnóstico:', error);
    throw error;
  }
};

export const getDiagnosticosApi = async (token) => {
  try {
    const data = await apiRequest('/diagnosticos', 'GET', null, token);
    return data;
  } catch (error) {
    console.error('Error obteniendo diagnósticos:', error);
    throw error;
  }
};

export const getDiagnosticoByIdApi = async (id, token) => {
  try {
    const data = await apiRequest(`/diagnosticos/${id}`, 'GET', null, token);
    return data;
  } catch (error) {
    console.error(`Error obteniendo diagnóstico con ID ${id}:`, error);
    throw error;
  }
};

export const updateDiagnosticoApi = async (id, diagnosticoData, token) => {
  try {
    const data = await apiRequest(`/diagnosticos/${id}`, 'PUT', diagnosticoData, token);
    return data;
  } catch (error) {
    console.error(`Error actualizando diagnóstico con ID ${id}:`, error);
    throw error;
  }
};
