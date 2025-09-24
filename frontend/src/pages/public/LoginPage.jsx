import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import ForgetPassword from "../../components/ForgetPassword";
import ResetPassword from "../../components/ResetPassword";
import Modal from "../../components/Common/Modal";

// Importar imagen optimizada en formato WebP para mejor rendimiento en producción
import imagenFondo from "../../assets/images/home/imagen_fondo.webp";

const LoginPage = () => {
  const location = useLocation();
  const [activeForm, setActiveForm] = useState(null);
  const [resetToken, setResetToken] = useState(null);

  // 👉 Detectar si viene un token en la URL para resetear contraseña
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("resetToken");
    if (token) {
      setResetToken(token);
      setActiveForm("resetpassword");
    }
  }, [location]);

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-local bg-center bg-cover bg-opacity-70"
      style={{ backgroundImage: `url(${imagenFondo})` }}
    >
      {/* Botón de volver al inicio (mobile y desktop) */}
      <a
        href="/"
        className="text-red-500 absolute z-50 top-0 left-0 ml-5 mt-4 border-2 border-red-500 rounded-full p-1 hover:text-red-700 hover:border-red-700 shadow-md block xl:hidden shadow-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-8"
        >
          <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
          <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
        </svg>
      </a>

      <a
        href="/"
        className="text-red-500 absolute z-50 top-0 left-0 ml-5 mt-4 border-2 border-red-500 rounded-full px-3 py-1 hover:text-red-700 hover:border-red-700 shadow hidden xl:block shadow-black"
      >
        Inicio
      </a>

      {/* Formulario de login */}
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        {/* 👇 aquí pasamos openModal para que el link de "olvidaste tu contraseña" funcione */}
        <LoginForm openModal={setActiveForm} />
      </div>

      {/* Modal para olvidar/restablecer contraseña */}
      <Modal isOpen={!!activeForm} onClose={() => setActiveForm(null)}>
        {activeForm === "forgetpassword" && (
          <ForgetPassword onClose={() => setActiveForm(null)} />
        )}
        {activeForm === "resetpassword" && (
          <ResetPassword
            token={resetToken}
            onClose={() => setActiveForm(null)}
          />
        )}
      </Modal>
    </div>
  );
};

export default LoginPage;

