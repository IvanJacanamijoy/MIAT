import { useEffect, useState } from "react";
import VisitCard from "../../components/TechnicalVisitsFilterForm/VisitCard";
import VisitFilterForm from "../../components/TechnicalVisitsFilterForm/VisitFilterForm";
import VisitForm from "../../components/TechnicalVisitsFilterForm/VisitForm";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/common/Modal";
import ReprogramVisitForm from "../../components/TechnicalVisitsFilterForm/ReprogramVisitForm";
import fondo1 from "../../assets/images/home/imagen_fondo_nosotros.png";
import { fetchVisitasTecnicasApi } from '../../service/visitasTecnicas';
import ButtonTechnicalVisits from "../../components/ButtonTechnicalVisits";
import EmptyState from "../../components/Common/EmptyState";


const UserTechnicalVisits = () => {
  const { usuario, authToken } = useAuth();
  const [visits, setVisits] = useState([]);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    if (usuario?.id) {
      fetchVisitasTecnicasApi(authToken,{clienteId: usuario.id}).then((data) => {
        setVisits(data);
      });
    }
  }, [usuario]);

  const handleFilter = (filters) => {
    console.log(filters)
    fetchVisitasTecnicasApi(authToken, filters).then((data)=>{
      setVisits(data);
    }).catch('Hubo un error');
  };

  const handleOpenModal = (visit, type) => {
    setSelectedVisit(visit);
    setModalType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType('');
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

  const handleSubmitVisit = async (data) => {
    try {
      const response = await fetch("https://tuservidor.com/api/visitas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, usuarioId: usuario?.id }),
      });

      if (!response.ok) throw new Error("Error al agendar la visita");

      const nuevaVisita = await response.json();

      alert("Visita agendada exitosamente");

      const updatedVisits = [...visits, nuevaVisita];
      setVisits(updatedVisits);
      setFilteredVisits(updatedVisits);
      setShowFormModal(false);
    } catch (error) {
      alert("Ocurrió un error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 relative max-w-7xl mx-auto">
      <div className="relative">
        <img
          src={fondo1}
          className="w-full h-[400px] object-cover opacity-90"
          alt="Fondo eléctrico"
        />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center text-gray-200 ">
          <h1 className="font-bold md:text-6xl">
            Mis Visitas Técnicas
          </h1>
          <p className="md:text-xl py-4">Aquí puede revisar el estado y los detalles de todas sus visitas técnicas programadas.</p>
        </div>
      </div>

      <div className="relative z-10 rounded-t-3xl -mt-40 sm:-mt-34  md:-mt-30 px-4 pb-10 lg:pb-0 pt-10 lg:pt-0 mx-10 text-white">
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

      {/* Modal para agendar visita */}
      <Modal isOpen={showFormModal} onClose={() => setShowFormModal(false)}>
        <VisitForm
          agendar={true}
          visitaTecnica={{}}
          onSubmit={handleSubmitVisit}
        />
      </Modal>
    </div>
  );
};

export default UserTechnicalVisits;
