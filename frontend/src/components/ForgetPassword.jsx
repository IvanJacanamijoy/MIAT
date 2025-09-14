import { useState } from "react";
import { motion } from "framer-motion";
import {
  fadeIn,
  zoomIn,
  slideIn,
  pulse,
} from "../Animations/variants"; // 👈 ajusta la ruta si es diferente
import logoMiat from "/src/assets/images/navbar/logo_miat_rojo.png";

const ForgetPassword = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/auth/forgetpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Se ha enviado un enlace de recuperación a tu correo.");
        setEmail("");
      } else {
        setError(data.message || "Error al enviar el correo.");
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={zoomIn(0.2)}
      initial="hidden"
      animate="show"
      className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-2xl relative overflow-hidden"
    >
      {/* Logo animado */}
      <motion.div
        variants={pulse(0.4)}
        initial="hidden"
        animate="show"
        className="flex justify-center mb-4"
      >
        <img src={logoMiat} alt="Logo MIAT" className="w-30 h-20" />
      </motion.div>

      {/* Título */}
      <motion.h2
        variants={fadeIn("down", 0.3)}
        initial="hidden"
        animate="show"
        className="text-2xl font-bold text-center text-gray-900 mb-6"
      >
        Recuperar contraseña
      </motion.h2>

      {/* Formulario */}
      <motion.form
        variants={slideIn("up", 0.4)}
        initial="hidden"
        animate="show"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Ingresa tu correo electrónico
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="ejemplo@correo.com"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transition-all ${
            loading ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {loading ? "Enviando..." : "Enviar enlace"}
        </motion.button>
      </motion.form>

      {/* Mensajes */}
      {message && (
        <p className="text-green-600 mt-4 text-center font-medium">{message}</p>
      )}
      {error && (
        <p className="text-red-600 mt-4 text-center font-medium">{error}</p>
      )}

      {/* Botón volver */}
      <motion.p
        variants={fadeIn("up", 0.5)}
        initial="hidden"
        animate="show"
        className="mt-6 text-center text-sm"
      >
        <button
          onClick={onClose}
          className="text-blue-500 hover:underline font-medium"
        >
          Volver al login
        </button>
      </motion.p>
    </motion.div>
  );
};

export default ForgetPassword;
