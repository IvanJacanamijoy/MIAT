import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import fondo1 from "../../assets/images/home/imagen_fondo_nosotros.png";
import ServiceReportCard from "../../components/ServiceReportCard";
import ServiceActiveCard from "../../components/ServiceActiveCard";
import ServiceReportFilterForm from "../../components/ServiceReportFilterForm";
import { fetchAllServicesApi } from "../../service/services";
import EmptyState from "../../components/Common/EmptyState";

const AdminServicesReports = () => {
  const { usuario, authToken } = useAuth();
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, [usuario, authToken]);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await fetchAllServicesApi(authToken, {});
      // Mostrar todos los servicios sin filtrar por estado
      setServicios(data);
    } catch (error) {
      console.error("Error al cargar servicios:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (filters) => {
    try {
      setLoading(true);
      const data = await fetchAllServicesApi(authToken, filters);
      // Mostrar todos los servicios sin filtrar por estado
      setServicios(data);
    } catch (error) {
      console.error("Error al filtrar servicios:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceUpdate = () => {
    // Recargar servicios después de una actualización
    loadServices();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando servicios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 relative max-w-7xl mx-auto">
      <div className="relative">
        <img 
            src={fondo1} 
            className="w-full h-[400px] object-cover opacity-90" alt="Fondo eléctrico" 
        />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center text-gray-200">
          <h1 className="font-bold md:text-6xl">Todos los Servicios</h1>
          <p className="md:text-xl py-4">Gestiona todos los servicios y sube las fotos antes/después</p>
        </div>
      </div>

      <div className="relative z-10 rounded-t-3xl -mt-40 sm:-mt-34 md:-mt-30 px-4 pb-10 lg:pb-0 pt-10 lg:pt-0 mx-10 text-white">
        <ServiceReportFilterForm onFilter={handleFilter} />
        <div className="grid gap-6 mt-6">
          {servicios.length === 0 ? (
            <EmptyState 
              title="No hay servicios registrados" 
              description="Cuando se creen servicios desde cotizaciones aceptadas, aparecerán aquí." 
              icon="services" 
            />
          ) : (
            (() => {
              // Separar servicios activos de finalizados
              const serviciosActivos = servicios.filter(servicio => 
                servicio.EstadoServicioDescripcion !== "Finalizado"
              );
              const serviciosFinalizados = servicios.filter(servicio => 
                servicio.EstadoServicioDescripcion === "Finalizado"
              );

              return (
                <>
                  {/* Servicios Activos - Mostrar primero */}
                  {serviciosActivos.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                        Servicios Activos ({serviciosActivos.length})
                      </h3>
                      <div className="grid gap-4">
                        {serviciosActivos.map((servicio) => (
                          <ServiceActiveCard 
                            key={servicio.IdServicio} 
                            servicio={servicio} 
                            onUpdate={handleServiceUpdate}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Servicios Finalizados - Mostrar después */}
                  {serviciosFinalizados.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                        Servicios Finalizados ({serviciosFinalizados.length})
                      </h3>
                      <div className="grid gap-4">
                        {serviciosFinalizados.map((servicio) => (
                          <ServiceReportCard 
                            key={servicio.IdServicio} 
                            servicio={servicio} 
                            rol="admin"
                            onUpdate={handleServiceUpdate}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              );
            })()
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminServicesReports;
