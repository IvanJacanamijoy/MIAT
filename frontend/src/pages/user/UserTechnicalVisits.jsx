import { useEffect, useState } from "react";
import VisitCard from "../../components/TechnicalVisitsFilterForm/VisitCard";
import VisitFilterForm from "../../components/TechnicalVisitsFilterForm/VisitFilterForm";
import VisitForm from "../../components/TechnicalVisitsFilterForm/VisitForm";
import { useAuth } from "../../context/AuthContext";
import Modal from "../../components/common/Modal";
import ReprogramVisitForm from "../../components/TechnicalVisitsFilterForm/ReprogramVisitForm";
import fondo1 from "../../assets/images/home/imagen_fondo_nosotros.png";
import { fetchVisitasTecnicasApi } from '../../service/visitasTecnicas';


const UserTechnicalVisits = () => {
  const { usuario, authToken } = useAuth();
  const [visits, setVisits] = useState([]);
  const [filteredVisits, setFilteredVisits] = useState([]);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    if (usuario?.id) {
      fetchVisitasTecnicasApi(authToken,{clienteId: usuario.id}).then((data) => {
        setVisits(data);
        setFilteredVisits(data);
      });
    }
  }, [usuario]);

  const handleCancelVisit = (visitId) => {
    const updated = visits.map((v) =>
      v.id === visitId ? { ...v, estado: "Cancelada" } : v
    );
    setVisits(updated);
    setFilteredVisits(updated);
  };

  const handleReprogramVisit = (updatedVisit) => {
    const updated = visits.map((v) =>
      v.id === updatedVisit.id ? updatedVisit : v
    );
    setVisits(updated);
    setFilteredVisits(updated);
    setShowModal(false);
  };

  const handleFilter = (filters) => {
    const result = visits.filter((visit) => {
      const matchDate = filters.fecha ? visit.fecha === filters.fecha : true;
      const matchAddress = filters.direccion
        ? visit.direccion.toLowerCase().includes(filters.direccion.toLowerCase())
        : true;
      return matchDate && matchAddress;
    });
    setFilteredVisits(result);
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
          className="w-full h-[500px] object-cover opacity-90"
          alt="Fondo eléctrico"
        />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center text-gray-200 ">
          <h1 className="font-bold md:text-6xl">
            Mis Visitas Técnicas
          </h1>
          <p className="md:text-xl py-4">Aquí puede revisar el estado y los detalles de todas sus visitas técnicas programadas. 
            Si necesita hacer algún cambio, puede reprogramar su cita hasta 6 horas antes de la hora pautada.</p>
        </div>
      </div>

      <div className="relative z-10 bg-black rounded-t-3xl -mt-24 px-4 py-10 mx-10 sm:mx-20 xl:mx-30 text-white shadow-xl">
        <VisitFilterForm onFilter={handleFilter} />

        {/* Lista de visitas */}
        <div className="grid gap-6 mt-6">
          {filteredVisits.length === 0 ? (
            <p className="text-white">No hay visitas registradas.</p>
          ) : (
            filteredVisits.map((visit) => (
              <VisitCard
                key={visit.id}
                visit={visit}
                rol="usuario"
                onCancel={() => handleCancelVisit(visit.id)}
                onReprogram={() => {
                  setSelectedVisit(visit);
                  setShowModal(true);
                }}
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
