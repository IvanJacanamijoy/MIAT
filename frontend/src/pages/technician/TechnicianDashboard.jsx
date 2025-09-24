import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {fadeIn, zoomIn, rotateIn, staggerContainer, slideIn, bounceIn, pulse,} from "../../Animations/variants";
import { ClipboardList, CheckCircle, CalendarClock, FileText } from "lucide-react";
import { FaFileAlt, FaMoneyBillWave, FaTools, FaExclamationTriangle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { fetchVisitasTecnicasApi } from "../../service/visitasTecnicas";
import { fetchAllServicesApi } from "../../service/services";
import { getDiagnosticosApi } from "../../service/diagnostico";
import { fetchCotizacionesApi } from "../../service/cotizacion";
import { toast } from "react-toastify";
import fondo from "../../assets/images/home/imagen_fondo_nosotros.png";
import VisitCard from "../../components/TechnicalVisitsFilterForm/VisitCard";
import EmptyState from "../../components/Common/EmptyState";

const TechnicianDashboard = () => {
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
        
        // Cargar todos los datos del técnico en paralelo
        const [visitasData, serviciosData, diagnosticosData, cotizacionesData] = await Promise.all([
          fetchVisitasTecnicasApi(authToken, { tecnicoId: usuario.id }),
          fetchAllServicesApi(authToken, { tecnicoId: usuario.id }),
          getDiagnosticosApi(authToken),
          fetchCotizacionesApi(authToken, { idTecnico: usuario.id })
        ]);

        setVisitas(visitasData);
        setServicios(serviciosData);
        
        // Filtrar diagnósticos del técnico
        const diagnosticosTecnico = diagnosticosData.filter(d => d.IdTecnico === usuario.id);
        setDiagnosticos(diagnosticosTecnico);
        
        setCotizaciones(cotizacionesData);
      } catch (error) {
        console.error("Error al cargar datos del dashboard:", error);
        toast.error("Error al cargar datos del dashboard");
      } finally {
        setLoading(false);
      }
    };

    if (authToken && usuario?.id) {
      fetchData();
    }
  }, [authToken, usuario?.id]);

  // Cálculos dinámicos de estadísticas del técnico
  const estadisticas = useMemo(() => {
    const visitasHoy = visitas.filter(
      v => new Date(v.Fecha).toDateString() === new Date().toDateString()
    );
    const visitasPendientes = visitas.filter(v => v.IdEstado === 1);
    const visitasFinalizadas = visitas.filter(v => v.IdEstado === 4);
    const serviciosActivos = servicios.filter(s => s.IdEstado !== 7);
    const diagnosticosPendientes = diagnosticos.filter(d => !d.tieneCotizacion);
    const cotizacionesPendientes = cotizaciones.filter(c => c.IdEstado === 5);
    const cotizacionesAceptadas = cotizaciones.filter(c => c.IdEstado === 6);

    return {
      visitasHoy: visitasHoy.length,
      visitasPendientes: visitasPendientes.length,
      visitasFinalizadas: visitasFinalizadas.length,
      totalVisitas: visitas.length,
      serviciosActivos: serviciosActivos.length,
      diagnosticosPendientes: diagnosticosPendientes.length,
      cotizacionesPendientes: cotizacionesPendientes.length,
      cotizacionesAceptadas: cotizacionesAceptadas.length
    };
  }, [visitas, servicios, diagnosticos, cotizaciones]);

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

      {/* Tarjetas resumen expandidas */}
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
            <span className="text-3xl font-bold">{estadisticas.visitasHoy}</span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-400 hover:shadow-xl transition transform hover:scale-105"
          variants={slideIn("right", 0.3)}
        >
          <h3 className="text-lg font-semibold mb-2">Visitas Pendientes</h3>
          <div className="flex items-center justify-between">
            <ClipboardList className="text-red-500 w-8 h-8" />
            <span className="text-3xl font-bold">{estadisticas.visitasPendientes}</span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-400 hover:shadow-xl transition transform hover:scale-105"
          variants={bounceIn}
        >
          <h3 className="text-lg font-semibold mb-2">Visitas Finalizadas</h3>
          <div className="flex items-center justify-between">
            <CheckCircle className="text-green-500 w-8 h-8" />
            <span className="text-3xl font-bold">{estadisticas.visitasFinalizadas}</span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-400 hover:shadow-xl transition transform hover:scale-105"
          variants={pulse}
        >
          <h3 className="text-lg font-semibold mb-2">Total Asignadas</h3>
          <div className="flex items-center justify-between">
            <FileText className="text-blue-500 w-8 h-8" />
            <span className="text-3xl font-bold">{estadisticas.totalVisitas}</span>
          </div>
        </motion.div>

        {/* Nuevas tarjetas para servicios, diagnósticos y cotizaciones */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-400 hover:shadow-xl transition transform hover:scale-105"
          variants={slideIn("left", 0.4)}
        >
          <h3 className="text-lg font-semibold mb-2">Servicios Activos</h3>
          <div className="flex items-center justify-between">
            <FaTools className="text-indigo-500 w-8 h-8" />
            <span className="text-3xl font-bold">{estadisticas.serviciosActivos}</span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-orange-400 hover:shadow-xl transition transform hover:scale-105"
          variants={slideIn("right", 0.5)}
        >
          <h3 className="text-lg font-semibold mb-2">Diagnósticos Pendientes</h3>
          <div className="flex items-center justify-between">
            <FaFileAlt className="text-orange-500 w-8 h-8" />
            <span className="text-3xl font-bold">{estadisticas.diagnosticosPendientes}</span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-purple-400 hover:shadow-xl transition transform hover:scale-105"
          variants={bounceIn}
        >
          <h3 className="text-lg font-semibold mb-2">Cotizaciones Pendientes</h3>
          <div className="flex items-center justify-between">
            <FaMoneyBillWave className="text-purple-500 w-8 h-8" />
            <span className="text-3xl font-bold">{estadisticas.cotizacionesPendientes}</span>
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-emerald-400 hover:shadow-xl transition transform hover:scale-105"
          variants={pulse}
        >
          <h3 className="text-lg font-semibold mb-2">Cotizaciones Aceptadas</h3>
          <div className="flex items-center justify-between">
            <FaExclamationTriangle className="text-emerald-500 w-8 h-8" />
            <span className="text-3xl font-bold">{estadisticas.cotizacionesAceptadas}</span>
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
        {estadisticas.visitasHoy > 0 ? (
          visitas.filter(v => new Date(v.Fecha).toDateString() === new Date().toDateString()).map((visita) => (
            <motion.div key={visita.IdCita} variants={zoomIn(0.2)}>
              <VisitCard visit={visita} />
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

