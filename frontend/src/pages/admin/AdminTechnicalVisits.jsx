import { useEffect, useState } from "react";
import VisitCard from "../../components/TechnicalVisitsFilterForm/VisitCard";
import VisitFilterForm from "../../components/TechnicalVisitsFilterForm/VisitFilterForm";
import VisitForm from "../../components/TechnicalVisitsFilterForm/VisitForm";
import Modal from "../../components/common/Modal";
import ReprogramVisitForm from "../../components/TechnicalVisitsFilterForm/ReprogramVisitForm";
import AssignTechnicianForm from "../../components/TechnicalVisitsFilterForm/AssignTechnicianForm";
import { useAuth } from "../../context/AuthContext";
import fondo1 from "../../assets/images/home/imagen_fondo_nosotros.png";
import { fetchVisitasTecnicasApi, updateVisitaTecnicaApi } from "../../service/visitasTecnicas";
import { fetchTecnicosApi } from "../../service/users";
import ButtonTechnicalVisits from "../../components/ButtonTechnicalVisits";
import EmptyState from "../../components/Common/EmptyState";
import { toast } from "react-toastify";

const AdminTechnicalVisits = () => {
  const { authToken } = useAuth();
  const [visits, setVisits] = useState([]);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [modalType, setModalType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    fetchVisitasTecnicasApi(authToken, {}).then((data) => {
      setVisits(data);
    });
    fetchTecnicosApi(authToken)
      .then((data) => setTechnicians(data))
      .catch((error) => console.error("Error fetching technicians:", error));
  }, [authToken]);

  const handleFilter = (filters) => {
    fetchVisitasTecnicasApi(authToken, filters)
      .then((data) => setVisits(data))
      .catch(() => toast.error("Hubo un error al filtrar"));
  };

  const handleOpenModal = (visit, type) => {
    setSelectedVisit(visit);
    setModalType(type);
    setShowModal(true);
  };

  const handleOpenNewVisit = () => {
    setModalType("nueva");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType("");
    setSelectedVisit(null);
  };

  const handleCancelVisit = async (visitId) => {
    const confirmCancel = window.confirm("¿Está seguro que desea cancelar esta visita técnica?");
    if (!confirmCancel) return;

    try {
      await updateVisitaTecnicaApi(visitId, { IdEstado: 7 }, authToken);
      toast.success("Visita cancelada.");
      const data = await fetchVisitasTecnicasApi(authToken, {});
      setVisits(data);
    } catch (error) {
      toast.error("Error al cancelar la visita.");
      console.error(error);
    }
  };

  const handleReprogramVisit = async (updatedVisit) => {
    try {
      await updateVisitaTecnicaApi(updatedVisit.IdCita, {
        Fecha: updatedVisit.fecha,
        Hora: updatedVisit.hora,
      }, authToken);

      toast.success("Visita reprogramada.");
      const data = await fetchVisitasTecnicasApi(authToken, {});
      setVisits(data);
    } catch (error) {
      toast.error("Error al reprogramar la visita.");
      console.error(error);
    }
    handleCloseModal();
  };

  const handleAssignTechnician = async (updatedVisit) => {
    try {
      await updateVisitaTecnicaApi(updatedVisit.IdCita, {
        IdTecnico: updatedVisit.tecnico.IdUsuario,
        IdEstado: 3,
      }, authToken);

      toast.success("Técnico asignado.");
      const data = await fetchVisitasTecnicasApi(authToken, {});
      setVisits(data);
    } catch (error) {
      toast.error("Error al asignar técnico.");
      console.error(error);
    }
    handleCloseModal();
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

      {/* Contenido */}
      <div className="relative z-10 rounded-t-3xl -mt-24 px-4 py-10 mx-10 text-white">
        <ButtonTechnicalVisits />
        <VisitFilterForm onFilter={handleFilter} />

        <div className="grid gap-6 mt-6">
          {visits.length === 0 ? (
            <EmptyState
              title="No hay visitas técnicas registradas"
              description="Cuando se agenden visitas, aparecerán automáticamente en este panel."
              icon="visits"
              actionLabel="Agendar nueva visita"
              onAction={handleOpenNewVisit}
            />
          ) : (
            visits.map((visit) => (
              <VisitCard
                key={visit.IdCita}
                visit={visit}
                rol="admin"
                onCancel={() => handleCancelVisit(visit.IdCita)}
                onReprogram={() => handleOpenModal(visit, "reprogramar")}
                onOpenAssignModal={() => handleOpenModal(visit, "asignar")}
                technicians={technicians}
              />
            ))
          )}
        </div>
      </div>

      {/* Modales */}
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
                const updatedVisits = await fetchVisitasTecnicasApi(authToken, {});
                setVisits(updatedVisits);
                toast.success("Técnico asignado correctamente");
              } catch (error) {
                toast.error("Error al actualizar la lista de visitas");
                console.error(error);
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
                const updatedVisits = await fetchVisitasTecnicasApi(authToken, {});
                setVisits(updatedVisits);
                toast.success("Visita creada correctamente");
              } catch (error) {
                toast.error("Error al registrar la visita");
                console.error(error);
              } finally {
                handleCloseModal();
              }
            }}
            onCancel={handleCloseModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default AdminTechnicalVisits;
