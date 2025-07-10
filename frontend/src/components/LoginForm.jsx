import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { login } from "../service/auth";
const LoginForm = ({ styles }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { iniciarSesion, usuario } = useAuth(); // Usamos el contexto de autenticación
  // Nuevo estado para controlar la visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Verificar si ya hay un usuario logueado
  useEffect(() => {
    if (usuario) {
      navigate(`/${usuario.rol}`)
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
      const data = await login(email, password);

      if (data) {
        //si la respuesta es exitosa y contiene un token 
        if (data.token) {
          iniciarSesion(data.token); // Actualiza el contexto y localStorage
        }
      } else {
        setError(data.mensaje || 'Error al iniciar sesión. Credenciales incorrectas.');
      }
    } catch (error) {
      setError(`Error: ${error.message || 'Hubo un problema al iniciar sesión. Por favor, intenta de nuevo.'}`);
    } finally {
      setIsLoading(false);
    }
  };
  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = (e) => {
    e.preventDefault(); // Evita que el botón envíe el formulario
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <form onSubmit={handleLogin} className={styles} method='POST'>
      <div className="mb-4">
        <label htmlFor="email" className="block text-md font-semibold text-gray-700">
          Email
          <div className='relative mt-1'>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </div>
            <input
              type="email"
              onChange={(e) =>
                setEmail(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-red-600"
              placeholder="Ingresa tu email"
            />
          </div>
        </label>
        <label htmlFor="email" className="block text-md font-semibold text-gray-700">
          Contraseña
          <div className='relative mt-1'>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                    <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                    <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                  </svg>

                )}
              </button>
            </div>
            <input
              id="Contraseña"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) =>
                setPassword(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-red-600"
              placeholder="Ingresa tu contraseña"
            />
          </div>
        </label>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full cursor-pointer"
        >
          Ingresar
        </button>
      </div>
      <p className="text-center text-gray-600 text-sm mt-4">
        ¿No tienes una cuenta? <a href="/register" className="text-red-500 hover:text-red-800">Regístrate aquí</a>
      </p>
    </form>
  )
}

export default LoginForm;