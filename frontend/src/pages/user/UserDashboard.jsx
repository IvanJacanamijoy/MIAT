import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {fadeIn, zoomIn, staggerContainer, slideIn, bounceIn, pulse,} from "../../Animations/variants";
import { useAuth } from "../../context/AuthContext";
import { fetchVisitasTecnicasApi } from "../../service/visitasTecnicas";
import { fetchAllServicesApi } from "../../service/services";
import { getDiagnosticosApi } from "../../service/diagnostico";
import { fetchCotizacionesApi } from "../../service/cotizacion";
import fondo from "../../assets/images/home/imagen_fondo_nosotros.png";
import VisitCard from "../../components/TechnicalVisitsFilterForm/VisitCard";
import { CalendarClock, ClipboardList, FileText } from "lucide-react";
import { FaFileAlt, FaMoneyBillWave } from "react-icons/fa";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const { usuario, authToken } = useAuth();
  const [visitas, setVisitas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [cotizaciones, setCotizaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [visitasData, serviciosData, diagnosticosData, cotizacionesData] = await Promise.all([
          fetchVisitasTecnicasApi(authToken),
          fetchAllServicesApi(authToken, { clienteId: usuario.id }),
          getDiagnosticosApi(authToken),
          fetchCotizacionesApi(authToken)
        ]);

        // Filtrar solo los datos del cliente actual
        const soloCliente = visitasData.filter(v => v.cliente?.id === usuario.id);
        const diagnosticosCliente = diagnosticosData.filter(d => d.IdCliente === usuario.id);
        const cotizacionesCliente = cotizacionesData.filter(c => c.IdCliente === usuario.id);

        setVisitas(soloCliente);
        setServicios(serviciosData);
        setDiagnosticos(diagnosticosCliente);
        setCotizaciones(cotizacionesCliente);
      } catch (error) {
        console.error("Error al cargar el dashboard del cliente", error);
        toast.error("Error al cargar los datos del dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authToken, usuario.id]);

  const estadisticas = useMemo(() => {
    const visitasPendientes = visitas.filter(v => v.IdEstado === 1);
    const visitasFinalizadas = visitas.filter(v => v.IdEstado === 3);
    const serviciosActivos = servicios.filter(s => s.IdEstado !== 3);
    const serviciosCompletados = servicios.filter(s => s.IdEstado === 3);
    const diagnosticosPendientes = diagnosticos.filter(d => d.IdEstado === 1);
    const cotizacionesPendientes = cotizaciones.filter(c => c.IdEstado === 1);
    const cotizacionesAceptadas = cotizaciones.filter(c => c.IdEstado === 2);

    return {
      visitasPendientes,
      visitasFinalizadas,
      serviciosActivos,
      serviciosCompletados,
      diagnosticosPendientes,
      cotizacionesPendientes,
      cotizacionesAceptadas
    };
  }, [visitas, servicios, diagnosticos, cotizaciones]);

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
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-6 px-10"
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
              {estadisticas.visitasPendientes.length}
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
              {estadisticas.visitasFinalizadas.length}
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
              {estadisticas.serviciosActivos.length}
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
              {estadisticas.serviciosCompletados.length}
            </span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 border-t-4 border-purple-400"
          variants={bounceIn}
        >
          <h3 className="text-lg font-semibold mb-2">Diagnósticos Pendientes</h3>
          <div className="flex items-center justify-between">
            <FaFileAlt className="text-purple-500 w-8 h-8" />
            <span className="text-3xl font-bold">
              {estadisticas.diagnosticosPendientes.length}
            </span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 border-t-4 border-indigo-400"
          variants={pulse}
        >
          <h3 className="text-lg font-semibold mb-2">Cotizaciones Aceptadas</h3>
          <div className="flex items-center justify-between">
            <FaMoneyBillWave className="text-indigo-500 w-8 h-8" />
            <span className="text-3xl font-bold">
              {estadisticas.cotizacionesAceptadas.length}
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
        {visitas.length > 0 ? (
          visitas.slice(0, 3).map((visita) => (
            <motion.div key={visita.IdCita} variants={zoomIn(0.2)}>
              <VisitCard visita={visita} modoCliente={true} />
            </motion.div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            No tienes visitas técnicas registradas
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UserDashboard;
