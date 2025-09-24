import Switch from "@mui/material/Switch";
import { useAuth } from "../../context/AuthContext";
import imagenPerfil from "../../assets/images/userfilter/imagen_perfil.png"
const UserCard = ({ user, onEditClick, onToggleStatus }) => {
    const { usuario } = useAuth();
    return (
        //importamos los datos del usuario de la sesion

        <div key={user.IdUsuario} className='bg-white rounded-2xl py-4 px-4 shadow shadow
        '>
            <span
                className={`font-semibold border-2 px-2 rounded-2xl mx-auto ${user.IdRol == 1 ? ' text-blue-500 bg-blue-100' : user.IdRol == 2 ? ' bg-orange-100 text-orange-600' : 'bg-red-100 text-red-500'}`}
            >
                {user.IdRol == 3 ? 'Administrador' : user.IdRol == 2 ? 'Tecnico' : 'Usuario'}
            </span>
            <img
                src={imagenPerfil}
                alt="imagen de perfil"
                className='h-25 mx-auto my-4 rounded-full border-8 border-red-500'
            />
            <div className='px-2'>
                <span className='block bg-black text-white text-center rounded-2xl py-1 font-semibold mb-2 mx-auto w-40'>ID {user.Identificacion}</span>
                <span className='block font-semibold'>{user.Nombres + " " + user.Apellidos}</span>
                <span className='block font-semibold text-wrap'>{user.Email}</span>
                <span className='block font-semibold'>{user.Direccion}</span>
                <span className='block font-semibold mb-2'>{"Tel. " + user.Telefono}</span>
                <span className={`block font-semibold border-2 w-24 text-center rounded-2xl mx-auto ${user.IdEstado == 1 ? ' text-green-600 bg-green-100' : user.IdEstado == 2 ? ' bg-gray-100 text-gray-600' : ''}`}>
                    {user.IdEstado == 1 ? 'Activo' : user.IdEstado == 2 ? 'Inactivo' : ''}
                </span>
            </div>
            <div className='flex mt-4 mb-2 justify-center'>
                <button
                    onClick={() => onEditClick(user)}
                    className="text-blue-600 hover:text-blue-900 mr-15 cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9">
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                </button>
                { // si el id de los datos de la sesion del usuario es igual al id del usuario el boton que cambia el estado del usuario se deshabilita
                    usuario.id == user.IdUsuario ?
                        <Switch checked={user.IdEstado === 1} onChange={() => onToggleStatus(user)} disabled />
                        :
                        <Switch checked={user.IdEstado === 1} onChange={() => onToggleStatus(user)} />
                }
            </div>
        </div>
    )
}
export default UserCard;