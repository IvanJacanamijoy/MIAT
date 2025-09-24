import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // 👈 para leer el state de navegación
import VisitCard from "../../components/TechnicalVisitsFilterForm/VisitCard";
import VisitFilterForm from "../../components/TechnicalVisitsFilterForm/VisitFilterForm";
import VisitForm from "../../components/TechnicalVisitsFilterForm/VisitForm";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/Common/Modal";
import ReprogramVisitForm from "../../components/TechnicalVisitsFilterForm/ReprogramVisitForm";
import fondo1 from "../../assets/images/home/imagen_fondo_nosotros.png";
import { fetchVisitasTecnicasApi } from '../../service/visitasTecnicas';
import ButtonTechnicalVisits from "../../components/ButtonTechnicalVisits";
import EmptyState from "../../components/Common/EmptyState";

const UserTechnicalVisits = () => {
  const { usuario, authToken } = useAuth();
  const location = useLocation(); // 👈 leer si viene con openForm
  const [visits, setVisits] = useState([]);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [modalType, setModalType] = useState("");

  // Abrir modal de agendar si viene desde el Home con openForm=true
  useEffect(() => {
    if (location.state?.openForm) {
      setShowFormModal(true);
    }
  }, [location.state]);

  useEffect(() => {
    if (usuario?.id) {
      fetchVisitasTecnicasApi(authToken, { clienteId: usuario.id }).then((data) => {
        setVisits(data);
      });
    }
  }, [usuario, authToken]);

  const handleFilter = (filters) => {
    fetchVisitasTecnicasApi(authToken, filters)
      .then((data) => setVisits(data))
      .catch(() => console.error("Hubo un error al filtrar"));
  };

  const handleOpenModal = (visit, type) => {
    setSelectedVisit(visit);
    setModalType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType("");
    setSelectedVisit(null);
  };

  const handleCancelVisit = (visitId) => {
    const updated = visits.map((v) =>
      v.id === visitId ? { ...v, estado: "Cancelada" } : v
    );
    setVisits(updated);
  };

  const handleReprogramVisit = (updatedVisit) => {
    const updated = visits.map((v) =>
      v.id === updatedVisit.id ? updatedVisit : v
    );
    setVisits(updated);
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-gray-200 relative max-w-7xl mx-auto">
      {/* Hero */}
      <div className="relative">
        <img
          src={fondo1}
          className="w-full h-[400px] object-cover opacity-90"
          alt="Fondo eléctrico"
        />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center text-gray-200">
          <h1 className="font-bold text-4xl md:text-6xl">Mis Visitas Técnicas</h1>
          <p className=" sm:text-lg md:text-xl py-4">
            Aquí puede revisar el estado y los detalles de todas sus visitas técnicas programadas.
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 rounded-t-3xl -mt-20 md:-mt-26 px-4 pb-10 lg:pb-0 pt-10  mx-10 text-white">
        <ButtonTechnicalVisits />
        <VisitFilterForm onFilter={handleFilter} />

        {/* Lista de visitas */}
        <div className="grid gap-6 mt-6">
          {visits.length === 0 ? (
            <EmptyState
              title="No hay visitas técnicas registradas"
              description="Cuando se agenden visitas, aparecerán automáticamente en este panel."
              icon="visits"
            />
          ) : (
            visits.map((visit) => (
              <VisitCard
                key={visit.id}
                visit={visit}
                rol="usuario"
                onCancel={() => handleCancelVisit(visit.id)}
                onReprogram={() => handleOpenModal(visit, "reprogramar")}
              />
            ))
          )}
        </div>
      </div>

      {/* Modal para reprogramar visita */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ReprogramVisitForm
          currentVisit={selectedVisit}
          onSubmit={handleReprogramVisit}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
};

export default UserTechnicalVisits;

