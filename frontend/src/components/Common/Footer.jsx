// src/components/common/Footer.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, slideIn, staggerContainer, zoomIn } from "../../Animations/variants";
import { Mail, Phone, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logoMiat from "../../assets/images/navbar/logo_miat_rojo.png";

// Ícono simple para WhatsApp (respetando paleta gris/rojo)
const WhatsAppIcon = (props) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    fill="currentColor"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0 7.93 7.93 0 0 0 .064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004a7.93 7.93 0 0 0 7.93-7.93 7.9 7.9 0 0 0-2.327-5.607ZM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251A6.56 6.56 0 0 1 .947 7.922c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592Zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
  </svg>
);


export default function Footer() {
  const year = new Date().getFullYear();
  const navigate = useNavigate();

  const ROUTES = {
    contact: "/contacto",        // <Contact />
    homeService: "/login",// <HomeService />
    register: "/register",      // <RegisterPage />
  };

  // Copiar teléfono + aviso
  const phoneNumber = "+573228927106";
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // fallback simple
      alert("No se pudo copiar el número. Intenta manualmente.");
    }
  };

  return (
    <footer className="relative bg-white text-gray-700 shadow-md">
      {/* Banda roja superior */}
      <div className="h-1 w-full bg-red-500" />

      <motion.div
        variants={fadeIn("up", 0.05)}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-7xl px-6 pt-8 pb-4"
      >
        <motion.div
          variants={staggerContainer(0.1, 0.04)}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:grid-cols-3"
        >
          {/* Branding centrado */}
          <motion.section
            variants={zoomIn(0.05)}
            className="rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm"
          >
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center py-10 justify-center gap-3">
                <img
                  src={logoMiat}
                  alt="Logo MIAT"
                  className="h-10 w-auto select-none"
                  loading="lazy"
                />
                <div className="text-left">
                  <h1 className="text-lg font-semibold text-gray-900 leading-none">MIAT</h1>
                  <p className="text-xs text-gray-500 mt-1">Módulo Integral de Asistencia Técnica</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Qué podemos hacer por ti (usa useNavigate) */}
          <motion.nav
            variants={slideIn("up", 0.08)}
            aria-label="Navegación rápida"
            className="rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm"
          >
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-700 text-center md:text-left">
              Qué podemos hacer por ti
            </h2>
            <ul className="grid gap-1.5 text-center md:text-left">
              <li>
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.contact)}
                  className="inline-flex items-center justify-center gap-2 text-gray-700 hover:text-red-600 transition md:justify-start"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400/70" />
                  Contáctanos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.homeService)}
                  className="inline-flex items-center justify-center gap-2 text-gray-700 hover:text-red-600 transition md:justify-start"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400/70" />
                  Iniciar sesión
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.register)}
                  className="inline-flex items-center justify-center gap-2 text-gray-700 hover:text-red-600 transition md:justify-start"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400/70" />
                  Registrarse
                </button>
              </li>
            </ul>
          </motion.nav>

          {/* Contacto: copiar teléfono + aviso */}
          <motion.address
            variants={slideIn("up", 0.11)}
            className="relative not-italic rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm"
          >
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-700 text-center md:text-left">
              Comunícate con nosotros
            </h2>

            <div className="mx-auto flex max-w-xs items-center justify-between gap-4 py-1 text-gray-700 md:mx-0 md:justify-start">
              <a
                href="https://wa.me/573000000000"
                aria-label="Escríbenos por WhatsApp"
                className="rounded-lg bg-white p-2 ring-1 ring-gray-200 transition hover:ring-red-500"
              >
                <WhatsAppIcon className="h-8 w-8 text-gray-600" />
              </a>

              <a
                href="mailto:servicesmiat@gmail.com"
                aria-label="Enviar correo"
                className="rounded-lg bg-white p-2 ring-1 ring-gray-200 transition hover:ring-red-500"
              >
                <Mail className="h-8 w-8 text-gray-600" />
              </a>

              <button
                type="button"
                onClick={handleCopyPhone}
                aria-label="Copiar número de teléfono"
                className="rounded-lg bg-white p-2 ring-1 ring-gray-200 transition hover:ring-red-500 cursor-pointer"
              >
                <Phone className="h-8 w-8 text-gray-600" />
              </button>
            </div>

            {/* Aviso de copiado */}
            <div
              className={`pointer-events-none absolute right-4 top-4 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-1 text-xs font-medium text-red-700 ring-1 ring-red-200 transition-opacity ${
                copied ? "opacity-100" : "opacity-0"
              }`}
              aria-live="polite"
            >
              <CheckCircle2 className="h-4 w-4" />
              Número copiado: {phoneNumber}
            </div>

            <div className="mt-3 text-center md:text-left">
              <a
                href="mailto:servicesmiat@gmail.com"
                className="inline-block text-base font-semibold text-gray-800 underline underline-offset-4 hover:text-red-600 transition"
              >
                servicesmiat@gmail.com
              </a>
            </div>
          </motion.address>
        </motion.div>

        {/* Separador fino */}
        <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-red-500 to-transparent" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-2 pb-2 text-center text-xs text-gray-500 sm:flex-row sm:text-left">
          <p>© {year} Miat — Todos los derechos reservados.</p>
          <div className="flex gap-4">
            {/* <button type="button" onClick={() => navigate("/terminos")} className="hover:text-red-600 transition">
              Términos
            </button>
            <button type="button" onClick={() => navigate("/privacidad")} className="hover:text-red-600 transition">
              Privacidad
            </button>
            <button type="button" onClick={() => navigate("/soporte")} className="hover:text-red-600 transition">
              Soporte
            </button> */}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

