import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import fondo1 from "../../assets/images/home/imagen_fondo_nosotros.png";
import ServiceReportCard from "../../components/ServiceReportCard";
import ServiceReportFilterForm from "../../components/ServiceReportFilterForm";
import { fetchAllServicesApi } from "../../service/services";
import EmptyState from "../../components/Common/EmptyState";

const ClientServiceReports = () => {
  const { usuario, authToken } = useAuth();
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    // Incluir clienteId como en UserQuote para mantener consistencia
    fetchAllServicesApi(authToken, { clienteId: usuario.id }).then((data) => {
      setServicios(data);
    });
  }, [usuario, authToken]);

  const handleFilter = (filters) => {
    // Incluir clienteId en los filtros como en UserQuote
    const filtrosConCliente = {
      ...filters,
      clienteId: usuario.id,
    };
    
    fetchAllServicesApi(authToken, filtrosConCliente).then((data) => {
      setServicios(data);
    });
  };

  return (
    <div className="min-h-screen bg-gray-200 relative max-w-7xl mx-auto">
      <div className="relative">
        <img src={fondo1} className="w-full h-[400px] object-cover opacity-90" alt="Fondo eléctrico" />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center text-gray-200">
          <h1 className="font-bold md:text-6xl">Mis Servicios</h1>
          <p className="md:text-xl py-4">Aquí podrás revisar tus servicios ya finalizados junto al informe generado.</p>
        </div>
      </div>

      <div className="relative z-10 rounded-t-3xl -mt-30 px-4 pb-10 mx-10 text-white">
        <ServiceReportFilterForm onFilter={handleFilter} />
        <div className="grid gap-6 mt-6">
          {servicios.length === 0 ? (
            <EmptyState title="No hay servicios registrados" description="Cuando se completen tus servicios y se genere el informe, aparecerán aquí." icon="services" />
          ) : (
            servicios.map((s) => <ServiceReportCard key={s.IdCita} servicio={s} rol="cliente" />)
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientServiceReports;