import { useEffect, useState } from 'react';
import VisitCard from '../../components/TechnicalVisitsFilterForm/VisitCard';
import VisitFilterForm from '../../components/TechnicalVisitsFilterForm/VisitFilterForm';
import { useAuth } from '../../context/AuthContext';
import fondo1 from "../../assets/images/home/imagen_fondo_nosotros.png";
import { fetchVisitasTecnicasApi } from '../../service/visitasTecnicas';

const TechnicianTechnicalVisits = () => {
  const { usuario, authToken } = useAuth();
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    if (usuario?.id) {
      fetchVisitasTecnicasApi(authToken,{tecnicoId:usuario.id}).then((data) => {
        setVisits(data);
      });
    }
  }, [usuario]);

  const handleFilter = (filters) => {
    console.log(filters)
    fetchVisitasTecnicasApi(authToken, filters).then((data)=>{
      setVisits(data);
      console.log(data.map((visita) => visita.Ident))
    }).catch('Hubo un error');
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
          <h1 className="text-white font-extrabold text-4xl md:text-5xl lg:text-6xl whitespace-nowrap">
            Visitas Técnicas Asignadas
          </h1>
          <p className="text-white mt-4 text-lg md:text-xl max-w-4xl mx-auto">
            Aquí puede ver todas las visitas técnicas que le han sido asignadas.
            Para cada una, encontrará los detalles completos necesarios para
            realizar su trabajo eficientemente.
          </p>
        </div>
      </div>

      {/* Contenedor con lista de visitas */}
      <div className="relative z-10 rounded-t-3xl -mt-24 px-4 py-10 mx-10 text-white">
        <VisitFilterForm onFilter={handleFilter} />

        <div className="grid gap-6 mt-6">
          {visits.length === 0 ? (
            <p className="text-white">No tienes visitas asignadas.</p>
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
    </div>
  );
};

export default TechnicianTechnicalVisits;
