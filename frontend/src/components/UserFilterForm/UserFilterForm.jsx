import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Modal from '../Modal';
import UserForm from './UserForm';

const UserFilterForm = () => {
  const [allUsers, setAllUsers] = useState([]); // Guarda todos los usuarios obtenidos de la API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [formValues, setFormValues] = useState({
    identificacion: '', // Solo un campo para la identificación
  });
  //modal 
  const [users, setUsers] = useState(allUsers); // Estado para la lista de usuarios
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal
  const [userToEdit, setUserToEdit] = useState(null); // Estado para el usuario que se está editando

  // Define los campos del formulario (solo identificación)
  const fields = [
    { name: 'identificacion', label: 'Identificación', type: 'text' },
  ];

  // Función para obtener TODOS los usuarios de la API (solo se llama una vez al inicio)
  const fetchAllUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    //
    let url = 'http://localhost:3000/usuarios/';

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error al obtener los usuarios: ${response.status}`);
      }
      const data = await response.json();

      if (data && Array.isArray(data.usuarios)) {
        setAllUsers(data.usuarios); // Guardamos todos los usuarios
      } else if (Array.isArray(data)) {
        setAllUsers(data); // Si la API devuelve directamente el array
      } else {
        throw new Error(
          'Formato de respuesta de la API incorrecto: Se esperaba un objeto con la propiedad "usuarios" o un array.'
        );
      }
    } catch (err) {
      setError('Erro buscando a los usuarios' + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Carga inicial de usuarios (sin filtros)
  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  // Lógica para filtrar los usuarios en el frontend por identificación
  const filteredUsers = useMemo(() => {
    if (!allUsers.length && loading) return [];
    if (!allUsers.length) return [];

    const { identificacion } = formValues;

    if (!identificacion) {
      // Si el campo de identificación está vacío, devuelve todos los usuarios
      return allUsers;
    }

    // Filtra por Identificacion (asumiendo que 'Identificacion' es la propiedad de identificación en tus objetos de usuario)
    const searchTerm = identificacion.toLowerCase(); // Convertir el término de búsqueda a minúsculas

    const result = allUsers.filter(user => {
      // Asegúrate de que user.Identificacion exista y sea un número o cadena
      // Convertir user.Identificacion a string y a minúsculas para una comparación sin distinción de mayúsculas/minúsculas
      const userIdentificacionAsString = String(user.Identificacion || '').toLowerCase();
      const matches = userIdentificacionAsString.includes(searchTerm);
      // console.log(`Usuario ID: ${user.IdUsuario}, Identificación: ${user.Identificacion}, Buscando: ${identificacion}, Coincide: ${matches}`); // <-- Depuración por usuario individual
      return matches;
    });

    return result;
  }, [allUsers, formValues, loading]);

  // Manejadores de eventos del formulario
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    console.log(`Input cambiado: Nombre: ${name}, Valor: ${value}`); // <-- Depuración: ver si el input actualiza el estado
    setFormValues(prevValues => ({ ...prevValues, [name]: value }));
  }, []);

  //Al oprimir el boton filtrar en el formulario
  const handleFilterSubmit = useCallback((event) => {
    event.preventDefault();
    // Con useMemo, el filtrado se hace automáticamente al cambiar formValues.
    // Aquí solo actualizamos el estado para indicar si hay filtros activos (opcional para estilos).
    setIsFilterActive(!!formValues.identificacion);
  }, [formValues]); // Dependencia formValues para que useCallback no se regenere innecesariamente

  //Al presionar el boton para resetear el filtro
  const handleResetFilters = useCallback(() => {
    setFormValues({ identificacion: '' });
    setIsFilterActive(false);
  }, []);

  // Funciones de acción de botones (sin cambios funcionales aquí)

  // Función para abrir el modal con los datos del usuario
  const handleEditClick = (user) => {
    setUserToEdit(user); // Guarda el usuario que se va a editar
    setIsModalOpen(true); // Abre el modal
  };

  // Función para crear o actualizar un usuario
  const handleCreateOrUpdateUser = async (updatedUser) => {
    if (updatedUser.IdUsuario) {
      // Si el usuario ya tiene un ID, es una actualización
      try {
        // Conexión con tu API de backend
        const response = await fetch('http://localhost:3000/usuarios/' + updatedUser.IdUsuario, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...updatedUser }),
        });

        alert('Usuario actualizado')
        location.reload()

      } catch (error) {
        // setErrors(`Error: ${error.message || 'Hubo un problema al registrar el usurio. Por favor, intenta de nuevo.'}`);
      } finally {
        // setIsLoading(false);
      }
    } else {
      // Si no tiene ID, es un nuevo usuario (puedes añadir lógica para generar IDs)

      // corregir el envio de datos para un usuario nuevo


      const newId = Math.max(...users.map(u => u.id)) + 1; // ID simple para ejemplo
      setUsers([...users, { ...updatedUser, id: newId }]);
    }
    handleCancelEdit(); // Cierra el modal y limpia el usuario a editar
  };

  // Función para cancelar la edición y cerrar el modal
  const handleCancelEdit = () => {
    setIsModalOpen(false); // Cierra el modal
    setUserToEdit(null); // Limpia el usuario a editar
  };
  return (
    <div className="px-4">
      <form key='userFilterForm' onSubmit={handleFilterSubmit} className="space-y-4  p-2 rounded-xl border-gray-200 bg-white my-2">
        <div className="sm:flex">
          <div className='sm:w-[80%] sm:mr-5 sm:'>
            {fields.map((field) => (
              <div key={field.name} className="space-y-1">
                <label htmlFor={field.name} className="block text-md font-semibold text-black">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formValues[field.name]}
                  onChange={handleInputChange}
                  placeholder={`Filtrar por ${field.label.toLowerCase()}`}
                  className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm shadow- sm:text-sm border-gray-500 rounded-md placeholder-gray-400 px-2 py-1 bg-white"
                />
              </div>
            ))}
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
          <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => ( // Aquí usamos filteredUsers
                <div key={user.IdUsuario} className='bg-white rounded-2xl py-3 md:px-5'>
                  <img
                    src="/src/assets/images/userfilter/imagen_perfil.png"
                    alt="imagen de perfil"
                    className='h-25 mx-auto my-4' />
                  <div className='px-2'>
                    <span className='block bg-black text-white text-center rounded-2xl py-1 font-semibold mb-2 mx-auto w-40'>ID {user.Identificacion}</span>
                    <span className='block font-semibold'>{user.Nombres + " " + user.Apellidos}</span>
                    <span className='block font-semibold'>{user.Email}</span>
                    <span className='block font-semibold'>{user.Direccion}</span>
                    <span className='block font-semibold'>{"Tel. " + user.Telefono}</span>
                    <span className={`block font-semibold border-2 w-24 text-center rounded-2xl mx-auto ${user.IdEstado == 1 ? ' text-green-600 bg-green-100' : user.IdEstado == 2 ? ' bg-red-100 text-rose-600' : ''}`}>
                      {user.IdEstado == 1 ? 'Activo' : user.IdEstado == 2 ? 'Inactivo' : ''}</span>
                  </div>
                  <div className='flex mt-4 mb-2 justify-center'>
                    <button
                      onClick={() => handleEditClick(user)}
                      className="text-blue-600 hover:text-blue-900 mr-15 cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9">
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                      </svg>


                    </button>
                    <button
                      onClick={() => handleEliminarUsuario(user.IdUsuario)}
                      className="text-red-600 hover:text-red-900 cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9">
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                      </svg>


                    </button>
                  </div>
                </div>
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
          onSubmit={handleCreateOrUpdateUser} // Función para guardar/actualizar
          onCancel={handleCancelEdit} // Función para cancelar
        />
      </Modal>
    </div>
  );
};

export default UserFilterForm;