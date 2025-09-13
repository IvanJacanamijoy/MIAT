// src/api/auth.js
import apiRequest from '../utils/apiclient';

//Login de usuario
export const login = async (email, password) => {
  try {
    const response = await apiRequest('/auth/login', 'POST', {
      email,
      password,
    });

    return response;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
};

//Registro de usuario
export const register = async (formData) => {
  try {
    const response = await apiRequest('/auth/register', 'POST', formData);
    return response;
  } catch (error) {
    console.error('Error en registro:', error);
    throw error;
  }
};

