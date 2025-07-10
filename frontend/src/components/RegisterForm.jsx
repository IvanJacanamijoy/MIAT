import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../service/auth';

const RegisterForm = () => {
    const [errors, setErrors] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Nuevo estado para controlar la visibilidad de la contraseña
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        Nombres: '',
        Apellidos: '',
        Email: '',
        Identificacion: '',
        Contraseña: '',
        Direccion: '',
        Telefono: '',
        IdRol: 1,
        IdEstado: 1,
    });

    // Maneja cambios en los inputs y actualiza el estado
    const handleChange = ({ target: { name, value } }) => {
        setFormData(prevData => ({ ...prevData, [name]: value }));
        // Limpia el error si el usuario corrige el campo
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    // Función para alternar la visibilidad de la contraseña
    const togglePasswordVisibility = (e) => {
        e.preventDefault(); // Evita que el botón envíe el formulario
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    const handleSubmit = async (e) => {
        console.log('presiono el boton de enviar')
        e.preventDefault();
        if (!validateForm()) return; // Evita el envío si hay errores

        setIsLoading(true); // Mostrar indicador de carga

        try {
            // Conexión con tu API de backend
            const response = register({...formData});
            if (response) { // Verifica si la respuesta fue exitosa (status 2xx)
                alert('Usuario registrado correctamente');
                navigate('/login');
            } else {
                // Maneja errores de la API, por ejemplo, si el correo ya está registrado
                setErrors(data.message || 'Hubo un problema al registrar el usuario.');
            }
        } catch (error) {
            setErrors(`Error: ${error.message || 'Hubo un problema de conexión. Por favor, intenta de nuevo.'}`);
        } finally {
            setIsLoading(false); // Ocultar indicador de carga
        }
    };

    const fields = [
        { label: 'Nombre(s)', name: 'Nombres', type: 'text', required: true },
        { label: 'Apellido(s)', name: 'Apellidos', type: 'text', required: true },
        { label: 'Número de Cédula', name: 'Identificacion', type: 'text', required: true },
        { label: 'Número Telefónico', name: 'Telefono', type: 'tel', required: true },
        { label: 'Dirección', name: 'Direccion', type: 'text', required: true },
        { label: 'Correo Electrónico', name: 'Email', type: 'email', required: true },
        { label: 'Contraseña', name: 'Contraseña', type: 'password', required: true },
    ];
    // Función para validar los datos antes del envío
    const validateForm = () => {
        const newErrors = {};

        if (!formData.Nombres.trim()) newErrors.Nombres = 'El nombre es requerido.';
        if (!formData.Apellidos.trim()) newErrors.Apellidos = 'El apellido es requerido.';
        if (!formData.Identificacion) newErrors.Identificacion = 'El número de cédula es requerido.';
        if (!formData.Telefono) newErrors.Telefono = 'El número telefónico es requerido.';
        if (!formData.Direccion.trim()) newErrors.Direccion = 'La dirección es requerida.';
        if (!formData.Email.includes('@')) newErrors.Email = 'El correo debe ser válido.';
        if (!formData.Contraseña) newErrors.Contraseña = 'La contraseña es requerida.'; // Asegúrate de validar la contraseña si es necesario

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
    };

    return (
        <form onSubmit={handleSubmit}>
            {fields.map(({ label, name, type, required }) => (
                <div className="form-group" key={name}>
                    <label className='block text-md font-semibold text-gray-700' htmlFor={name}>
                        {label}
                        <div className='relative mt-1'>
                            {/* Aquí está el bloque condicional para el campo de contraseña */}
                            {name === 'Contraseña' ? (
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center z-40">
                                    <button
                                        type="button" // Importante: usa type="button" para evitar que envíe el formulario
                                        onClick={togglePasswordVisibility}
                                        className="cursor-pointer text-gray-500 hover:text-gray-700" // Estilos para el botón
                                    >
                                        {showPassword ? (
                                            // Ícono de ojo abierto (mostrar contraseña)
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
                                            </svg>

                                        ) : (
                                            // Ícono de ojo cerrado (ocultar contraseña)
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                                <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                                                <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                                                <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                                            </svg>

                                        )}
                                    </button>
                                </div>
                            ) : null}

                            <input
                                id={name}
                                // Determina el tipo de input basado en el estado showPassword
                                type={name === 'Contraseña' ? (showPassword ? 'text' : 'password') : type}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                required={required}
                                aria-label={label}
                                // Ajusta el padding derecho del input para el botón
                                className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-red-600 ${name === 'Contraseña' ? 'pr-10' : ''}`}
                            />
                        </div>
                    </label>
                    {errors[name] && <p className="error-message text-red-500 text-sm mt-1">{errors[name]}</p>}
                </div>
            ))}
            <button type="submit" className="btn-save cursor-pointer bg-red-500 hover:bg-red-700 text-white p-3 rounded-2xl font-bold mt-3 mx-auto block" disabled={isLoading}>
                {isLoading ? 'Registrando...' : 'Registrarse'}
            </button>
            <p className='text-center text-gray-600 text-sm mt-2'>¿Ya tiene una cuenta? <a href="/login" className='text-red-500 hover:text-red-800'>Inicie sesión</a></p>
        </form>
    );
};

export default RegisterForm;