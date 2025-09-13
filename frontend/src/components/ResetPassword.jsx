import { useState } from "react";
import { motion } from "framer-motion";
import {
  fadeIn,
  zoomIn,
  slideIn,
  pulse,
} from "../Animations/variants"; 
import logoMiat from "/src/assets/images/navbar/logo_miat_rojo.png";

const ResetPassword = ({ token, onClose }) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/auth/resetpassword/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Contraseña restablecida correctamente.");
        setPassword("");
        setConfirm("");
        setTimeout(() => {
          onClose(); // cerrar modal y volver al login
        }, 2000);
      } else {
        setError(data.message || "Error al restablecer la contraseña.");
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
        variants={pulse(0.3)}
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
        Nueva contraseña
      </motion.h2>

      {/* Formulario */}
      <motion.form
        variants={slideIn("up", 0.4)}
        initial="hidden"
        animate="show"
        onSubmit={handleSubmit}
      >
        {/* Campo contraseña */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nueva contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Ingresa tu nueva contraseña"
        />

        {/* Confirmación */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirmar contraseña
        </label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Confirma tu contraseña"
        />

        {/* Botón */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transition-all ${
            loading ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {loading ? "Guardando..." : "Restablecer contraseña"}
        </motion.button>
      </motion.form>

      {/* Mensajes */}
      {message && (
        <p className="text-green-600 font-medium mt-4 text-center">{message}</p>
      )}
      {error && (
        <p className="text-red-500 font-medium mt-4 text-center">{error}</p>
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

export default ResetPassword;
