import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MessageSquare, Clock, CheckCircle2 } from "lucide-react";
import { fadeIn, staggerContainer } from "../../Animations/variants";

const Contact = () => {
  // Teléfono que se muestra y se copia
  const phoneDisplay = "325 534 634"; // lo que ves en pantalla
  const phoneToCopy = phoneDisplay;   // si quieres, pon aquí formato E.164 (p.ej. +57325534634)

  const [copied, setCopied] = useState(false);

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phoneToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      // Fallback simple si el navegador no permite copiar
      alert("No se pudo copiar el número. Intenta manualmente.");
    }
  };

  // Permitir activar con teclado
  const handleKeyCopy = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCopyPhone();
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 relative max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="relative w-full h-[250px] bg-cover bg-center flex items-center justify-center rounded-2xl overflow-hidden shadow-lg mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-red-200 via-gray-200 to-red-200 animate-pulse"></div>

        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold bg-red-500 bg-clip-text text-transparent drop-shadow-lg">
            ¡Contáctanos!
          </h1>
          <p className="text-lg md:text-xl text-gray-800 mt-4 max-w-2xl mx-auto">
            Nuestro equipo está listo para atenderte y brindarte la mejor experiencia.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/1244235235425"
              className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-semibold shadow-lg transition"
            >
              Escríbenos por WhatsApp
            </a>
            <a
              href="#formulario-contacto"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold shadow-lg transition"
            >
              Enviar mensaje
            </a>
          </div>
        </motion.div>
      </section>

      {/* Sección principal */}
      <motion.section
        id="formulario-contacto"
        variants={staggerContainer(0.2, 0.15)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        className="flex-1 container mx-auto px-6 py-2 grid grid-cols-1 lg:grid-cols-3 gap-10"
      >
        {/* Información de contacto */}
        <motion.div
          variants={fadeIn("left", 0.2)}
          className="relative bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between"
        >
          {/* Aviso flotante accesible */}
          <div
            className={`pointer-events-none absolute right-4 top-4 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-1 text-xs font-medium text-red-700 ring-1 ring-red-200 transition-opacity ${
              copied ? "opacity-100" : "opacity-0"
            }`}
            aria-live="polite"
          >
            <CheckCircle2 className="h-4 w-4" />
            Número copiado: {phoneDisplay}
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Información de Contacto
          </h2>

          <div className="space-y-6">
            <a
              href="https://wa.me/1244235235425"
              className="flex items-center gap-4 p-4 bg-green-500/10 rounded-xl hover:bg-green-500/20 transition"
            >
              <MessageSquare className="text-green-600" />
              <span className="font-medium text-gray-800">+1 244 235 234 25</span>
            </a>

            <a
              href="mailto:miatgmail.com"
              className="flex items-center gap-4 p-4 bg-red-500/10 rounded-xl hover:bg-red-500/20 transition"
            >
              <Mail className="text-red-600" />
              <span className="font-medium text-gray-800">servicesmiat@gmail.com</span>
            </a>

            {/* Teléfono: clic en el span copia al portapapeles */}
            <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-xl">
              <Phone className="text-blue-600" />
              <span
                role="button"
                tabIndex={0}
                onClick={handleCopyPhone}
                onKeyDown={handleKeyCopy}
                title="Copiar número"
                className="font-medium text-gray-800 outline-none cursor-pointer hover:underline focus:ring-2 focus:ring-red-500 rounded-sm px-1"
              >
                Tel: {phoneDisplay}
              </span>
            </div>
          </div>

          {/* Horarios */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="text-red-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                Horarios de Atención
              </h3>
            </div>
            <ul className="text-gray-700 space-y-1">
              <li>
                <span className="font-medium">Lunes a Viernes:</span> 8:00 AM - 6:00 PM
              </li>
              <li>
                <span className="font-medium">Sábados:</span> 9:00 AM - 2:00 PM
              </li>
              <li>
                <span className="font-medium">Domingos:</span> Cerrado
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Formulario */}
        <motion.div
          variants={fadeIn("up", 0.3)}
          className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Envíanos un mensaje
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Nombre completo"
              className="col-span-2 md:col-span-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500"
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              className="col-span-2 md:col-span-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500"
            />
            <textarea
              placeholder="Escribe tu mensaje..."
              rows="5"
              className="col-span-2 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              className="col-span-2 bg-red-600 text-white font-semibold py-4 px-12 rounded-xl hover:bg-red-700 transition mx-auto"
            >
              Enviar
            </button>
          </form>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Contact;
