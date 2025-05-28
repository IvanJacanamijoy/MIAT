import React, { useState, useEffect, useCallback, useMemo } from 'react';

const UserFilterForm = () => {
  const [allUsers, setAllUsers] = useState([]); // Guarda todos los usuarios obtenidos de la API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [formValues, setFormValues] = useState({
    identificacion: '', // Solo un campo para la identificación
  });


  // Define los campos del formulario (solo identificación)
  const fields = [
    { name: 'identificacion', label: 'Identificación', type: 'text' },
  ];

  // Función para obtener TODOS los usuarios de la API (solo se llama una vez al inicio)
  const fetchAllUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    let url = 'http://localhost:3000/usuarios/'; // Asegúrate de que esta URL trae TODOS los usuarios

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
      setError(err.message);
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
    console.log("Formulario enviado. Filtro activo:", !!formValues.identificacion); // <-- Depuración: ver envío
    // console.log(identificacion) // ESTO CAUSARÍA UN ERROR: 'identificacion' no está definida en este scope. Debe ser formValues.identificacion
  }, [formValues]); // Dependencia formValues para que useCallback no se regenere innecesariamente

  //Al presionar el boton para resetear el filtro
  const handleResetFilters = useCallback(() => {
    setFormValues({ identificacion: '' });
    setIsFilterActive(false);
    console.log("Filtros reseteados."); // <-- Depuración: ver reseteo
  }, []);

  // Funciones de acción de botones (sin cambios funcionales aquí)

  //Al oprimir el boton editar realiza una accion
  const handleEditarUsuario = (userId) => {
    console.log('Editar usuario:', userId);
    // Implementa tu lógica de edición (ej. modal con formulario, navegar a página de edición)
  };

  //Al oprimir el boton eleminar realiza una accion
  const handleEliminarUsuario = (userId) => {
    console.log('Eliminar usuario:', userId);
    // Implementa tu lógica de eliminación (ej. confirmación, llamada a API de DELETE)
    // Después de eliminar, podrías querer volver a llamar a fetchAllUsers()
    // o eliminar el usuario del estado allUsers si la eliminación fue exitosa
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleFilterSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-1">
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formValues[field.name]}
                onChange={handleInputChange}
                placeholder={`Filtrar por ${field.label.toLowerCase()}`}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors ${isFilterActive ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
              }`}
          >
            Filtrar
          </button>
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-gray-700 hover:bg-gray-100 py-2 px-4 rounded-md border border-gray-300"
          >
            Resetear
          </button>
        </div>
      </form>

      {/* Muestra los resultados */}
      {loading && <p>Cargando usuarios...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => ( // Aquí usamos filteredUsers
              <div className='grid grid-cols-3 bg-white m-5 rounded-2xl py-3 md:px-5'>
                <img
                  src="/src/assets/images/userfilter/imagen_perfil.png"
                  alt="imagen de perfil"
                  className='h-25 col-span-3 sm:col-span-1 mx-auto my-auto' />
                <div className='col-span-3 sm:col-span-1'>
                  <span className='block bg-black text-white text-center rounded-2xl py-1 w-45 font-semibold mb-2'>ID {user.Identificacion}</span>
                  <span className='block font-semibold'>{user.Nombres + " " + user.Apellidos}</span>
                  <span className='block font-semibold'>{user.Email}</span>
                  <span className='block font-semibold'>{user.Direccion}</span>
                  <span className='block font-semibold'>{"Tel. " + user.Telefono}</span>
                  <span className={user.IdEstado == 1 ? 'block font-semibold text-green-600 border-2 max-w-20 text-center rounded-2xl mt-1 bg-green-100' : user.IdEstado == 2 ? 'block font-semibold border-2 max-w-20 text-center rounded-2xl text-red-600 mt-1 bg-red-100': ''}>
                  {user.IdEstado == 1 ? 'Activo' : user.IdEstado == 2 ? 'Inactivo': ''}</span>
                </div>
                <div className='col-span-3 sm:col-span-1 my-auto mx-auto'>
                  <button
                    onClick={() => handleEditarUsuario(user.IdUsuario)}
                    className="text-blue-600 hover:text-blue-900 mr-8 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>

                  </button>
                  <button
                    onClick={() => handleEliminarUsuario(user.IdUsuario)}
                    className="text-red-600 hover:text-red-900 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>

                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No se han encontrado usuarios que coincidan con los filtros.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserFilterForm;