import { useState, useEffect, useCallback, useMemo } from 'react';
import Modal from '../Common/Modal';
import UserForm from './UserForm';
import Switch from '@mui/material/Switch';
//Importamos la funcion para traer todos los datos de los usuarios
import { fetchAllUsersApi, toggleUserStatusApi, updateUserDataApi } from '../../service/users';
//importamos el contexto global para obtener el token de autenticacion
import { useAuth } from '../../context/AuthContext';
//importamos el componente de carduser
import UserCard from './UserCard';

const UserFilterForm = () => {
  const [allUsers, setAllUsers] = useState([]); // Guarda todos los usuarios obtenidos de la API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [identificacion, setidentificacion] = useState(''); // Correcto, es un string  //modal 
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
  const [userToEdit, setUserToEdit] = useState(null); // Estado para el usuario que se está editando
  const { authToken, usuario } = useAuth();

  // funcion para obtener a todos los usuarios
  const fetchAllUsers = async () => {
    try {
      const allUsersFromMiat = await fetchAllUsersApi(authToken);
      if (allUsersFromMiat) {
        setAllUsers(allUsersFromMiat);
      }
    } catch (error) {
      console.log('Hubo algun error: ', error)
    }
  }
  // Carga inicial de usuarios (sin filtros)
  useEffect(() => {
    fetchAllUsers();
  }, []);

  // Lógica para filtrar los usuarios en el frontend por identificación
  const filteredUsers = useMemo(() => {
    if (!allUsers.length && loading) return [];
    if (!allUsers.length) return [];

    // Si el campo de identificación está vacío, devuelve todos los usuarios
    // Y aquí, 'identificacion' ya es un string, así que la verificación de vacío funciona.
    if (!identificacion) {
      return allUsers;
    }

    // Filtra por Identificacion
    // 'identificacion' es un string, así que .toLowerCase() funciona
    const searchTerm = identificacion.toLowerCase(); 

    const result = allUsers.filter(user => {
      // ... el resto de tu lógica de filtro ...
      const userIdentificacionAsString = String(user.Identificacion || '').toLowerCase();
      const matches = userIdentificacionAsString.includes(searchTerm);
      return matches;
    });

    return result;
  }, [allUsers, identificacion, loading]);

   // Manejadores de eventos del formulario
  const handleInputChange = useCallback((event) => {
    // Aquí es donde cambiamos la lógica
    // Como solo hay un input manejado por 'identificacion', podemos asignar directamente el 'value'
    setidentificacion(event.target.value); // <--- CAMBIO CLAVE AQUÍ
  }, []);

  //Al oprimir el boton filtrar en el formulario
  const handleFilterSubmit = useCallback((event) => {
    event.preventDefault();
    // Con useMemo, el filtrado se hace automáticamente al cambiar identificacion.
    // Aquí solo actualizamos el estado para indicar si hay filtros activos (opcional para estilos).
    setIsFilterActive(!!identificacion);
  }, [identificacion]); // Dependencia identificacion para que useCallback no se regenere innecesariamente

  // Formatear los filtros
  const handleResetFilters = useCallback(() => {
    setidentificacion('');
    setIsFilterActive(false);
  }, []);

  // Función para abrir el modal con los datos del usuario
  const handleEditClick = (user) => {
    setUserToEdit(user); // Guarda el usuario que se va a editar
    setIsModalOpen(true); // Abre el modal
  };

  // Función para crear o actualizar un usuario
  const handleUpdateUser = async (updatedUser) => {
    try {
      // pasamos el usuario a actualizar, el token de autenticacion y el usuario con
      // la se sesion activa para actualizar al usuario
      updateUserDataApi(updatedUser, authToken, usuario);
      //buscamos a los usuarios
      fetchAllUsers();
    } catch (error) {
      // setErrors(`Error: ${error.message || 'Hubo un problema al registrar el usurio. Por favor, intenta de nuevo.'}`);
    } finally {
      // setIsLoading(false);
    }
    handleCancelEdit(); // Cierra el modal y limpia el usuario a editar
  };

  // Función para cambiar el estado de un usuario
  const handleEstadoUsuario = async (updatedUser) => {
    //intentamos actualizar su estado en la base de datos
    try {
      await toggleUserStatusApi(updatedUser, authToken);
      // buscamos a todos los usuarios del sistema
      fetchAllUsers();
    } catch (error) {
      console.log('hubo algun error actualizando el estado del usuario');
    }
  }


  // Función para cancelar la edición y cerrar el modal
  const handleCancelEdit = () => {
    setIsModalOpen(false); // Cierra el modal
    setUserToEdit(null); // Limpia el usuario a editar
  };
  return (
    <div className="px-4">
      <form
        key='userFilterForm'
        onSubmit={handleFilterSubmit}
        className="relative z-10 space-y-4  p-2 rounded-xl border-gray-200 bg-white my-2">
        <div className="sm:flex">
          <div className='sm:w-[80%] sm:mr-5 sm:'>
            <div key='identificacion' className="space-y-1">
              <label htmlFor='identificacion' className="block text-md font-semibold text-black">
                Identificación
              </label>
              <input
                type='text'
                id='identificacion'
                value={identificacion}
                name='identificacion'
                onChange={handleInputChange}
                placeholder='Filtrar por identificación'
                className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm shadow- sm:text-sm border-gray-500 rounded-md placeholder-gray-400 px-2 py-1 bg-white"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 w-full my-3 h-9 sm:my-0 sm:h-auto sm:w-auto">
            <button
              type="submit"
              className={`font-medium bg-red-500 hover:bg-red-600 cursor-pointer text-white h-full px-6 rounded-md transition-colors ${isFilterActive ? 'ring-2 ring-red-500 ring-opacity-50 py-2 sm:m-0' : ''}`}
            >
              Filtrar
            </button>
            <button
              type="button"
              onClick={handleResetFilters}
              className="font-medium text-gray-700 hover:bg-gray-200 hover:text-black h-full px-4 rounded-md transition-colors border cursor-pointer border-gray-700 sm:m-0"
            >
              Limpiar
            </button>
          </div>
        </div>
      </form>

      {/* Muestra los resultados */}
      {loading && <p>Cargando usuarios...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">Usuarios</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => ( // Aquí usamos filteredUsers
                <UserCard
                  key={user.IdUsuario}
                  user={user} // <--- Pasar 'user' individualmente a UserCard
                  onEditClick={() => { handleEditClick(user) }}
                  onToggleStatus={() => { handleEstadoUsuario(user) }}
                />

              ))
            ) : (
              <p>No se han encontrado usuarios que coincidan con los filtros.</p>
            )}
          </div>
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={handleCancelEdit}>
        <UserForm
          userToEdit={userToEdit} // Pasamos el usuario a editar al formulario
          onSubmit={handleUpdateUser} // Función para guardar/actualizar
          onCancel={handleCancelEdit} // Función para cancelar
        />
      </Modal>
    </div>
  );
};

export default UserFilterForm;