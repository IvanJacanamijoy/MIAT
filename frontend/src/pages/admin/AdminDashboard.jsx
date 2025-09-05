import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import fondo from "../../assets/images/home/imagen_fondo_nosotros.png";
import { fetchVisitasTecnicasApi } from '../../service/visitasTecnicas';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { usuario, authToken } = useAuth();
  const [visitasAgendadasHoy, setVisitasAgendadasHoy] = useState(20);
  const [visitasFinalizadasHoy, setVisitasFinalizadasHoy] = useState(7);

  useEffect(() => {
    const fetchVisitasDelDia = async () => {
      try {
        const today = new Date().toISOString().slice(0, 10);
        
        const allVisits = await fetchVisitasTecnicasApi(authToken, {});
        
        const agendadasHoy = allVisits.filter(visita => 
          visita.fecha.startsWith(today) && visita.estado === 'Agendada'
        );
        
        const finalizadasHoy = allVisits.filter(visita => 
          visita.fecha.startsWith(today) && visita.estado === 'Finalizada'
        );

        setVisitasAgendadasHoy(agendadasHoy.length);
        setVisitasFinalizadasHoy(finalizadasHoy.length);

      } catch (error) {
        console.error("Error al obtener los datos de visitas:", error);
      }
    };

    fetchVisitasDelDia();
  }, [authToken]);

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
            Bienvenido Administrador
          </h1>
    
          <div className="flex flex-col gap-8 mt-10">
            
            {/* Contenedor de la primera tarjeta */}
           <Link to="/visitas-agendadas">  <div className='flex items-center gap-4'>
              <div className='bg-red-600 bg-opacity-80 py-4 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105'>
                <span className='text-xl font-semibold whitespace-nowrap'>Visitas agendadas Hoy</span>
              </div>
              <div className="bg-red-600 bg-opacity-80 rounded-full p-4 w-64 h-64 flex flex-col justify-center items-center shadow-lg transform transition-transform duration-300 hover:scale-105">
                <span className="text-xl font-semibold">Visitas Agendadas Hoy</span>
                <span className="text-6xl md:text-8xl font-bold mt-2">{visitasAgendadasHoy}</span>
              </div>
            </div>
            </Link>
            {/* Contenedor de la segunda tarjeta - CORREGIDO */}
            <div className='flex items-center gap-4'>
              <div className='bg-red-600 bg-opacity-80 py-4 px-8 rounded-full shadow-lg transform transtition-transform duration-300 hover:scale-105'>
                <span className='text-xl font-semibold whitespace-nowrap'>Visitas Finalizadas Hoy</span>
              </div>
              <div className="bg-red-600 bg-opacity-80 rounded-full p-4 w-64 h-64 flex flex-col justify-center items-center shadow-lg transform transition-transform duration-300 hover:scale-105">
                <span className="text-xl font-semibold">Visitas Finalizadas Hoy</span>
                <span className="text-6xl md:text-8xl font-bold mt-2">{visitasFinalizadasHoy}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;