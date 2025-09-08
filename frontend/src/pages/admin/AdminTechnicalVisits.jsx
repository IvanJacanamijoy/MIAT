import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  Wand2,
  RefreshCw,
  Filter,
  UserPlus,
  CalendarPlus,
  AlertTriangle,
} from "lucide-react";

import VisitCard from "../../components/TechnicalVisitsFilterForm/VisitCard";
import VisitFilterForm from "../../components/TechnicalVisitsFilterForm/VisitFilterForm";
import VisitForm from "../../components/TechnicalVisitsFilterForm/VisitForm";
import Modal from "../../components/Common/Modal";
import ReprogramVisitForm from "../../components/TechnicalVisitsFilterForm/ReprogramVisitForm";
import AssignTechnicianForm from "../../components/TechnicalVisitsFilterForm/AssignTechnicianForm";
import { useAuth } from "../../context/AuthContext";
import fondo1 from "../../assets/images/home/imagen_fondo_nosotros.png";
import {
  fetchVisitasTecnicasApi,
  updateVisitaTecnicaApi,
} from "../../service/visitasTecnicas";
import { fetchTecnicosApi } from "../../service/users";
import ButtonTechnicalVisits from "../../components/ButtonTechnicalVisits";
import EmptyState from "../../components/Common/EmptyState";

/**
 * Vista de administración de Visitas Técnicas
 * - Layout moderno con hero, toolbar pegajosa y grid responsivo
 * - Accesible (roles ARIA, teclas rápidas) y completamente responsive
 * - Carga esquelética, manejo de errores y refresco manual
 * - Compatible con Tailwind v4 (utility-first)
 */

const skeletonArray = Array.from({ length: 6 }, (_, i) => i);

export default function AdminTechnicalVisits() {
  const { authToken } = useAuth();

  const [visits, setVisits] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  const [selectedVisit, setSelectedVisit] = useState(null);
  const [modalType, setModalType] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [loadingVisits, setLoadingVisits] = useState(false);
  const [loadingTechs, setLoadingTechs] = useState(false);
  const [error, setError] = useState("");

  // Para evitar doble fetch cuando el token cambie 
  const firstLoad = useRef(true);

  const loadData = async (filters = {}) => {
    setError("");
    setLoadingVisits(true);
    setLoadingTechs(true);
    try {
      const [vData, tData] = await Promise.all([
        fetchVisitasTecnicasApi(authToken, filters),
        fetchTecnicosApi(authToken),
      ]);
      setVisits(Array.isArray(vData) ? vData : []);
      setTechnicians(Array.isArray(tData) ? tData : []);
    } catch (e) {
      console.error(e);
      setError("No pudimos cargar la información. Intenta nuevamente.");
      toast.error("Error al cargar datos");
    } finally {
      setLoadingVisits(false);
      setLoadingTechs(false);
    }
  };

  useEffect(() => {
    if (!authToken) return;
    if (firstLoad.current) {
      firstLoad.current = false;
    }
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  const handleFilter = async (filters) => {
    await loadData(filters);
  };

  const handleOpenModal = (visit, type) => {
    setSelectedVisit(visit ?? null);
    setModalType(type);
    setShowModal(true);
  };

  const handleOpenNewVisit = () => handleOpenModal(null, "nueva");

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType("");
    setSelectedVisit(null);
  };

  const refresh = async () => {
    await loadData();
    toast.info("Lista actualizada");
  };

  const handleCancelVisit = async (visitId) => {
    const ok = window.confirm(
      "¿Está seguro de cancelar esta visita técnica? Esta acción no se puede deshacer."
    );
    if (!ok) return;
    try {
      await updateVisitaTecnicaApi(visitId, { IdEstado: 7 }, authToken);
      toast.success("Visita cancelada");
      await refresh();
    } catch (e) {
      console.error(e);
      toast.error("Error al cancelar la visita");
    }
  };

  const handleReprogramVisit = async (updatedVisit) => {
    try {
      await updateVisitaTecnicaApi(
        updatedVisit.IdCita,
        { Fecha: updatedVisit.fecha, Hora: updatedVisit.hora },
        authToken
      );
      toast.success("Visita reprogramada");
      await refresh();
    } catch (e) {
      console.error(e);
      toast.error("Error al reprogramar la visita");
<<<<<<< HEAD
      console.error(error);
    }
    handleCloseModal();
  };

  const handleAssignTechnician = async ({ IdCita, IdTecnico }) => {
    try {
      console.log("Asignando técnico...");
      await updateVisitaTecnicaApi(IdCita, {
        IdTecnico,
        IdEstado: 3,
      }, authToken);
      console.log("tecnico asignado");
      toast.success("Técnico asignado correctamente");
      await refreshVisits();
      handleCloseModal();
    } catch (error) {
      toast.error("Error al asignar el técnico");
      console.error(error);
    }
  };



  const handleSaveDiagnostico = async (data) => {
    try {
      const response = await createDiagnosticoApi(data, authToken);
      toast.success(response?.message || "Diagnóstico guardado");
      await refreshVisits();
    } catch (error) {
      toast.error("Error al guardar diagnóstico");
      console.error(error);
=======
>>>>>>> 76270688d0789f8d967608657eab6745c127d4e7
    } finally {
      handleCloseModal();
    }
  };

<<<<<<< HEAD
  const handleSaveCotizacion = async (data) => {
    try {
      const response = await createCotizacionApi(data, authToken);
      toast.success(response?.message || "Cotización guardada");
      await refreshVisits();
    } catch (error) {
      toast.error("Error al guardar cotización");
      console.error(error);
    } finally {
      handleCloseModal();
    }
  };

=======
  const handleAssignTechnician = async (updatedVisit) => {
    try {
      await updateVisitaTecnicaApi(
        updatedVisit.IdCita,
        { IdTecnico: updatedVisit.tecnico.IdUsuario, IdEstado: 3 },
        authToken
      );
      toast.success("Técnico asignado");
      await refresh();
    } catch (e) {
      console.error(e);
      toast.error("Error al asignar técnico");
    }
  };

  // KPIs simples por estado (asumiendo prop IdEstado)
  const stats = useMemo(() => {
    const s = { total: visits.length, pendientes: 0, asignadas: 0, canceladas: 0 };
    for (const v of visits) {
      if (v?.IdEstado === 7) s.canceladas++;
      else if (v?.IdEstado === 3) s.asignadas++;
      else s.pendientes++;
    }
    return s;
  }, [visits]);

  // Atajos de teclado (N = nueva visita, R = refresh)
  useEffect(() => {
    const onKey = (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key.toLowerCase() === "n") handleOpenNewVisit();
      if (e.key.toLowerCase() === "r") refresh();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
>>>>>>> 76270688d0789f8d967608657eab6745c127d4e7

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* HERO */}
      <section className="relative isolate">
        <img
          src={fondo1}
          alt="Fondo eléctrico"
          className="h-[220px] md:h-[320px] w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 grid place-items-center px-4 text-center"
        >
          <div className="max-w-4xl">
            <h1 className="text-white tracking-tight font-extrabold text-3xl md:text-5xl">
              Visitas Técnicas
            </h1>
            <p className="text-white/90 mt-3 md:mt-4 text-base md:text-lg">
              Administra, filtra y actúa sobre todas las visitas técnicas del sistema.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/30 backdrop-blur">
              <Wand2 className="size-4 text-white" />
              <span className="text-white text-sm md:text-base">Atajos: N = nueva, R = refrescar</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* TOOLBAR pegajosa */}
      <div
        role="region"
        aria-label="Barra de herramientas"
        className="sticky top-0 z-30 border-b border-gray-200/80 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60"
      >
        <div className="mx-auto max-w-7xl px-4 py-3 flex flex-wrap items-center gap-3">
          <ButtonTechnicalVisits />
          <button
            onClick={handleOpenNewVisit}
            className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold ring-1 ring-gray-300 hover:ring-gray-400 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
          >
            <CalendarPlus className="size-4" /> Agendar visita
          </button>
          <button
            onClick={refresh}
            aria-label="Refrescar"
            className="ml-auto inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold ring-1 ring-gray-300 hover:ring-gray-400 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50"
          >
            <RefreshCw className={"size-4 " + (loadingVisits ? "animate-spin" : "")} />
            Refrescar
          </button>
        </div>
      </div>

      {/* CONTENIDO */}
      <main className="mx-auto max-w-7xl px-4 pb-16 -mt-12 relative z-10">
        {/* Tarjeta de filtro + stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4"
        >
          <div className="lg:col-span-2 rounded-3xl border border-gray-200 bg-white p-4 md:p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="size-4" />
              <h2 className="font-semibold tracking-tight">Filtrar visitas</h2>
            </div>
            <VisitFilterForm onFilter={handleFilter} />
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-4 md:p-5 shadow-sm grid grid-cols-3 gap-3">
            <Kpi label="Totales" value={stats.total} />
            <Kpi label="Pendientes" value={stats.pendientes} />
            <Kpi label="Asignadas" value={stats.asignadas} />
            <div className="col-span-3">
              <Kpi label="Canceladas" value={stats.canceladas} subtle />
            </div>
          </div>
        </motion.div>

        {/* Lista de visitas */}
        <section className="mt-6">
          {error && (
            <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 flex items-start gap-3">
              <AlertTriangle className="mt-0.5 size-5" />
              <div>
                <p className="font-semibold">Ocurrió un problema</p>
                <p className="text-sm/6">{error}</p>
              </div>
            </div>
          )}

          {loadingVisits ? (
            <div
              role="status"
              aria-live="polite"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {skeletonArray.map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : visits?.length === 0 ? (
            <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-10 shadow-sm">
              <EmptyState
                title="No hay visitas técnicas registradas"
                description="Cuando se agenden, aparecerán aquí automáticamente."
                icon="visits"
                actionLabel="Agendar nueva visita"
                onAction={handleOpenNewVisit}
              />
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visits.map((visit) => (
                <li key={visit.IdCita}>
                  <VisitCard
                    visit={visit}
                    rol="admin"
                    technicians={technicians}
                    onCancel={() => handleCancelVisit(visit.IdCita)}
                    onReprogram={() => handleOpenModal(visit, "reprogramar")}
                    onOpenAssignModal={() => handleOpenModal(visit, "asignar")}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      {/* MODALES */}
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        {modalType === "reprogramar" && selectedVisit && (
          <ReprogramVisitForm
            currentVisit={selectedVisit}
            onSubmit={handleReprogramVisit}
            onCancel={handleCloseModal}
          />
        )}

        {modalType === "asignar" && selectedVisit && (
          <AssignTechnicianForm
            technicians={technicians}
            currentVisit={selectedVisit}
            onSuccess={async () => {
              try {
                await refresh();
                toast.success("Técnico asignado correctamente");
              } catch (e) {
                console.error(e);
                toast.error("Error al actualizar visitas");
              } finally {
                handleCloseModal();
              }
            }}
            onCancel={handleCloseModal}
          />
        )}

<<<<<<< HEAD
        {modalType === "diagnostico" && selectedVisit && (
          <DiagnosticForm
            citaId={selectedVisit.IdCita}
            tecnicos={technicians}
            tecnicoAsignado={
              selectedVisit.TecnicoNombres
                ? `${selectedVisit.TecnicoNombres} ${selectedVisit.TecnicoApellidos}`
                : ""
            }
            onSubmit={handleSaveDiagnostico}
            onCancel={handleCloseModal}
          />
        )}

        {modalType === "cotizacion" && selectedVisit && (
          <QuoteForm
            idDiagnostico={selectedVisit.IdDiagnostico}
            onSubmit={handleSaveCotizacion}
=======
        {modalType === "nueva" && (
          <VisitForm
            onSuccess={async () => {
              try {
                await refresh();
                toast.success("Visita creada correctamente");
              } catch (e) {
                console.error(e);
                toast.error("Error al registrar la visita");
              } finally {
                handleCloseModal();
              }
            }}
>>>>>>> 76270688d0789f8d967608657eab6745c127d4e7
            onCancel={handleCloseModal}
          />
        )}
      </Modal>
    </div>
  );
}

function Kpi({ label, value, subtle = false }) {
  return (
    <div className={`rounded-2xl border ${subtle ? "border-gray-200 bg-gray-50" : "border-gray-200 bg-white"} p-4 text-center shadow-xs`}>
      <div className="text-xs font-medium text-gray-500 tracking-wide">{label}</div>
      <div className="mt-1 text-2xl font-extrabold tabular-nums">{value}</div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="h-40 w-full rounded-2xl bg-gray-200 animate-pulse" />
      <div className="mt-3 h-4 w-3/5 rounded bg-gray-200 animate-pulse" />
      <div className="mt-2 h-4 w-2/5 rounded bg-gray-200 animate-pulse" />
      <div className="mt-4 flex gap-2">
        <div className="h-8 w-24 rounded-xl bg-gray-200 animate-pulse" />
        <div className="h-8 w-24 rounded-xl bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
}
