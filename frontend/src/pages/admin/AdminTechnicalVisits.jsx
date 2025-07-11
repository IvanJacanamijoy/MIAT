import { useEffect, useState } from 'react';
import VisitCard from '../../components/TechnicalVisitsFilterForm/VisitCard';
import VisitFilterForm from '../../components/TechnicalVisitsFilterForm/VisitFilterForm';
import Modal from '../../components/common/Modal';
import ReprogramVisitForm from '../../components/TechnicalVisitsFilterForm/ReprogramVisitForm';
import AssignTechnicianForm from '../../components/TechnicalVisitsFilterForm/AssignTechnicianForm';
import { useAuth } from '../../context/AuthContext';
import fondo1 from "../../assets/images/home/imagen_fondo_nosotros.png";
import { fetchVisitasTecnicasApi } from '../../service/visitasTecnicas';

const AdminTechnicalVisits = () => {
  const { usuario, authToken } = useAuth();
  const [visits, setVisits] = useState([]);
  const [filteredVisits, setFilteredVisits] = useState([]);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [modalType, setModalType] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchVisitasTecnicasApi(authToken,{}).then((data) => {
      setVisits(data);
      setFilteredVisits(data);
    });
  }, []);

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
    setFilteredVisits(updated);
  };

  const handleReprogramVisit = (updatedVisit) => {
    const updated = visits.map((v) =>
      v.id === updatedVisit.id ? updatedVisit : v
    );
    setVisits(updated);
    setFilteredVisits(updated);
    handleCloseModal();
  };

  const handleAssignTechnician = (updatedVisit) => {
    const updated = visits.map((v) =>
      v.id === updatedVisit.id ? updatedVisit : v
    );
    setVisits(updated);
    setFilteredVisits(updated);
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-gray-200 relative max-w-7xl mx-auto">
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

      <div className="relative z-10 bg-black rounded-t-3xl -mt-24 px-4 py-10 mx-10 sm:mx-20 xl:mx-30 text-white shadow-xl">
        <VisitFilterForm onFilter={handleFilter} />

        <div className="grid gap-6 mt-6">
          {filteredVisits.length === 0 ? (
            <p className="text-white">No hay visitas técnicas registradas.</p>
          ) : (
            filteredVisits.map((visit) => (
              <VisitCard
                key={visit.id}
                visit={visit}
                rol="admin"
                onCancel={() => handleCancelVisit(visit.id)}
                onReprogram={() => handleOpenModal(visit, "reprogramar")}
                onAssign={handleAssignTechnician}
                onOpenAssignModal={() => handleOpenModal(visit, "asignar")}
              />
            ))
          )}
        </div>
      </div>

      {/* Modal */}
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
            currentVisit={selectedVisit}
            technicians={[
              { id: 1, nombre: "Técnico A" },
              { id: 2, nombre: "Técnico B" },
            ]}
            onSubmit={handleAssignTechnician}
            onCancel={handleCloseModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default AdminTechnicalVisits;