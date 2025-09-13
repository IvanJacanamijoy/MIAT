import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {fadeIn, zoomIn, rotateIn, staggerContainer, slideIn, bounceIn, pulse,} from "../../Animations/variants";
import { ClipboardList, CheckCircle, CalendarClock, FileText } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { fetchVisitasTecnicasApi } from "../../service/visitasTecnicas";
import fondo from "../../assets/images/home/imagen_fondo_nosotros.png";
import VisitCard from "../../components/TechnicalVisitsFilterForm/VisitCard";
import EmptyState from "../../components/Common/EmptyState";

const TechnicianDashboard = () => {
  const { usuario, authToken } = useAuth();
  const [visitas, setVisitas] = useState([]);

  useEffect(() => {
    const obtenerVisitas = async () => {
      try {
        const data = await fetchVisitasTecnicasApi(authToken);
        const soloTecnico = data.filter(v => v.tecnico?.id === usuario.id);
        setVisitas(soloTecnico);
      } catch (error) {
        console.error("Error cargando visitas:", error);
      }
    };

    obtenerVisitas();
  }, [authToken, usuario.id]);

  const visitasHoy = visitas.filter(
    v => new Date(v.fecha).toDateString() === new Date().toDateString()
  );
  const visitasPendientes = visitas.filter(v => v.EstadoDescripcion === "Pendiente");
  const visitasFinalizadas = visitas.filter(v => v.EstadoDescripcion === "Finalizado");

  return (
    <div className="min-h-screen bg-gray-200 relative max-w-7xl mx-auto">
      {/* Hero */}
      <section
        className="relative w-full h-[280px] md:h-[320px] overflow-hidden bg-cover bg-center shadow-xl mb-12"
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
            className="text-4xl md:text-5xl font-bold drop-shadow-xl"
            variants={fadeIn("down", 0.3)}
          >
            Panel Técnico - Bienvenido {usuario.nombres}
          </motion.h1>
          <motion.p
            className="mt-3 text-lg md:text-xl max-w-2xl"
            variants={fadeIn("up", 0.5)}
          >
            Aquí encuentras tus visitas técnicas y reportes del día.
          </motion.p>
        </motion.div>
      </section>

      {/* Tarjetas resumen */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 px-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-yellow-400 hover:shadow-xl transition transform hover:scale-105"
          variants={slideIn("left", 0.2)}
        >
          <h3 className="text-lg font-semibold mb-2">Visitas para Hoy</h3>
          <div className="flex items-center justify-between">
            <CalendarClock className="text-yellow-500 w-8 h-8" />
            <span className="text-3xl font-bold">{visitasHoy.length}</span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-400 hover:shadow-xl transition transform hover:scale-105"
          variants={slideIn("right", 0.3)}
        >
          <h3 className="text-lg font-semibold mb-2">Pendientes</h3>
          <div className="flex items-center justify-between">
            <ClipboardList className="text-red-500 w-8 h-8" />
            <span className="text-3xl font-bold">{visitasPendientes.length}</span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-400 hover:shadow-xl transition transform hover:scale-105"
          variants={bounceIn}
        >
          <h3 className="text-lg font-semibold mb-2">Finalizadas</h3>
          <div className="flex items-center justify-between">
            <CheckCircle className="text-green-500 w-8 h-8" />
            <span className="text-3xl font-bold">{visitasFinalizadas.length}</span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-400 hover:shadow-xl transition transform hover:scale-105"
          variants={pulse}
        >
          <h3 className="text-lg font-semibold mb-2">Total Asignadas</h3>
          <div className="flex items-center justify-between">
            <FileText className="text-blue-500 w-8 h-8" />
            <span className="text-3xl font-bold">{visitas.length}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Lista de visitas próximas */}
      <motion.div
        className="mt-16 px-10"
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Próximas visitas técnicas
        </h2>
        {visitasHoy.length > 0 ? (
          visitasHoy.map((visita) => (
            <motion.div key={visita.id} variants={zoomIn(0.2)}>
              <VisitCard visita={visita} />
            </motion.div>
          ))
        ) : (
          <motion.div>
            <EmptyState
              description="No tienes visitas técnicas agendadas para hoy."
              icon="visits"
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TechnicianDashboard;

