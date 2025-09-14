// src/utils/apiclient.js
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const apiRequest = async (endpoint, method = 'GET', data = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : null,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Error en la solicitud');
    }

    return result;
  } catch (error) {
    console.error(`Error en ${method} ${endpoint}:`, error.message);
    throw error;
  }
};

export default apiRequest;


