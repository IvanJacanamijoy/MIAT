import { useEffect, useState } from 'react';
import VisitCard from '../../components/TechnicalVisitsFilterForm/VisitCard';
import VisitFilterForm from '../../components/TechnicalVisitsFilterForm/VisitFilterForm';
import Modal from '../../components/common/Modal';
import ReprogramVisitForm from '../../components/TechnicalVisitsFilterForm/ReprogramVisitForm';
import AssignTechnicianForm from '../../components/TechnicalVisitsFilterForm/AssignTechnicianForm';
import { useAuth } from '../../context/AuthContext';
import fondo1 from "../../assets/images/home/imagen_fondo_nosotros.png";
import { fetchVisitasTecnicasApi } from '../../service/visitasTecnicas';
import ButtonTechnicalVisits from '../../components/ButtonTechnicalVisits';
import { updateVisitaTecnicaApi } from '../../service/visitasTecnicas';

const AdminTechnicalVisits = () => {
  const { usuario, authToken } = useAuth();
  const [visits, setVisits] = useState([]);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [modalType, setModalType] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchVisitasTecnicasApi(authToken,{}).then((data) => {
      console.log(data);
      setVisits(data);
    });
  }, []);

  const handleFilter = (filters) => {
    console.log(filters)
    fetchVisitasTecnicasApi(authToken, filters).then((data)=>{
      setVisits(data);
      console.log(data.map((visita) => visita.Ident))
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

  const handleCancelVisit = async (visitId) => {
    console.log('Cancel visit with ID:', visitId);
    const confirmCancel = window.confirm('¿Está seguro que desea cancelar esta visita técnica?');
    if (!confirmCancel) return;

    try {
      const response = await updateVisitaTecnicaApi(visitId, { IdEstado: 7 }, authToken);
      if (response && response.message) {
        alert(response.message);
      } else {
        alert('Visita cancelada.');
      }
      // Opcional: refresca la lista de visitas
      fetchVisitasTecnicasApi(authToken,{}).then((data) => setVisits(data));
    } catch (error) {
      alert('Error al cancelar la visita.');
      console.error(error);
    }
  };

  const handleReprogramVisit = async (updatedVisit) => {
    try {
      // Actualiza la visita en el backend
      const response = await updateVisitaTecnicaApi(
        updatedVisit.IdCita,
        {
          Fecha: updatedVisit.fecha,
          Hora: updatedVisit.hora,
        },
        authToken
      );
      if (response && response.message) {
        alert(response.message);
      } else {
        alert('Visita reprogramada.');
      }
      // Refresca la lista de visitas
      const data = await fetchVisitasTecnicasApi(authToken, {});
      setVisits(data);
    } catch (error) {
      alert('Error al reprogramar la visita.');
      console.error(error);
    }
    handleCloseModal();
  };

  const handleAssignTechnician = (updatedVisit) => {
    const updated = visits.map((v) =>
      v.id === updatedVisit.id ? updatedVisit : v
    );
    setVisits(updated);
    
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

      <div className="relative z-10 rounded-t-3xl -mt-24 px-4 py-10 mx-10 text-white">
        <ButtonTechnicalVisits/>
        <VisitFilterForm onFilter={handleFilter} />

        <div className="grid gap-6 mt-6">
          {visits.length === 0 ? (
            <p className="text-white">No hay visitas técnicas registradas.</p>
          ) : (
            visits.map((visit) => (
              
              <VisitCard
                key={visit.id}
                visit={visit}
                rol="admin"
                onCancel={() => handleCancelVisit(visit.IdCita)}
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