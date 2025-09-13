import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {fadeIn, zoomIn, staggerContainer, slideIn, bounceIn, pulse,} from "../../Animations/variants";
import { useAuth } from "../../context/AuthContext";
import { fetchVisitasTecnicasApi } from "../../service/visitasTecnicas";
import { fetchAllServicesApi } from "../../service/services";
import fondo from "../../assets/images/home/imagen_fondo_nosotros.png";
import VisitCard from "../../components/TechnicalVisitsFilterForm/VisitCard";
import { CalendarClock, ClipboardList, FileText } from "lucide-react";

const UserDashboard = () => {
  const { usuario, authToken } = useAuth();
  const [visitas, setVisitas] = useState([]);
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const visitasData = await fetchVisitasTecnicasApi(authToken);
        const soloCliente = visitasData.filter(
          (v) => v.cliente?.id === usuario.id
        );
        setVisitas(soloCliente);

        const serviciosData = await fetchAllServicesApi(authToken, {
          clienteId: usuario.id,
        });
        setServicios(serviciosData);
      } catch (error) {
        console.error("Error al cargar el dashboard del cliente", error);
      }
    };

    cargarDatos();
  }, [authToken, usuario.id]);

  const visitasPendientes = visitas.filter(
    (v) => v.EstadoDescripcion === "Pendiente"
  );
  const visitasFinalizadas = visitas.filter(
    (v) => v.EstadoDescripcion === "Finalizado"
  );
  const serviciosActivos = servicios.filter(
    (s) => s.EstadoDescripcion !== "Finalizado"
  );
  const serviciosCompletados = servicios.filter(
    (s) => s.EstadoDescripcion === "Finalizado"
  );

  return (
    <div className="min-h-screen bg-gray-200 relative max-w-7xl mx-auto">
      {/* Hero con animación y fondo */}
      <section
        className="relative w-full h-[300px] overflow-hidden bg-cover bg-center shadow-xl mb-12"
        style={{ backgroundImage: `url(${fondo})` }}
      >
        <div className="absolute inset-0 bg-black/50 z-10" />
        <motion.div
          className="relative z-20 flex flex-col justify-center items-center h-full text-white text-center px-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold drop-shadow-lg"
            variants={fadeIn("down", 0.3)}
          >
            ¡Bienvenido, {usuario.nombres}!
          </motion.h1>
          <motion.p
            className="mt-4 text-lg md:text-xl max-w-2xl"
            variants={fadeIn("up", 0.5)}
          >
            Aquí puedes consultar el estado de tus visitas técnicas y servicios
            agendados.
          </motion.p>
        </motion.div>
      </section>

      {/* Tarjetas Resumen */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 border-t-4 border-red-400"
          variants={bounceIn}
        >
          <h3 className="text-lg font-semibold mb-2">Visitas Pendientes</h3>
          <div className="flex items-center justify-between">
            <CalendarClock className="text-red-500 w-8 h-8" />
            <span className="text-3xl font-bold">
              {visitasPendientes.length}
            </span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 border-t-4 border-green-400"
          variants={pulse}
        >
          <h3 className="text-lg font-semibold mb-2">Visitas Finalizadas</h3>
          <div className="flex items-center justify-between">
            <ClipboardList className="text-green-500 w-8 h-8" />
            <span className="text-3xl font-bold">
              {visitasFinalizadas.length}
            </span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 border-t-4 border-yellow-400"
          variants={slideIn("left", 0.4)}
        >
          <h3 className="text-lg font-semibold mb-2">Servicios Activos</h3>
          <div className="flex items-center justify-between">
            <FileText className="text-yellow-500 w-8 h-8" />
            <span className="text-3xl font-bold">
              {serviciosActivos.length}
            </span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 border-t-4 border-blue-400"
          variants={slideIn("right", 0.4)}
        >
          <h3 className="text-lg font-semibold mb-2">Servicios Completados</h3>
          <div className="flex items-center justify-between">
            <FileText className="text-blue-500 w-8 h-8" />
            <span className="text-3xl font-bold">
              {serviciosCompletados.length}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Listado de últimas visitas */}
      <motion.div
        className="mt-16"
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Últimas Visitas Técnicas
        </h2>
        {visitas.slice(0, 3).map((visita) => (
          <motion.div key={visita.id} variants={zoomIn(0.2)}>
            <VisitCard visita={visita} modoCliente={true} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default UserDashboard;
