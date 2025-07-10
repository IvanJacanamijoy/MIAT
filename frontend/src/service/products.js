// src/api/products.js
const API_BASE_URL = 'http://localhost:3000'; // O tu base URL

export const fetchAllProductsApi = async (authToken) => {
  const response = await fetch(`${API_BASE_URL}/productos`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    }
  });
  if (!response.ok) {
    throw new Error(`Error al obtener los productos: ${response.status} - ${response.statusText}`);
  }
  const data = await response.json();
  // Asume que la API de productos devuelve directamente un array
  if (!Array.isArray(data)) {
      throw new Error('Formato de respuesta de la API de productos incorrecto: Se esperaba un array.');
  }
  return data;
};

export const updateProductDataApi = async (updatedProduct, authToken) => {
  const response = await fetch(`${API_BASE_URL}/productos/${updatedProduct.IdProducto}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...updatedProduct }),
  });
  if (!response.ok) {
    throw new Error(`Hubo un error actualizando el producto: ${response.statusText}`);
  }
};

// Si los productos tienen un estado que se pueda activar/desactivar:
export const toggleProductStatusApi = async (product, authToken) => {
  const nuevoEstado = product.Activo === 1 ? 0 : 1; // Asumiendo un campo 'Activo'
  const response = await fetch(`${API_BASE_URL}/productos/${product.IdProducto}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ Activo: nuevoEstado }),
  });
  if (!response.ok) {
    throw new Error(`Error al cambiar el estado del producto: ${response.statusText}`);
  }
};