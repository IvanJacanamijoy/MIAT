import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Verificar si ya hay un usuario logueado
  useEffect(() => {
    const usuarioLogueado = localStorage.getItem('usuario');
    if (usuarioLogueado) {
      const usuario = JSON.parse(usuarioLogueado);
      navigate(`/${usuario.rol}`);
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    console.log(``)

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
        body: JSON.stringify({ Email: email, Contraseña: password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Almacenar la información del usuario (incluyendo el rol)
        localStorage.setItem('usuario', JSON.stringify({
          id: data.usuario.IdPersona,
          email: data.usuario.Email,
          rol: data.usuario.IdRol === 1 ? 'usuario' : data.usuario.IdRol === 2 ? 'tecnico' : 'admin',
          nombre: data.usuario.Nombres
        }));
        // Redirigir al dashboard según el rol
        navigate(`/${data.usuario.IdRol === 1 ? 'usuario' : data.usuario.IdRol === 2 ? 'tecnico' : 'admin'}`);
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
    // Contenedor principal del formulario que centra el contenido vertical y horizontalmente
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Tarjeta del formulario con fondo blanco, bordes redondeados y sombra */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {/* Contenedor para el logo, centrado en la parte superior */}
        <div className="flex justify-center mb-4">
          <img src="src/assets/images/navbar/logo_miat_rojo.png" alt="MIAT Logo" className="h-12" />
        </div>

        {/* Inicio del formulario */}
        <form onSubmit={handleLogin}>
          {/* Campo de entrada para el correo electrónico */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-red-600"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresa tu email"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Campo de entrada para la contraseña */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-red-600"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Sección con checkbox para recordar contraseña y enlace para recuperación */}
          <div className="flex items-center justify-between mb-4">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-red-600" />
              <span className="ml-2 text-gray-700">Recordar Contraseña</span>
            </label>
            <a href="#" className="inline-block align-baseline font-bold text-sm text-red-600 hover:text-red-800">
              Olvidé mi contraseña
            </a>
          </div>

          {/* Botón para enviar el formulario */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;