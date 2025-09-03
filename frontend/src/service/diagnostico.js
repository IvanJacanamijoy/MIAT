const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const createDiagnosticoApi = async (diagnosticoData, token) => {
  try {
    const response = await fetch(`${BASE_URL}/diagnostico`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(diagnosticoData)
    });

    if (!response.ok) {
      throw new Error('Error al crear diagnóstico');
    }

    return await response.json();
  } catch (error) {
    console.error('createDiagnosticoApi error:', error);
    throw error;
  }
};
