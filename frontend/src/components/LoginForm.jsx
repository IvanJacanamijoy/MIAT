import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { login } from "../service/auth";
import { fadeIn } from "../Animations/variants"; 

const LoginForm = ({ styles, openModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { iniciarSesion, usuario } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (usuario) {
      if (location.state?.from === "/visitatecnica") {
        navigate(location.state.from, { state: { openForm: location.state.openForm } });
      } else {
        navigate(`/${usuario.rol}`);
      }
    }
  }, [usuario, navigate, location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Por favor, ingresa tu email y contraseña.");
      setIsLoading(false);
      return;
    }

    try {
      const data = await login(email, password);

      if (data?.token) {
        iniciarSesion(data.token);

        const redirectTo = location.state?.from || `/${data.rol || "admin"}`;
        const openForm = location.state?.openForm || false;

        navigate(redirectTo, { state: { openForm } });
      } else {
        setError(data.mensaje || "Credenciales incorrectas.");
      }
    } catch (error) {
      setError(`Error: ${error.message || "Hubo un problema al iniciar sesión. Por favor, intenta de nuevo."}`);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  return (
    <form onSubmit={handleLogin} className={styles} method="POST">
      <div className="mb-4">
        {/* Email */}
        <label htmlFor="email" className="block text-md font-semibold text-gray-700">
          Email
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {/* ícono email */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-red-600"
              placeholder="Ingresa tu email"
            />
          </div>
        </label>

        {/* Contraseña */}
        <label htmlFor="password" className="block text-md font-semibold text-gray-700 mt-4">
          Contraseña
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {/* ícono candado */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center z-40">
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="cursor-pointer text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-red-600"
              placeholder="Ingresa tu contraseña"
            />
          </div>
        </label>

        {/* Link "Olvidaste tu contraseña" */}
        <div className="text-right mt-2">
          <button
            type="button"
            onClick={() => openModal("forgetpassword")} 
            className="text-sm text-red-500 hover:text-red-700"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {isLoading && <p className="text-center text-blue-500 mb-2">Cargando...</p>}

      <div className="flex justify-center">
        <motion.button
          type="submit"
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 rounded focus:outline-none focus:shadow-outline cursor-pointer"
          disabled={isLoading}
        >
          Ingresar
        </motion.button>
      </div>

      <p className="text-center text-gray-600 text-sm mt-4">
        ¿No tienes una cuenta?{" "}
        <a href="/register" className="text-red-500 hover:text-red-800">
          Regístrate aquí
        </a>
      </p>
    </form>
  );
};

export default LoginForm;

