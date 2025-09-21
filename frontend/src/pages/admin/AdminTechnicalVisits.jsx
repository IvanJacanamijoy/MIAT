import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Filter, AlertTriangle } from "lucide-react";

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
import EmptyState from "../../components/Common/EmptyState";
import DiagnosticForm from "../../components/DiagnosticForm";
import { createDiagnosticoApi, getDiagnosticoByIdApi, updateDiagnosticoApi } from "../../service/diagnostico";

const skeletonArray = Array.from({ length: 6 }, (_, i) => i);

export default function AdminTechnicalVisits() {
  const { authToken } = useAuth();

  const [visits, setVisits] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  const [selectedVisit, setSelectedVisit] = useState(null);
  const [modalType, setModalType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingDiagnosis, setEditingDiagnosis] = useState(null);

  const [loadingVisits, setLoadingVisits] = useState(false);
  const [loadingTechs, setLoadingTechs] = useState(false);
  const [error, setError] = useState("");

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

      // Relacionamos visitas con técnicos
      const visitasArray = Array.isArray(vData) ? vData : [];
      const tecnicosArray = Array.isArray(tData) ? tData : [];

      const visitasPorTecnico = visitasArray.reduce((acc, v) => {
        if (v.IdTecnico) {
          acc[v.IdTecnico] = (acc[v.IdTecnico] || 0) + 1;
        }
        return acc;
      }, {});

      const tecnicosConVisitas = tecnicosArray.map((t) => ({
        ...t,
        totalVisitas: visitasPorTecnico[t.IdUsuario] || 0,
      }));

      setVisits(visitasArray);
      setTechnicians(tecnicosConVisitas);
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
    setEditingDiagnosis(null);
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
    } finally {
      handleCloseModal();
    }
  };

  const handleEditDiagnosis = async (visit) => {
    try {
      const diagnosis = await getDiagnosticoByIdApi(visit.IdDiagnostico, authToken);
      setEditingDiagnosis(diagnosis);
      setSelectedVisit(visit);
      setModalType("diagnostico");
      setShowModal(true);
    } catch (error) {
      toast.error("Error al cargar el diagnóstico");
    }
  };

  const handleSaveDiagnostico = async (data) => {
    try {
      if (editingDiagnosis) {
        // Actualizar diagnóstico existente
        await updateDiagnosticoApi(editingDiagnosis.IdDiagnostico, data, authToken);
        toast.success("Diagnóstico actualizado exitosamente");
      } else {
        // 1. Crear diagnóstico
        const nuevoDiagnostico = await createDiagnosticoApi(data, authToken);

        // 2. Actualizar visita con el IdDiagnostico
        await updateVisitaTecnicaApi(
          data.IdCita,
          { IdDiagnostico: nuevoDiagnostico.IdDiagnostico },
          authToken
        );

        toast.success("Diagnóstico guardado y vinculado correctamente");
      }
      await refresh();
    } catch (error) {
      toast.error(editingDiagnosis ? "Error al actualizar diagnóstico" : "Error al guardar diagnóstico");
      console.error(error);
    } finally {
      handleCloseModal();
    }
  };


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

  const stats = useMemo(() => {
    const s = { total: visits.length, pendientes: 0, asignadas: 0, canceladas: 0 };
    for (const v of visits) {
      if (v?.IdEstado === 7) s.canceladas++;
      else if (v?.IdEstado === 3) s.asignadas++;
      else s.pendientes++;
    }
    return s;
  }, [visits]);

  return (
    <div className="min-h-screen bg-gray-200 relative max-w-7xl mx-auto">
      {/* HERO */}
      <section className="relative isolate">
        <img
          src={fondo1}
          alt="Fondo eléctrico"
          className="h-[200px] sm:h-[260px] md:h-[320px] w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 grid place-items-center px-4 text-center"
        >
          <div className="max-w-3xl sm:max-w-4xl">
            <h1 className="text-white tracking-tight font-extrabold text-2xl sm:text-3xl md:text-5xl">
              Visitas Técnicas
            </h1>
            <p className="text-white/90 mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg">
              Administra, filtra y actúa sobre todas las visitas técnicas del sistema.
            </p>
            <div className="mt-6">
              <button
                onClick={handleOpenNewVisit}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
              >
                Agendar Visita Técnica
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CONTENIDO */}
      <main className="mx-auto max-w-7xl px-3 sm:px-4 pb-12 sm:pb-16 mt-4 md:mt-6 relative z-10">
        {/* Filtros + Skeletons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Filtro centrado */}
          <div className="w-full rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="size-4" />
              <h2 className="font-semibold tracking-tight text-sm sm:text-base">
                Filtrar visitas
              </h2>
            </div>
            <VisitFilterForm onFilter={handleFilter} />
          </div>

          {/* KPIs + Técnicos destacados */}
          <div className="w-full flex flex-col lg:flex-row gap-4">
            {/* KPIs */}
            <div className="flex-1 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Kpi label="Totales" value={stats.total} />
              <Kpi label="Pendientes" value={stats.pendientes} />
              <Kpi label="Asignadas" value={stats.asignadas} />
              <div className="col-span-2 sm:col-span-3">
                <Kpi label="Canceladas" value={stats.canceladas} subtle />
              </div>
            </div>

            {/* Técnicos top */}
            <div className="flex-1 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="font-semibold text-gray-700 mb-3">
                Técnicos con más visitas
              </h3>
              {loadingTechs ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              ) : (
                <ul className="space-y-2">
                  {technicians
                    .sort((a, b) => b.totalVisitas - a.totalVisitas)
                    .slice(0, 3)
                    .map((t, i) => (
                      <li
                        key={t.IdUsuario}
                        className="flex justify-between items-center border-b last:border-b-0 pb-2"
                      >
                        <span className="font-medium text-gray-800">
                          {i + 1}. {t.Nombres} {t.Apellidos}
                        </span>
                        <span className="text-red-600 font-bold">
                          {t.totalVisitas}
                        </span>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </motion.div>

        {/* Lista de visitas */}
        <section className="mt-6">
          {error && (
            <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800 flex flex-col sm:flex-row items-start gap-3">
              <AlertTriangle className="size-5 shrink-0" />
              <div>
                <p className="font-semibold text-sm sm:text-base">
                  Ocurrió un problema
                </p>
                <p className="text-xs sm:text-sm">{error}</p>
              </div>
            </div>
          )}

          {loadingVisits ? (
            <div
              role="status"
              aria-live="polite"
              className="flex flex-col gap-4 w-full"
            >
              {skeletonArray.map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : visits?.length === 0 ? (
            <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 md:p-10 shadow-sm">
              <EmptyState
                title="No hay visitas técnicas registradas"
                description="Cuando se agenden, aparecerán aquí automáticamente."
                icon="visits"
                actionLabel="Agendar nueva visita"
                onAction={handleOpenNewVisit}
              />
            </div>
          ) : (
            <ul className="flex flex-col gap-4 w-full">
              {visits.map((visit) => (
                <li key={visit.IdCita} className="w-full">
                  <VisitCard
                    key={visit.IdCita}
                    visit={visit}
                    rol="admin"
                    onCancel={() => handleCancelVisit(visit.IdCita)}
                    onReprogram={() => handleOpenModal(visit, "reprogramar")}
                    onAssignTechnician={() =>
                      handleOpenModal(visit, "asignar")
                    }
                    onGenerateDiagnosis={() =>
                      handleOpenModal(visit, "diagnostico")
                    }
                    onEditDiagnosis={() => handleEditDiagnosis(visit)}
                    technicians={technicians}
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
            onCancel={handleCloseModal}
          />
        )}

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
            initialData={editingDiagnosis}
          />
        )}
      </Modal>
    </div>
  );
}

function Kpi({ label, value, subtle = false }) {
  return (
    <div
      className={`rounded-2xl border ${subtle ? "border-gray-200 bg-gray-50" : "border-gray-200 bg-white"
        } p-3 sm:p-4 text-center shadow-xs`}
    >
      <div className="text-xs sm:text-sm font-medium text-gray-500 tracking-wide">
        {label}
      </div>
      <div className="mt-1 text-xl sm:text-2xl font-extrabold tabular-nums">
        {value}
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm w-full">
      <div className="h-32 sm:h-40 w-full rounded-2xl bg-gray-200 animate-pulse" />
      <div className="mt-3 h-3 sm:h-4 w-3/5 rounded bg-gray-200 animate-pulse" />
      <div className="mt-2 h-3 sm:h-4 w-2/5 rounded bg-gray-200 animate-pulse" />
      <div className="mt-4 flex flex-wrap gap-2">
        <div className="h-7 sm:h-8 w-20 sm:w-24 rounded-xl bg-gray-200 animate-pulse" />
        <div className="h-7 sm:h-8 w-20 sm:w-24 rounded-xl bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
}

