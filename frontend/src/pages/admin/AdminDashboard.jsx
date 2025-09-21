import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {fadeIn, zoomIn, staggerContainer,} from "../../Animations/variants";
import {
  UserCheck,
  Users,
  ClipboardList,
  CalendarClock,
  FileText,
  CheckCircle,
  UserPlus,
  Wrench,
  CalendarDays,
  ShieldCheck,
  Hammer,
} from "lucide-react";

import { fetchAllUsersApi } from "../../service/users";
import { fetchVisitasTecnicasApi } from "../../service/visitasTecnicas";
import { fetchAllServicesApi } from "../../service/services";
import { getDiagnosticosApi } from "../../service/diagnostico";
import { fetchCotizacionesApi } from "../../service/cotizacion";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { FaUsers, FaUserTie, FaCalendarCheck, FaClipboardList, FaChartLine, FaExclamationTriangle, FaFileAlt, FaMoneyBillWave } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import fondo from "../../assets/images/home/imagen_fondo_nosotros.png";

const AdminDashboard = () => {
  const { usuario, authToken } = useAuth();

  const [usuarios, setUsuarios] = useState([]);
  const [visitas, setVisitas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [cotizaciones, setCotizaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Cargar todos los datos en paralelo
        const [usuariosData, visitasData, serviciosData, diagnosticosData, cotizacionesData] = await Promise.all([
          fetchAllUsersApi(authToken),
          fetchVisitasTecnicasApi(authToken),
          fetchAllServicesApi(authToken),
          getDiagnosticosApi(authToken),
          fetchCotizacionesApi(authToken)
        ]);

        setUsuarios(usuariosData);
        setVisitas(visitasData);
        setServicios(serviciosData);
        setDiagnosticos(diagnosticosData);
        setCotizaciones(cotizacionesData);
      } catch (error) {
        console.error("Error al cargar datos del dashboard:", error);
        toast.error("Error al cargar datos del dashboard");
      } finally {
        setLoading(false);
      }
    };

    if (authToken) {
      fetchData();
    }
  }, [authToken]);

  // Cálculos dinámicos de estadísticas
  const estadisticasData = useMemo(() => {
    const clientes = usuarios.filter(u => u.IdRol === 1);
    const tecnicos = usuarios.filter(u => u.IdRol === 2);
    const visitasPendientes = visitas.filter(v => v.IdEstado === 1);
    const visitasCompletadas = visitas.filter(v => v.IdEstado === 4);
    const serviciosActivos = servicios.filter(s => s.IdEstado !== 7);
    const diagnosticosPendientes = diagnosticos.filter(d => !d.tieneCotizacion);
    const cotizacionesPendientes = cotizaciones.filter(c => c.IdEstado === 5);
    const cotizacionesAceptadas = cotizaciones.filter(c => c.IdEstado === 6);

    return {
      clientes,
      tecnicos,
      visitasPendientes,
      visitasCompletadas,
      serviciosActivos,
      diagnosticosPendientes,
      cotizacionesPendientes,
      cotizacionesAceptadas
    };
  }, [usuarios, visitas, servicios, diagnosticos, cotizaciones]);

  const clientesArray = usuarios.filter((u) => u.rol === "cliente");
  const tecnicosArray = usuarios.filter((u) => u.rol === "tecnico");

  const visitasHoy = visitas.filter(
    (v) => new Date(v.fecha).toDateString() === new Date().toDateString()
  );
  const visitasFinalizadas = visitas.filter((v) => v.EstadoDescripcion === "Finalizado");

  const serviciosCompletados = servicios.filter((s) => s.EstadoDescripcion === "Finalizado");

  // Datos para gráficos
  const datosGraficos = useMemo(() => {
    // Datos para gráfico de barras - Actividad mensual
    const visitasPorMes = visitas.reduce((acc, visita) => {
      const mes = new Date(visita.Fecha).getMonth();
      const nombreMes = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'][mes];
      acc[nombreMes] = (acc[nombreMes] || 0) + 1;
      return acc;
    }, {});

    const datosBarras = Object.entries(visitasPorMes).map(([mes, cantidad]) => ({
      mes,
      visitas: cantidad
    }));

    // Datos para gráfico circular - Estados de servicios
    const serviciosPorEstado = servicios.reduce((acc, servicio) => {
      const estado = servicio.EstadoDescripcion || 'Sin estado';
      acc[estado] = (acc[estado] || 0) + 1;
      return acc;
    }, {});

    const datosPie = Object.entries(serviciosPorEstado).map(([estado, cantidad]) => ({
      name: estado,
      value: cantidad
    }));

    return { datosBarras, datosPie };
  }, [visitas, servicios]);

  // Gráficos de análisis
  const GraficosAnalisis = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16 px-10">
      {/* Gráfico de barras */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-8"
        variants={fadeIn("left", 0.3)}
        initial="hidden"
        whileInView="show"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Visitas por Mes</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={datosGraficos.datosBarras}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="visitas" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Gráfico circular */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-8"
        variants={fadeIn("right", 0.3)}
        initial="hidden"
        whileInView="show"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Estados de Servicios</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={datosGraficos.datosPie}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {datosGraficos.datosPie.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const estadisticas = [
    {
      icon: <FaUsers className="w-8 h-8 text-white" />, 
      title: "Clientes Registrados", 
      value: estadisticasData.clientes.length, 
      bg: "bg-blue-500",
    },
    {
      icon: <FaUserTie className="w-8 h-8 text-white" />, 
      title: "Técnicos Activos", 
      value: estadisticasData.tecnicos.length, 
      bg: "bg-green-500",
    },
    {
      icon: <FaCalendarCheck className="w-8 h-8 text-white" />, 
      title: "Visitas Pendientes", 
      value: estadisticasData.visitasPendientes.length, 
      bg: "bg-yellow-500",
    },
    {
      icon: <FaClipboardList className="w-8 h-8 text-white" />, 
      title: "Visitas Completadas", 
      value: estadisticasData.visitasCompletadas.length, 
      bg: "bg-purple-500",
    },
    {
      icon: <FaChartLine className="w-8 h-8 text-white" />, 
      title: "Servicios Activos", 
      value: estadisticasData.serviciosActivos.length, 
      bg: "bg-indigo-500",
    },
    {
      icon: <FaFileAlt className="w-8 h-8 text-white" />, 
      title: "Diagnósticos Pendientes", 
      value: estadisticasData.diagnosticosPendientes.length, 
      bg: "bg-orange-500",
    },
    {
      icon: <FaMoneyBillWave className="w-8 h-8 text-white" />, 
      title: "Cotizaciones Pendientes", 
      value: estadisticasData.cotizacionesPendientes.length, 
      bg: "bg-red-500",
    },
    {
      icon: <FaExclamationTriangle className="w-8 h-8 text-white" />, 
      title: "Cotizaciones Aceptadas", 
      value: estadisticasData.cotizacionesAceptadas.length, 
      bg: "bg-emerald-500",
    }
  ];

  const actividades = [
    { 
      icon: <FaUsers className="text-blue-500 w-10 h-10" />, 
      texto: `Se registraron ${estadisticasData.clientes.length} clientes.` 
    },
    { 
      icon: <FaUserTie className="text-green-500 w-10 h-10" />, 
      texto: `Hay ${estadisticasData.tecnicos.length} técnicos activos.` 
    },
    { 
      icon: <FaCalendarCheck className="text-yellow-500 w-10 h-10" />, 
      texto: `Hay ${estadisticasData.visitasPendientes.length} visitas pendientes.` 
    },
    { 
      icon: <FaClipboardList className="text-emerald-600 w-10 h-10" />, 
      texto: `Completadas ${estadisticasData.visitasCompletadas.length} visitas.` 
    },
    { 
      icon: <FaChartLine className="text-indigo-600 w-10 h-10" />, 
      texto: `En curso ${estadisticasData.serviciosActivos.length} servicios.` 
    },
    { 
      icon: <FaFileAlt className="text-orange-600 w-10 h-10" />, 
      texto: `${estadisticasData.diagnosticosPendientes.length} diagnósticos pendientes de cotización.` 
    },
    { 
      icon: <FaMoneyBillWave className="text-red-600 w-10 h-10" />, 
      texto: `${estadisticasData.cotizacionesPendientes.length} cotizaciones esperando respuesta.` 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-200 relative max-w-7xl mx-auto">
      {/* Hero */}
      <section
        className="relative w-full h-[300px] overflow-hidden bg-cover bg-center shadow-xl mb-12"
        style={{ backgroundImage: `url(${fondo})` }}
      >
        <div className="absolute inset-0 bg-black/60 z-10" />
        <motion.div
          className="relative z-20 flex flex-col justify-center items-center h-full text-white text-center px-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold"
            variants={fadeIn("down", 0.3)}
          >
            Bienvenido, {usuario?.nombres}
          </motion.h1>
          <motion.p
            className="mt-4 text-lg md:text-xl max-w-3xl"
            variants={fadeIn("up", 0.5)}
          >
            Administra usuarios, visitas y servicios desde un solo lugar.
          </motion.p>
        </motion.div>
      </section>

      {/* Tarjetas estadísticas */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
      >
        {estadisticas.map((stat, i) => (
          <motion.div
            key={i}
            className={`rounded-xl p-6 flex items-center gap-4 shadow-xl text-white ${stat.bg} transition transform hover:scale-110 hover:brightness-110`}
            variants={zoomIn(i * 0.1)}
          >
            {stat.icon}
            <div>
              <p className="text-sm opacity-90">{stat.title}</p>
              <h3 className="text-3xl font-extrabold">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Gráficos de análisis */}
      <GraficosAnalisis />

      {/* Actividades recientes con tarjetas individuales grandes */}
      <motion.div
        className="mt-16 px-10 pb-10"
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        whileInView="show"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Actividades recientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {actividades.map((act, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl shadow-lg p-8 flex items-center gap-6 hover:shadow-2xl transform hover:scale-105 transition"
              variants={zoomIn(i * 0.15)}
            >
              {act.icon}
              <p className="text-xl font-semibold text-gray-800">{act.texto}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
