import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import fondo from "../../assets/images/home/imagen_fondo_nosotros.png";
import servicio_adecuacion from "../../assets/images/home/imagen_fondo_nosotros.png";
import servicio_mantenimiento from "../../assets/images/home/imagen_fondo_servicios.png";
import { fetchVisitasTecnicasApi } from '../../service/visitasTecnicas';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const { usuario, authToken } = useAuth();
  const [visitasAgendadas, setVisitasAgendadas] = useState(0);

  useEffect(() => {
    const fetchMyVisitas = async () => {
      if (!usuario || !authToken) return;

      try {
        const allVisits = await fetchVisitasTecnicasApi(authToken, {});
        
        // Filtramos las visitas que pertenecen al usuario actual
        const myVisits = allVisits.filter(visita => visita.idUsuario === usuario.uid);
        
        const agendadas = myVisits.filter(visita => visita.estado === 'Agendada');
        
        setVisitasAgendadas(agendadas.length);

      } catch (error) {
        console.error("Error al obtener los datos de visitas:", error);
      }
    };

    fetchMyVisitas();
  }, [usuario, authToken]);

  return (
    <div className="relative min-h-screen bg-gray-200">
      {/* Sección principal con la imagen de fondo y el título */}
      <div className="relative w-full h-screen">
        <img
          src={fondo}
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          alt="Fondo de bienvenida"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            Bienvenido Cliente
          </h1>
          <Link to="/usuario/visitatecnica" className="mt-8">
            <button className="bg-red-600 bg-opacity-80 py-4 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105">
              <span className='text-xl font-semibold whitespace-nowrap'>Agenda Una Visita Técnica AQUI!!</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Sección de servicios y visitas pendientes */}
      <div className='relative z-10 -mt-24 px-4 sm:px-8 md:px-12 lg:px-24'>
        <div className='flex flex-col gap-8'>
          {/* Carrusel de servicios */}
          <div className="flex justify-center items-center gap-4">
            <button className="bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-70">
              &lt;
            </button>
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm">
              <img src={servicio_adecuacion} alt="Servicio Adecuación" className="w-full h-48 object-cover"/>
              <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 text-white p-4">
                <h3 className="text-xl font-semibold">Servicio Adecuación</h3>
                <Link to="/servicios/adecuacion">
                  <button className="mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                    Ver Más
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm">
              <img src={servicio_mantenimiento} alt="Servicio Mantenimiento" className="w-full h-48 object-cover"/>
              <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-50 text-white p-4">
                <h3 className="text-xl font-semibold">Servicio Mantenimiento</h3>
                <Link to="/servicios/mantenimiento">
                  <button className="mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                    Ver Más
                  </button>
                </Link>
              </div>
            </div>
            <button className="bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-70">
              &gt;
            </button>
          </div>
          
          {/* Sección de Visitas Pendientes */}
          <div className='relative z-10 flex justify-center items-center'>
            <div className="relative flex items-center gap-4">
              <div className='bg-red-600 bg-opacity-80 py-4 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105'>
                <span className='text-xl font-semibold whitespace-nowrap'>Visitas Pendientes</span>
              </div>
              <div className="bg-red-600 bg-opacity-80 rounded-full w-24 h-24 flex flex-col justify-center items-center shadow-lg">
                <span className="text-6xl font-bold">{visitasAgendadas}</span>
              </div>
              <div className='bg-red-600 bg-opacity-80 py-4 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105'>
                <span className='text-xl font-semibold whitespace-nowrap'>Hoy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
