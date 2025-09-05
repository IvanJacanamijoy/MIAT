const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/';

export const createCotizacionApi = async (cotizacionData, token) => {
  try {
    const response = await fetch(`${BASE_URL}/cotizaciones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(cotizacionData)
    });

    if (!response.ok) {
      throw new Error('Error al crear cotización');
    }

    return await response.json();
  } catch (error) {
    console.error('createCotizacionApi error:', error);
    throw error;
  }
};
