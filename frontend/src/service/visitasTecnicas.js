// service/visitasTecnicas.js
import axios from 'axios';

const API_VISITAS_URL = 'http://localhost:3000/visitatecnica'; // Asumo que este es tu endpoint principal para el CRUD de citas

export const fetchVisitasTecnicasApi = async (authToken, filters = {}) => {
    try {
        const response = await axios.get(API_VISITAS_URL, {
            headers: { Authorization: `Bearer ${authToken}` },
            params: filters // Esto enviará los filtros como query params
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