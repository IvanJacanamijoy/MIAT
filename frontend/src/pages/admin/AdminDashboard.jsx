import { useEffect, useState } from "react";
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
import { useAuth } from "../../context/AuthContext";
import fondo from "../../assets/images/home/imagen_fondo_nosotros.png";

const AdminDashboard = () => {
  const { usuario, authToken } = useAuth();

  const [usuarios, setUsuarios] = useState([]);
  const [visitas, setVisitas] = useState([]);
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const usuariosData = await fetchAllUsersApi(authToken);
        const visitasData = await fetchVisitasTecnicasApi(authToken);
        const serviciosData = await fetchAllServicesApi(authToken);

        setUsuarios(usuariosData);
        setVisitas(visitasData);
        setServicios(serviciosData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    cargarDatos();
  }, [authToken]);

  const clientes = usuarios.filter((u) => u.rol === "cliente");
  const tecnicos = usuarios.filter((u) => u.rol === "tecnico");

  const visitasPendientes = visitas.filter((v) => v.EstadoDescripcion === "Pendiente");
  const visitasHoy = visitas.filter(
    (v) => new Date(v.fecha).toDateString() === new Date().toDateString()
  );
  const visitasFinalizadas = visitas.filter((v) => v.EstadoDescripcion === "Finalizado");

  const serviciosActivos = servicios.filter((s) => s.EstadoDescripcion !== "Finalizado");
  const serviciosCompletados = servicios.filter((s) => s.EstadoDescripcion === "Finalizado");

  const estadisticas = [
    {
      icon: <Users className="w-8 h-8 text-white" />, title: "Clientes Registrados", value: clientes.length, bg: "bg-blue-500",
    },
    {
      icon: <UserCheck className="w-8 h-8 text-white" />, title: "Técnicos Activos", value: tecnicos.length, bg: "bg-green-500",
    },
    {
      icon: <ClipboardList className="w-8 h-8 text-white" />, title: "Visitas Pendientes", value: visitasPendientes.length, bg: "bg-yellow-500",
    },
    {
      icon: <CalendarClock className="w-8 h-8 text-white" />, title: "Visitas para Hoy", value: visitasHoy.length, bg: "bg-red-500",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-white" />, title: "Visitas Finalizadas", value: visitasFinalizadas.length, bg: "bg-green-600",
    },
    {
      icon: <FileText className="w-8 h-8 text-white" />, title: "Servicios Activos", value: serviciosActivos.length, bg: "bg-indigo-500",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-white" />, title: "Servicios Finalizados", value: serviciosCompletados.length, bg: "bg-cyan-600",
    },
  ];

  const actividades = [
    { icon: <UserPlus className="text-blue-500 w-10 h-10" />, texto: `Se registraron ${clientes.length} clientes.` },
    { icon: <Wrench className="text-green-500 w-10 h-10" />, texto: `Hay ${tecnicos.length} técnicos activos.` },
    { icon: <CalendarDays className="text-yellow-500 w-10 h-10" />, texto: `Programadas ${visitasHoy.length} visitas para hoy.` },
    { icon: <ShieldCheck className="text-emerald-600 w-10 h-10" />, texto: `Completadas ${visitasFinalizadas.length} visitas.` },
    { icon: <Hammer className="text-indigo-600 w-10 h-10" />, texto: `En curso ${serviciosActivos.length} servicios.` },
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
