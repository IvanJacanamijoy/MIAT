import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form/Form'; // Asegúrate de que la ruta al componente Form sea correcta
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { iniciarSesion, usuario } = useAuth(); // Usamos el contexto de autenticación

    // Verificar si ya hay un usuario logueado
    useEffect(() => {
        if (usuario) {
            navigate(`/${usuario.rol}`);
        }
    }, [navigate, usuario]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!email || !password) {
            setError('Por favor, ingresa tu email y contraseña.');
            setIsLoading(false);
            return;
        }

        try {
            // Conexión con tu API de backend
            const response = await fetch('http://localhost:3000/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password }),
            });
            console.log(`correo: ${email} y contraseña ${password}`)

            const data = await response.json();

            if (response.ok) {
                // Llamar a la función iniciarSesion del contexto
                const usuarioData = {
                    id: data.id,
                    email: data.email,
                    rol: data.rol === 1 ? 'admin' : data.usuario.IdRol === 2 ? 'cliente' : 'tecnico',
                    nombre: data.nombre
                };
                iniciarSesion(usuarioData); // Actualiza el contexto y localStorage
            } else {
                setError(data.mensaje || 'Error al iniciar sesión. Credenciales incorrectas.');
            }
        } catch (error) {
            setError(`Error: ${error.message || 'Hubo un problema al iniciar sesión. Por favor, intenta de nuevo.'}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-[url(src/assets/images/home/imagen_fondo.png)] bg-local bg-center bg-cover bg-opacity-70'> {/* Centrar el formulario y aplicar imagen de fondo */}
            <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-md"> {/* Ajustar el ancho y la opacidad del contenedor del formulario */}
                <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
                <Form
                    onSubmit={handleLogin}
                    styles="space-y-4"
                    inputs={[
                        {
                            label: 'Email',
                            type: 'email',
                            value: email,
                            onChange: (e) => setEmail(e.target.value),
                            placeholder: 'Ingresa tu email',
                            disabled: isLoading,
                        },
                        {
                            label: 'Contraseña',
                            type: 'password',
                            value: password,
                            onChange: (e) => setPassword(e.target.value),
                            placeholder: 'Ingresa tu contraseña',
                            disabled: isLoading,
                        },
                    ]}
                    error={error}
                    isLoading={isLoading}
                    buttonText={isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                />
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
