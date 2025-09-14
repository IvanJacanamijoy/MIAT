// src/api/users.js
import apiRequest from '../utils/apiclient';

//Obtener todos los usuarios
export const fetchAllUsersApi = async (authToken) => {
  try {
    const data = await apiRequest('/usuarios', 'GET', null, authToken);

    if (Array.isArray(data.usuarios)) return data.usuarios;
    if (Array.isArray(data)) return data;

    throw new Error('Formato de respuesta de la API incorrecto: se esperaba un array o un objeto con "usuarios".');
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    throw error;
  }
};

//Obtener usuario por ID
export const fetchUserByIdApi = async (userId, authToken) => {
  try {
    const data = await apiRequest(`/usuarios/${userId}`, 'GET', null, authToken);
    return data;
  } catch (error) {
    console.error(`Error al obtener usuario ${userId}:`, error);
    throw error;
  }
};

//Actualizar usuario
export const updateUserDataApi = async (updatedUser, authToken, currentUser) => {
  try {
    const updatedUserRol =
      updatedUser.IdRol === 3 ? 'admin' :
      updatedUser.IdRol === 2 ? 'tecnico' : 'usuario';

    if (updatedUser.IdUsuario === currentUser.id && currentUser.rol !== updatedUserRol) {
      return alert('No puedes cambiar el rol de tu propio usuario. Intenta con otro.');
    }

    const data = await apiRequest(`/usuarios/${updatedUser.IdUsuario}`, 'PUT', updatedUser, authToken);

    alert('Usuario actualizado correctamente');
    return data;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    alert('Hubo un error actualizando al usuario');
    throw error;
  }
};

//Activar o desactivar usuario
export const toggleUserStatusApi = async (user, authToken) => {
  const nuevoEstado = user.IdEstado === 1 ? 2 : 1;

  try {
    return await apiRequest(`/usuarios/${user.IdUsuario}`, 'PUT', { IdEstado: nuevoEstado }, authToken);
  } catch (error) {
    console.error('Error al cambiar el estado del usuario:', error);
    throw error;
  }
};

// 🔧 Obtener usuarios técnicos
export const fetchTecnicosApi = async (authToken) => {
  try {
    const data = await apiRequest('/usuarios/tecnicos', 'GET', null, authToken);

    if (Array.isArray(data)) return data;
    if (Array.isArray(data.tecnicos)) return data.tecnicos;

    throw new Error('Formato de respuesta incorrecto: se esperaba un array o un objeto con "tecnicos".');
  } catch (error) {
    console.error('Error al obtener los técnicos:', error);
    throw error;
  }
};
