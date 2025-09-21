import apiRequest from '../utils/apiclient';

/**
 * Convierte un objeto de filtros en una cadena de consulta URL válida.
 * Arrays como tipoServicioId se serializan como JSON.
 */
export const buildQueryParams = (filters = {}) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      if (value.length > 0) {
        params.append(key, JSON.stringify(value));
      }
    } else if (value !== undefined && value !== '') {
      params.append(key, value);
    }
  });

  return params.toString();
};

/**
 * Obtiene todos los servicios con filtros opcionales.
 * @param {string} authToken - Token de autenticación
 * @param {object} filters - Filtros como tecnicoId, clienteId, estado, etc.
 * @returns {Promise<Array>} - Lista de servicios
 */
export const fetchAllServicesApi = async (authToken, filters = {}) => {
  try {
    const queryParams = buildQueryParams(filters);
    const url = `/servicios${queryParams ? `?${queryParams}` : ''}`;

    const data = await apiRequest(url, 'GET', null, authToken);

    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.servicios)) {
      return data.servicios;
    }

    throw new Error('Formato de respuesta de la API incorrecto para servicios');
  } catch (error) {
    console.error('Error en fetchAllServicesApi:', error);
    throw error;
  }
};

/**
 * Actualiza un servicio específico.
 * @param {string} authToken - Token de autenticación
 * @param {number} servicioId - ID del servicio a actualizar
 * @param {object} payload - Datos del servicio a actualizar
 * @returns {Promise<object>} - Servicio actualizado
 */
export const updateServicioApi = async (authToken, servicioId, payload) => {
  try {
    const url = `/servicios/${servicioId}`;
    const data = await apiRequest(url, 'PUT', payload, authToken);
    return data;
  } catch (error) {
    console.error(`Error al actualizar el servicio ${servicioId}:`, error);
    throw error;
  }
};

/**
 * Valida si un servicio tiene todos los datos completos.
 * @param {string} authToken - Token de autenticación
 * @param {number} servicioId - ID del servicio a validar
 * @returns {Promise<object>} - Resultado de la validación
 */
export const validarDatosCompletosApi = async (authToken, servicioId) => {
  try {
    const url = `/servicios/${servicioId}/validar`;
    const data = await apiRequest(url, 'GET', null, authToken);
    return data;
  } catch (error) {
    console.error(`Error al validar datos del servicio ${servicioId}:`, error);
    throw error;
  }
};

/**
 * Finaliza un servicio específico.
 * @param {string} authToken - Token de autenticación
 * @param {number} servicioId - ID del servicio a finalizar
 * @param {object} payload - Datos del servicio finalizado
 * @returns {Promise<object>} - Servicio actualizado
 */
export const finalizarServicioApi = async (authToken, servicioId, payload) => {
  try {
    const url = `/servicios/${servicioId}/finalizar`;
    const data = await apiRequest(url, 'PUT', payload, authToken);
    return data;
  } catch (error) {
    console.error(`Error al finalizar el servicio ${servicioId}:`, error);
    throw error;
  }
};
