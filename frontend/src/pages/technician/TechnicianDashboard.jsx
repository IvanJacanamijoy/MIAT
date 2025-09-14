import { useEffect, useState } from 'react';
import VisitCard from '../../components/TechnicalVisitsFilterForm/VisitCard';
import VisitFilterForm from '../../components/TechnicalVisitsFilterForm/VisitFilterForm';
import { useAuth } from '../../context/AuthContext';
import fondo1 from "../../assets/images/home/imagen_fondo_nosotros.png";
import { fetchVisitasTecnicasApi } from '../../service/visitasTecnicas';

// Componente para el modal con los detalles de todas las visitas
const VisitsModal = ({ visits, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl mx-auto h-[90vh] flex flex-col">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-2xl font-bold text-gray-900">Visitas Asignadas</h3>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-6">
          {visits.length === 0 ? (
            <p className="text-gray-700 text-center text-lg mt-8">No tienes visitas asignadas.</p>
          ) : (
            visits.map((visit) => (
              <div key={visit.Ident} className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col md:flex-row space-x-0 md:space-x-6">
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{visit.Ident} - {visit.Titulo}</h4>
                  <p className="text-gray-600 text-sm"><span className="font-semibold">Dirección:</span> {visit.Direccion}</p>
                  <p className="text-gray-600 text-sm"><span className="font-semibold">Hora:</span> {visit.Hora}</p>
                  <p className="text-gray-600 text-sm"><span className="font-semibold">Precio:</span> ${visit.Precio}</p>
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <h5 className="font-semibold text-gray-800 mb-2">Ubicación en el mapa</h5>
                  {/* Mapa simulado - en un entorno real se usaría una biblioteca de mapas como Google Maps o Leaflet */}
                  <div className="bg-gray-300 h-40 rounded-lg flex items-center justify-center text-gray-500">
                    <p>Mapa de la ubicación de la visita</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const TechnicianDashboard = () => {
  const { usuario, authToken } = useAuth();
  const [visits, setVisits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (usuario?.id) {
      fetchVisitasTecnicasApi(authToken, { tecnicoId: usuario.id }).then((data) => {
        setVisits(data);
      });
    }
  }, [usuario, authToken]);

  const totalVisits = visits.length;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-200 relative max-w-7xl mx-auto">
      {/* Sección del Dashboard con imagen y texto de bienvenida */}
      <div className="relative">
        <img
          src={fondo1}
          className="w-full h-[500px] object-cover opacity-90"
          alt="Fondo de bienvenida"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-6">
          <h1 className="text-white font-extrabold text-4xl md:text-5xl lg:text-6xl whitespace-nowrap">
            Bienvenido, Técnico
          </h1>
          <p className="text-white mt-4 text-lg md:text-xl max-w-4xl mx-auto">
            Tienes un resumen de tus próximas visitas asignadas.
          </p>

          {/* Círculo como botón para abrir el modal - Centrado correctamente */}
          <div className="flex justify-center">
            <button onClick={handleOpenModal} className="mt-8 flex flex-col items-center justify-center focus:outline-none">
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-red-600 rounded-full flex items-center justify-center border-4 border-red-800 transform hover:scale-110 transition-transform duration-300">
                <span className="text-4xl sm:text-5xl font-bold text-white z-10">{totalVisits}</span>
              </div>
              <span className="text-white mt-2 text-md sm:text-lg">Ver detalles de visitas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contenedor de las tarjetas de visita */}
      <div className="relative z-10 bg-black rounded-t-3xl -mt-24 px-4 py-10 mx-10 sm:mx-20 xl:mx-30 text-white shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Próximas Visitas</h2>

        <div className="grid gap-6 mt-6">
          {visits.length === 0 ? (
            <p className="text-white text-center text-lg mt-8">No tienes visitas asignadas.</p>
          ) : (
            visits.map((visit) => (
              <VisitCard
                key={visit.IdCita}
                visit={visit}
                rol="tecnico"
              />
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <VisitsModal visits={visits} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default TechnicianDashboard;