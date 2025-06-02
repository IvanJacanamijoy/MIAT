import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [errors, setErrors] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        Nombres: '',
        Apellidos: '',
        Email: '',
        Identificacion: '',
        Contraseña: '',
        Direccion: '',
        Telefono: '',
        IdRol: 1,
        IdEstado:1,
    });

    // Maneja cambios en los inputs y actualiza el estado
    const handleChange = ({ target: { name, value } }) => {
        setFormData(prevData => ({ ...prevData, [name]: value }));
        // Limpia el error si el usuario corrige el campo
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        console.log('presiono el boton de enviar')
        e.preventDefault();
        if (!validateForm()) return; // Evita el envío si hay errores
        console.log('hay errores')

        console.log('Formulario enviado:', formData);
        alert('Registro guardado exitosamente');

        try {
            // Conexión con tu API de backend
            const response = await fetch('http://localhost:3000/usuarios/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData }),
            });

            const data = await response.json();

            navigate('/login')
        } catch (error) {
            setErrors(`Error: ${error.message || 'Hubo un problema al registrar el usurio. Por favor, intenta de nuevo.'}`);
        } finally {
            setIsLoading(false);
        }
    };

    const fields = [
        { label: 'Nombres', name: 'Nombres', type: 'text', required: true },
        { label: 'Apellidos', name: 'Apellidos', type: 'text', required: true },
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
        <div className='flex flex-col items-center justify-center min-h-screen bg-[url(src/assets/images/home/imagen_fondo.png)] bg-local bg-center bg-cover bg-opacity-70'> {/* Centrar el formulario y aplicar imagen de fondo */}
            <h2 className='text-5xl mb-14 text-white font-semibold text-shadow-lg'>Registra Tus Datos</h2>
            <div className="bg-black bg-opacity-90 p-8 rounded-xl shadow-lg w-[350px] sm:w-[500px]"> {/* Ajustar el ancho y la opacidad del contenedor del formulario */}
                {/* formulario de registro */}

                <div className="flex justify-center mb-4">
                    <img src="src/assets/images/navbar/logo_miat_rojo.png" alt="MIAT Logo" className="h-20" />
                </div>
                <form onSubmit={handleSubmit}>
                    {/* Iteración dinámica de campos */}
                    {fields.map(({ label, name, type, required }) => (
                        <div className="form-group" key={name}>
                            <label className='text-white block text-lg font-semibold' htmlFor={name}>{label}</label>
                            <input
                                id={name}
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                required={required}
                                aria-label={label}
                                className="bg-white w-full rounded-sm mt-1 px-2"
                            />
                            {/* Muestra mensaje de error si existe */}
                            {errors[name] && <p className="error-message">{errors[name]}</p>}
                        </div>
                    ))}
                    <span className='text-white block mt-2'>¿Ya tiene una cuenta? <a href="/login" className='text-blue-600 hover:underline-offset-1'>Inicie sesión</a></span>
                    {/* Botón de envío */}
                    <button type="submit" className="btn-save cursor-pointer bg-red-600 text-white p-3 rounded-2xl font-bold mt-3 mx-auto block">Registrarse</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;