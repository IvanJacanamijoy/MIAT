
// src/api/users.js
const API_BASE_URL = 'http://localhost:3000';

// Funcion para buscar a todo los usuarios backend
export const fetchAllUsersApi = async (authToken) => {
  const response = await fetch(`${API_BASE_URL}/usuarios`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    }
  });
  if (!response.ok) {
    throw new Error(`Error al obtener los usuarios: ${response.status} - ${response.statusText}`);
  }
  const data = await response.json();
  if (data && Array.isArray(data.usuarios)) {
    return data.usuarios;
  } else if (Array.isArray(data)) {
    return data;
  } else {
    throw new Error('Formato de respuesta de la API incorrecto: Se esperaba un objeto con la propiedad "usuarios" o un array.');
  }
};

export const fetchUserByIdApi = async (userId, authToken) => {
    try {
        const url = `${API_BASE_URL}/usuarios/${userId}`;
        console.log(`fetchUserByIdApi: Llamando a URL: ${url}`);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `Error al obtener usuario ${userId}: ${response.status} - ${response.statusText}`);
        }
        
        return data; // Debería devolver un objeto de usuario completo
    } catch (error) {
        console.error('Error en fetchUserByIdApi:', error);
        if (error instanceof SyntaxError && error.message.includes('JSON.parse')) {
            throw new Error('Error al parsear la respuesta del servidor como JSON.');
        }
        throw error;
    }
};
//funcion para actualizar los datos del usuario
export const updateUserDataApi = async (updatedUser, authToken, currentUser) => {
  // cambiamos los numeros que recibimos del usuario a actualizar y los cambiamos a palabras
  const updatedUserRol = updatedUser.IdRol == 3 ? 'admin': 2 ? 'tecnico':'usuario';
  // si el usuario a actualizar es el mismo administrador y el rol es diferente lanzamos un error indicando que no se puede cambiar el rol del usuario con la sesion activa
  if (updatedUser.IdUsuario === currentUser.id && currentUser.rol !== updatedUserRol) {
    return alert('No puedes cambiar el rol de tu propio usuario, vuelve a interntarlo.');
  }
  //realizamos la solicitud al backend con los datos actualizados
  const response = await fetch(`${API_BASE_URL}/usuarios/${updatedUser.IdUsuario}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...updatedUser }),
  });
  //en caso de algun error mostramos el error
  if (!response.ok) {
    alert(`Hubo un error actualizando al usuario: ${response.statusText}`);
  } else {
    alert('Usuario Actualizado Correctamente');
  }
};

export const toggleUserStatusApi = async (user, authToken) => {
  const nuevoEstado = user.IdEstado === 1 ? 2 : 1;
  const response = await fetch(`${API_BASE_URL}/usuarios/${user.IdUsuario}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ IdEstado: nuevoEstado }),
  });
  if (!response.ok) {
    throw new Error(`Error al cambiar el estado del usuario: ${response.statusText}`);
  }
};

// ... otras funciones relacionadas con usuarios (ej. crear, eliminar)