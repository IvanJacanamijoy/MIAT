import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import fondo1 from "../../assets/images/home/imagen_fondo_nosotros.png";
import ServiceReportCard from "../../components/ServiceReportCard";
import ServiceReportFilterForm from "../../components/ServiceReportFilterForm";
import { fetchAllServicesApi } from "../../service/services";
import EmptyState from "../../components/Common/EmptyState";

const TechnicianServiceReports = () => {
  const { usuario, authToken } = useAuth();
  const [servicios, setServicios] = useState([]);

  const loadServices = async () => {
    try {
      const data = await fetchAllServicesApi(authToken, { tecnicoId: usuario.id });
      setServicios(data);
    } catch (error) {
      console.error("Error al cargar servicios:", error);
    }
  };

  useEffect(() => {
    loadServices();
  }, [usuario, authToken]);

  const handleServiceUpdate = () => {
    // Recargar servicios después de una actualización
    loadServices();
  };

  const handleFilter = (filters) => {
    // Incluir tecnicoId en los filtros como en TechnicianQuote
    const filtrosConTecnico = {
      ...filters,
      tecnicoId: usuario.id,
    };
    
    fetchAllServicesApi(authToken, filtrosConTecnico).then((data) => {
      setServicios(data);
    });
  };

  return (
    <div className="min-h-screen bg-gray-200 relative max-w-7xl mx-auto">
      <div className="relative">
        <img src={fondo1} 
        className="w-full h-[400px] object-cover opacity-90" alt="Fondo eléctrico" 
        />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center text-gray-200">
          <h1 className="font-bold md:text-6xl">Mis Servicios</h1>
          <p className="md:text-xl py-4">Consulta los informes de los servicios que te han sido asignados y ya están finalizados.</p>
        </div>
      </div>

      <div className="relative z-10 rounded-t-3xl -mt-40 sm:-mt-34 md:-mt-30 px-4 pb-10 lg:pb-0 pt-10 lg:pt-0 mx-10 text-white">
        <ServiceReportFilterForm onFilter={handleFilter} />
        <div className="grid gap-6 mt-6">
          {servicios.length === 0 ? (
            <EmptyState title="No hay servicios registrados" description="Cuando los servicios asignados se completen y generen informe, aparecerán aquí." icon="services" />
          ) : (
            servicios.map((s) => <ServiceReportCard key={s.IdCita} servicio={s} rol="tecnico" onUpdate={handleServiceUpdate} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnicianServiceReports;
