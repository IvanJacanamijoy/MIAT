import UserFilter from "../../components/UserFilterForm/UserFilter";
import UserForm from "../../components/UserFilterForm/UserForm";
import { useState, useCallback, useEffect } from "react";
import userService from "../../service/userService";
const UserManager = () => {
    const [users, setUsers] = useState([]);
    const [userToEdit, setUserToEdit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = useCallback(async (identificacion = '') => {
        setLoading(true);
        setError(null);
        try {
            console.log(identificacion)
            if (identificacion === '') {
                const data = await userService.getUsers();
                setUsers(data);
            } else {
                const data = await userService.getUserByIdentificacion(identificacion);
                setUsers(Array.isArray(data) ? data : [data]); // Forzamos a array si es un solo usuario
            }

        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Error al cargar usuarios.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleCreateOrUpdateUser = async (userData) => {
        try {
            if (userToEdit) {
                await userService.updateUser(userToEdit._id, userData);
                setUserToEdit(null); // Limpiar el formulario después de la edición
            } else {
                await userService.createUser(userData);
            }
            fetchUsers(); // Recargar la lista de usuarios
        } catch (err) {
            console.error('Error creating/updating user:', err);
            setError('Error al guardar el usuario. La identificación o el email pueden ya existir.');
        }
    };

    const handleEditarUsuario = (user) => {
        setUserToEdit(user);
    };

    const handleEliminarUsuario = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            try {
                await userService.deleteUser(id);
                fetchUsers(); // Recargar la lista de usuarios
            } catch (err) {
                console.error('Error deleting user:', err);
                setError('Error al eliminar el usuario.');
            }
        }
    };

    const handleFilterUsers = (identificacion) => {
        fetchUsers(identificacion);
    };

    const handleCancelEdit = () => {
        setUserToEdit(null);
    };
    return (
        <div className="h-full w-full bg-gray-300 max-w-7xl mx-auto px-5">
            <h1 className="text-center font-bold text-5xl py-10 text-white">Gestion Usuarios</h1>
            <div className="p-5 bg-neutral-500 rounded-2xl">
                <div className="space-y-6">
                    <UserForm userToEdit={userToEdit} onSubmit={handleCreateOrUpdateUser} onCancel={handleCancelEdit} />
                    <UserFilter onFilter={handleFilterUsers} />

                    {/* Muestra los resultados */}
                    {loading && <p>Cargando usuarios...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}
                    {!loading && !error && (
                        <div>
                            {users.map(user => (
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


                            ))}

                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default UserManager;