import { useEffect, useState } from 'react';
import VisitCard from '../../components/TechnicalVisitsFilterForm/VisitCard';
import VisitFilterForm from '../../components/TechnicalVisitsFilterForm/VisitFilterForm';
import Modal from '../../components/common/Modal';
import ReprogramVisitForm from '../../components/TechnicalVisitsFilterForm/ReprogramVisitForm';
import AssignTechnicianForm from '../../components/TechnicalVisitsFilterForm/AssignTechnicianForm';
import DiagnosticOrQuoteForm from '../../components/DiagnosticOrQuoteForm';
import { useAuth } from '../../context/AuthContext';
import fondo1 from "../../assets/images/home/imagen_fondo_nosotros.png";
import { fetchVisitasTecnicasApi, updateVisitaTecnicaApi } from '../../service/visitasTecnicas';
import { fetchTecnicosApi } from '../../service/users';
import { createDiagnosticoApi } from '../../service/diagnostico';
import { createCotizacionApi } from '../../service/cotizacion';
import ButtonTechnicalVisits from '../../components/ButtonTechnicalVisits';
import { toast } from 'react-toastify';

const AdminTechnicalVisits = () => {
  const { authToken } = useAuth();
  const [visits, setVisits] = useState([]);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [modalType, setModalType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [technicians, setTechnicians] = useState([]);
  const [loadingVisits, setLoadingVisits] = useState(false);


  useEffect(() => {
    refreshVisits();
    fetchTecnicosApi(authToken)
      .then(setTechnicians)
      .catch((error) => {
        toast.error("Error al cargar técnicos");
        console.error(error);
      });
  }, []);

  const refreshVisits = async () => {
    setLoadingVisits(true);
    try {
      const updated = await fetchVisitasTecnicasApi(authToken, {});
      setVisits(updated);
    } catch (error) {
      toast.error("Error al actualizar la lista de visitas");
      console.error(error);
    } finally {
      setLoadingVisits(false);
    }
  };



  const handleFilter = async (filters) => {
    try {
      const filtered = await fetchVisitasTecnicasApi(authToken, filters);
      setVisits(filtered);
    } catch (error) {
      toast.error("Hubo un error al aplicar los filtros");
      console.error(error);
    }
  };

  const handleOpenModal = (visit, type) => {
    console.log("Modal abierto con tipo:", type);
    setSelectedVisit(visit);
    setModalType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType('');
    setSelectedVisit(null);
  };

  const handleCancelVisit = async (visitId) => {
    const confirm = window.confirm('¿Está seguro que desea cancelar esta visita técnica?');
    if (!confirm) return;

    try {
      await updateVisitaTecnicaApi(visitId, { IdEstado: 7 }, authToken);
      toast.success("Visita cancelada");
      await refreshVisits();
    } catch (error) {
      toast.error("Error al cancelar la visita");
      console.error(error);
    }
  };

  const handleReprogramVisit = async (updatedVisit) => {
    try {
      await updateVisitaTecnicaApi(updatedVisit.IdCita, {
        Fecha: updatedVisit.fecha,
        Hora: updatedVisit.hora,
      }, authToken);
      toast.success("Visita reprogramada");
      await refreshVisits();
    } catch (error) {
      toast.error("Error al reprogramar la visita");
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



  const handleGenerateDiagnosisOrQuote = async (data) => {
    if (!data?.tipo) {
      toast.warning("Tipo de acción no definido");
      return;
    }

    try {
      if (data.tipo === "diagnostico") {
        const response = await createDiagnosticoApi(data, authToken);
        toast.success(response?.message || "Diagnóstico guardado");
      } else {
        const response = await createCotizacionApi(data, authToken);
        toast.success(response?.message || "Cotización guardada");
      }
      await refreshVisits();
    } catch (error) {
      toast.error("Error al guardar información");
      console.error(error);
    } finally {
      handleCloseModal();
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 relative max-w-7xl mx-auto">
      {/* Banner */}
      <div className="relative">
        <img
          src={fondo1}
          className="w-full h-[500px] object-cover opacity-90"
          alt="Fondo eléctrico"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-6">
          <h1 className="text-white font-extrabold text-4xl md:text-5xl lg:text-6xl">
            Visitas Técnicas
          </h1>
          <p className="text-white mt-4 text-lg md:text-xl max-w-4xl mx-auto">
            Aquí puede ver todas las visitas técnicas. Para cada una, encontrará los detalles.
          </p>
        </div>
      </div>

      {/* Filtros + lista */}
      <div className="relative z-10 rounded-t-3xl -mt-24 px-4 py-10 mx-10 text-black">
        <ButtonTechnicalVisits />
        <VisitFilterForm onFilter={handleFilter} />

        <div className="grid gap-6 mt-6">

          {loadingVisits ? (
            <div className="text-center text-gray-700 font-semibold">Actualizando visitas...</div>
          ) : visits.length === 0 ? (
            <p>No hay visitas técnicas registradas.</p>
          ) : (
            visits.map((visit) => (
              <VisitCard
                key={visit.IdCita}
                visit={visit}
                rol="admin"
                onCancel={() => handleCancelVisit(visit.IdCita)}
                onReprogram={() => handleOpenModal(visit, "reprogramar")}
                onAssignTechnician={() => handleOpenModal(visit, "asignar")}
                onGenerateDiagnosis={() => handleOpenModal(visit, "diagnostico")}
                onGenerateQuote={() => handleOpenModal(visit, "cotizacion")}
                technicians={technicians}
              />
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {console.log("Renderizando modal tipo:", modalType)}
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
              console.log("onSuccess ejecutado desde el padre");
              await refreshVisits();     // ✅ recarga visitas
              handleCloseModal();        // ✅ cierra el modal
            }}
            onCancel={handleCloseModal}
          />
        )}

        {["diagnostico", "cotizacion"].includes(modalType) && selectedVisit && (
          <DiagnosticOrQuoteForm
            citaId={selectedVisit.IdCita}
            tipo={modalType}
            tieneDiagnostico={selectedVisit.TieneDiagnostico}
            tieneCotizacion={selectedVisit.TieneCotizacion}
            onSubmit={handleGenerateDiagnosisOrQuote}
            onCancel={handleCloseModal}
          />
        )}
      </Modal>



    </div>
  );
};

export default AdminTechnicalVisits;
