import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import LoginForm from "../../components/LoginForm";
import ForgetPassword from "../../components/ForgetPassword";
import ResetPassword from "../../components/ResetPassword";
import Modal from "../../components/Common/Modal";
import { ServiceCarousel } from "../../components/ServiceCarousel";

import { fadeIn, zoomIn, rotateIn } from "../../Animations/variants";
import { useAuth } from "../../context/AuthContext";

// Importar imágenes optimizadas en formato WebP para mejor rendimiento en producción
import imagenFondoNosotros from "../../assets/images/home/imagen_fondo_nosotros.webp";
import imagenFondoServicios from "../../assets/images/home/imagen_fondo_servicios.webp";
import imagenAgendar from "../../assets/images/home/imagen_fondo_agendar.webp";
import imagenLogoRojo from "../../assets/images/navbar/logo_miat_rojo.webp";

// Importar imágenes del carrusel de servicios
import servicio1 from "../../assets/images/servicecarousel/servicio_1.webp";
import servicio2 from "../../assets/images/servicecarousel/servicio_2.webp";
import servicio3 from "../../assets/images/servicecarousel/servicio_3.webp";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario } = useAuth();

  const [activeForm, setActiveForm] = useState(null);
  const [resetToken, setResetToken] = useState(null);

  // 👉 Detectar si viene un token desde la URL (?resetToken=xxxx)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("resetToken");
    if (token) {
      setResetToken(token);
      setActiveForm("resetpassword");
    }
  }, [location]);

  //importando las imagenes del carrucel 

  const carouselItems = [
    {
      titulo: "Servicio Eléctrico Residencial",
      descripcion: "Soluciones completas para tu hogar con garantía de 2 años",
      imageUrl: servicio1,
      textoBoton: "Ver Mas",
    },
    {
      titulo: "Servicio Eléctrico otro",
      descripcion: "Soluciones completas para tu hogar con garantía de 2 años",
      imageUrl: servicio2,
      textoBoton: "Ver Mas",
    },
    {
      titulo: "Servicio otro Residencial",
      descripcion: "Soluciones completas para tu hogar con garantía de 2 años",
      imageUrl: servicio3,
      textoBoton: "Ver Mas",
    },
    {
      titulo: "Servicio Eléctrico Residencial",
      descripcion: "Soluciones completas para tu hogar con garantía de 2 años",
      imageUrl: servicio1,
      textoBoton: "Ver Mas",
    },
    {
      titulo: "Servicio Eléctrico otro",
      descripcion: "Soluciones completas para tu hogar con garantía de 2 años",
      imageUrl: servicio2,
      textoBoton: "Ver Mas",
    },
    {
      titulo: "Servicio otro Residencial",
      descripcion: "Soluciones completas para tu hogar con garantía de 2 años",
      imageUrl: servicio3,
      textoBoton: "Ver Mas",
    },
  ];

  // 👉 función para manejar el click en el botón "¡Agenda AQUI!"
  const handleAgendarClick = () => {
    if (usuario) {
      navigate("/visitatecnica", { state: { openForm: true } });
    } else {
      navigate("/login", {
        state: { from: "/visitatecnica", openForm: true },
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <section className="relative lg:h-[500px] md:w-[945px] lg:w-[1280px] max-w-full">
        <div 
          className="absolute inset-0 bg-local bg-center bg-cover opacity-80"
          style={{ backgroundImage: `url(${imagenFondoNosotros})` }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:py-10">
          <div className="grid md:grid-cols-2 gap-4 md:gap-12 items-center h-full my-7 md:my-0">
            {/* Texto */}
            <motion.div
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              animate="show"
            >
              <h2 className="text-4xl font-bold text-white mb-6 text-shadow-lg">
                Calidad y precisión en cada conexión
              </h2>
              <p className="text-lg text-white mb-8 font-semibold text-shadow-lg">
                Cotiza y agenda tu servicio de manera rápida y confiable, con la
                mejor atención y el respaldo de técnicos altamente
                experimentados. Garantizamos soluciones eléctricas seguras y de
                calidad para tu tranquilidad.
              </p>
            </motion.div>

            {/* Login */}
            <motion.div
              variants={zoomIn(0.4)}
              initial="hidden"
              animate="show"
              className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg"
            >
              <LoginForm openModal={setActiveForm} />
            </motion.div>
          </div>

          {/* Modal para recuperar/restablecer contraseña */}
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
      </section>

      {/* Agenda tu servicio */}
      <section className="mx-auto max-h-screen grid grid-cols-2 md:grid-cols-5 lg:grid-cols-3 bg-white h-[400px] md:h-[500px] md:w-[945px] lg:w-[1280px] max-w-full">
        <motion.div
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.2 }}
          className="my-auto flex flex-col px-4 sm:px-10 py-4 col-span-2 md:col-span-3 lg:col-span-2"
        >
          <h2 className="text-4xl lg:text-7xl font-bold">Agenda Tu Servicio</h2>
          <p className="py-6 text-lg font-semibold">
            Agenda el servicio que necesitas y recibe una visita técnica para
            evaluar tu requerimiento. Nuestro equipo especializado realizará un
            análisis detallado y te proporcionará una cotización precisa para
            continuar con la solución más adecuada.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors justify-center max-w-xs mx-auto"
            onClick={handleAgendarClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            ¡Agenda AQUI!
          </motion.button>
        </motion.div>

        <motion.img
          variants={zoomIn(0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.2 }}
          src={imagenAgendar}
          alt=""
          className="max-h-screen min-h-[500px] hidden md:block md:col-span-2 lg:col-span-1 box-border"
        />
      </section>

      {/* Carrusel de servicios */}
      <section 
        className="bg-local bg-cover bg-center max-w-full h-[560px] md:w-[945px] lg:w-[1280px]"
        style={{ backgroundImage: `url(${imagenFondoServicios})` }}
      >
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.2 }}
          className="h-full"
        >
          <ServiceCarousel items={carouselItems} />
        </motion.div>
      </section>

      {/* Sección final */}
      <section 
        className="bg-local bg-cover bg-center max-w-full h-[560px] w-full md:w-[945px] lg:w-[1280px] flex justify-center items-center"
        style={{ backgroundImage: `url(${imagenFondoNosotros})` }}
      >
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.2 }}
          className="text-center w-2xl lg:w-8xl xl:w-4xl flex flex-col items-center bg-gray-950 py-15 px-10 lg:px-25 rounded-2xl my-10 m-4 sm:m-0"
        >
          <motion.img
            variants={rotateIn(0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.2 }}
            src={imagenLogoRojo}
            alt="logo miat"
            className="w-40 lg:w-50 mb-4"
            loading="lazy"
            decoding="async"
          />
          <p className="font-semibold lg:font-bold text-white text-md lg:text-xl">
            Nuestras cotizaciones son detalladas y transparentes, permitiéndote
            conocer el costo estimado de tu servicio antes de aprobarlo. A
            través del sistema, podrás verificar cada cotización y decidir si
            aceptarla o rechazarla, asegurando que tengas el control total sobre
            tu solicitud.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
