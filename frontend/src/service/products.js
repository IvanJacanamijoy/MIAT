import apiRequest from '../utils/apiclient';

const ENDPOINT = '/productos';

//Obtener todos los productos
export const fetchAllProductsApi = async (authToken) => {
  try {
    const data = await apiRequest(ENDPOINT, 'GET', null, authToken);

    if (!Array.isArray(data)) {
      throw new Error('Formato de respuesta incorrecto: se esperaba un array.');
    }

    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

//Actualizar datos de producto
export const updateProductDataApi = async (updatedProduct, authToken) => {
  try {
    await apiRequest(`${ENDPOINT}/${updatedProduct.IdProducto}`, 'PUT', updatedProduct, authToken);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

//Activar o desactivar producto
export const toggleProductStatusApi = async (product, authToken) => {
  const nuevoEstado = product.Activo === 1 ? 0 : 1;

  try {
    await apiRequest(`${ENDPOINT}/${product.IdProducto}`, 'PUT', { Activo: nuevoEstado }, authToken);
  } catch (error) {
    console.error('Error changing product status:', error);
    throw error;
  }
};
