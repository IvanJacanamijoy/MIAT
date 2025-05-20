import { useState, useEffect, useCallback } from 'react';

const UserFilterForm = () => {
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        role: '',
        status: '',
    });

    // Define los campos del formulario
    const fields = [
        { name: 'documento', label: 'Documento de identidad', type: 'text' },
    ];

    // Función para obtener los usuarios de la API
    const fetchUsers = useCallback(async (filters = {}) => {
        setLoading(true);
        setError(null);
        let url = 'http://localhost:3000/usuarios/';

        // Construye la URL con los parámetros de filtro
        const queryParams = Object.entries(filters)
            .filter(([, value]) => value !== '')
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');

        if (queryParams) {
            url += `?${queryParams}`;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error al obtener los usuarios: ${response.status}`);
            }
            const data = await response.json();

            setUsers(data)
            console.log(data)

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Carga inicial de usuarios (sin filtros)
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // Función para manejar el envío del formulario de filtro
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleFilterSubmit = (event) => {
        event.preventDefault();
        setIsFilterActive(
            !!formValues.Nombres ||
            !!formValues.Email ||
            !!formValues.IdRol ||
            !!formValues.status
        );
        fetchUsers(formValues);
    };

    // Función para manejar el clic en el botón Ver
    const handleVerUsuario = (userId) => {
        console.log('Ver usuario:', userId);
        // Aquí puedes implementar la lógica para mostrar los detalles del usuario
    };

    // Función para manejar el clic en el botón Editar
    const handleEditarUsuario = (userId) => {
        console.log('Editar usuario:', userId);
        // Aquí puedes implementar la lógica para editar el usuario
    };

    // Función para manejar el clic en el botón Eliminar
    const handleEliminarUsuario = (userId) => {
        console.log('Eliminar usuario:', userId);
        // Aquí puedes implementar la lógica para eliminar el usuario
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleFilterSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {fields.map((field) => (
                        <div key={field.name} className="space-y-1">
                            <label
                                htmlFor={field.name}
                                className="block text-sm font-medium text-gray-700"
                            >
                                {field.label}
                            </label>
                            {field.type === 'select' ? (
                                <select
                                    id={field.name}
                                    name={field.name}
                                    value={formValues[field.name]}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
                                    <option value="">Todos</option>
                                    {field.name === 'role' && (
                                        <>
                                            <option value="admin">Admin</option>
                                            <option value="editor">Editor</option>
                                            <option value="viewer">Viewer</option>
                                        </>
                                    )}
                                    {field.name === 'status' && (
                                        <>
                                            <option value="active">Activo</option>
                                            <option value="inactive">Inactivo</option>
                                            <option value="pending">Pendiente</option>
                                        </>
                                    )}
                                </select>
                            ) : (
                                <input
                                    type={field.type}
                                    id={field.name}
                                    name={field.name}
                                    value={formValues[field.name]}
                                    onChange={handleInputChange}
                                    placeholder={`Filtrar por ${field.label.toLowerCase()}`}
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        type="submit"
                        className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors ${isFilterActive
                            ? 'ring-2 ring-blue-500 ring-opacity-50'
                            : ''
                            }`}
                    >
                        Buscar Usuario
                    </button>
                    <a href="/admin/usuarios/registrar">
                            Registrar usuario
                    </a>
                </div>
            </form>

            {/* Muestra los resultados */}
            {loading && <p>Cargando usuarios...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && !error && (
                <div>
                    {users.map(user => (
                        <div className='grid grid-cols-3 bg-white m-5'>
                            <img 
                            src="/src/assets/images/userfilter/imagen_perfil.png" 
                            alt="imagen de perfil" 
                            className='h-25 col-span-3 sm:col-span-1'/>
                            <div className='col-span-3 sm:col-span-1'>
                                <p>ID {user.IdUsuario}</p>
                                <p>{user.Nombres + " " + user.Apellidos}</p>
                                <p>{user.Email}</p>
                                <p>{user.Direccion}</p>
                                <p>{"Tel. " + user.Telefono}</p>
                            </div>
                            <div className='col-span-3 sm:col-span-1'>
                                <button
                                    onClick={() => handleVerUsuario(user.IdUsuario)}
                                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                                >
                                    Ver
                                </button>
                                <button
                                    onClick={() => handleEditarUsuario(user.IdUsuario)}
                                    className="text-blue-600 hover:text-blue-900 mr-2"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleEliminarUsuario(user.IdUsuario)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>


                    ))}

                </div>
            )}
        </div>
    );
};

export default UserFilterForm;