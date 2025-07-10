import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

//------------------PENDIENTE AGREGAR EL ROL DENTRO DEL SISTEMA-------------------
const UserForm = ({ userToEdit, onSubmit, onCancel }) => {
    //importamos al usuario con la sesion activa
    const { usuario } = useAuth();
    const [formData, setFormData] = useState({
        Nombres: '',
        Apellidos: '',
        Email: '',
        Identificacion: '',
        Direccion: '',
        Telefono: '',
        IdRol: '',
    });

    // useEffect para cargar los datos del usuario cuando `userToEdit` cambie
    useEffect(() => {
        if (userToEdit) {
            setFormData(userToEdit);
        } else {
            // Si no hay userToEdit (para crear uno nuevo), resetea el formulario
            setFormData({
                Nombres: '',
                Apellidos: '',
                Email: '',
                Identificacion: '',
                Direccion: '',
                Telefono: '',
                IdRol: '',
            });
        }
    }, [userToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // Llama a la función de envío que viene de UserManager
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {userToEdit ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
            </h2>
            <div className="mb-4">
                <label htmlFor="Nombres" className="block text-gray-700 text-sm font-bold mb-2">Nombres:</label>
                <input
                    type="text"
                    id="Nombres"
                    name="Nombres"
                    value={formData.Nombres}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="Apellidos" className="block text-gray-700 text-sm font-bold mb-2">Apellidos:</label>
                <input
                    type="text"
                    id="Apellidos"
                    name="Apellidos"
                    value={formData.Apellidos}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="Identificacion" className="block text-gray-700 text-sm font-bold mb-2">Identificacion:</label>
                <input
                    type="text"
                    id="Identificacion"
                    name="Identificacion"
                    value={formData.Identificacion}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="Direccion" className="block text-gray-700 text-sm font-bold mb-2">Direccion:</label>
                <input
                    type="text"
                    id="Direccion"
                    name="Direccion"
                    value={formData.Direccion}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mb-6">
                <label htmlFor="Telefono" className="block text-gray-700 text-sm font-bold mb-2">Telefono:</label>
                <input
                    type="text"
                    id="Telefono"
                    name="Telefono"
                    value={formData.Telefono}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>

            <div className="mb-6">
                {
                    /* si el id del usuario a actualizar y el usuario usuario con la sesion activa son iguales no se muestra la opcion para cambiar al usuario*/
                    userToEdit.IdUsuario == usuario.id ? '' :
                        <select
                            name="IdRol"
                            id="IdRol"
                            value={formData.IdRol}
                            onChange={handleChange}
                            className='shadow border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none'
                        >
                            <option value="3">Administrador</option>
                            <option value="2">Tecnico</option>
                            <option value="1">Usuario</option>
                        </select>
                }
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                >
                    {userToEdit ? 'Guardar Cambios' : 'Crear Usuario'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-white hover:bg-gray-100 text-gray-600 font-bold py-2 px-4 border border-gray-400 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default UserForm;