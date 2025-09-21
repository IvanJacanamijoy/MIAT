import { useEffect, useState } from 'react';
import VisitCard from '../../components/TechnicalVisitsFilterForm/VisitCard';
import VisitFilterForm from '../../components/TechnicalVisitsFilterForm/VisitFilterForm';
import { useAuth } from '../../context/AuthContext';
import fondo1 from "../../assets/images/home/imagen_fondo_nosotros.png";
import { fetchVisitasTecnicasApi, updateVisitaTecnicaApi } from '../../service/visitasTecnicas';
import { createDiagnosticoApi, getDiagnosticoByIdApi, updateDiagnosticoApi } from '../../service/diagnostico';
import EmptyState from "../../components/Common/EmptyState";
import Modal from "../../components/Common/Modal";
import DiagnosticForm from "../../components/DiagnosticForm";
import { toast } from "react-toastify";

const TechnicianTechnicalVisits = () => {
  const { usuario, authToken } = useAuth();
  const [visits, setVisits] = useState([]);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editingDiagnosis, setEditingDiagnosis] = useState(null);

  useEffect(() => {
    if (usuario?.id) {
      fetchVisitasTecnicasApi(authToken, { tecnicoId: usuario.id })
        .then(setVisits)
        .catch(() => toast.error("Error al cargar visitas técnicas"));
    }
  }, [usuario, authToken]);

  const handleFilter = (filters) => {
    fetchVisitasTecnicasApi(authToken, filters)
      .then(setVisits)
      .catch(() => toast.error("Error al aplicar filtros"));
  };

  const handleOpenModal = (visit, type) => {
    setSelectedVisit(visit);
    setModalType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVisit(null);
    setModalType("");
    setEditingDiagnosis(null);
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
        // Crear nuevo diagnóstico
        await createDiagnosticoApi({ ...data, IdCita: selectedVisit.IdCita }, authToken);
        toast.success("Diagnóstico creado exitosamente");
      }
      handleCloseModal();
      // Recargar visitas
      if (usuario?.id) {
        fetchVisitasTecnicasApi(authToken, { tecnicoId: usuario.id })
          .then(setVisits)
          .catch(() => toast.error("Error al cargar visitas técnicas"));
      }
    } catch (error) {
      toast.error(editingDiagnosis ? "Error al actualizar diagnóstico" : "Error al crear diagnóstico");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 relative max-w-7xl mx-auto">
      {/* HERO */}
      <div className="relative">
        <img
          src={fondo1}
          className="w-full h-[350px] object-cover opacity-90"
          alt="Fondo eléctrico"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-6">
          <h1 className="text-white font-extrabold text-4xl md:text-5xl lg:text-6xl whitespace-nowrap">
            Visitas Técnicas Asignadas
          </h1>
          <p className="text-white mt-4 text-lg md:text-xl max-w-4xl mx-auto">
            Aquí puede ver todas las visitas técnicas que le han sido asignadas.
            Para cada una, encontrará los detalles completos necesarios para
            realizar su trabajo eficientemente.
          </p>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="relative z-10 rounded-t-3xl -mt-24 px-4 py-10 mx-10 text-white">
        <VisitFilterForm onFilter={handleFilter} />

        <div className="grid gap-6 mt-6">
          {visits.length === 0 ? (
            <EmptyState
              title="No existe visita técnica"
              description="No hay visitas técnicas asignadas que coincidan con los filtros."
              icon="visits"
            />
          ) : (
            visits.map((visit) => (
              <VisitCard
                key={visit.IdCita}
                visit={visit}
                rol="tecnico"
                onGenerateDiagnosis={() => handleOpenModal(visit, "diagnostico")}
                onEditDiagnosis={() => handleEditDiagnosis(visit)}
              />
            ))
          )}
        </div>
      </div>

      {/* MODAL DE DIAGNÓSTICO */}
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        {modalType === "diagnostico" && selectedVisit && (
          <DiagnosticForm
            citaId={selectedVisit.IdCita}
            tecnicoAsignado={`${usuario.nombres} ${usuario.apellidos}`}
            onSubmit={handleSaveDiagnostico}
            onCancel={handleCloseModal}
            initialData={editingDiagnosis}
          />
        )}
      </Modal>
    </div>
  );
};

export default TechnicianTechnicalVisits;
