import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

import QuoteCard from "../../components/QuoteFilterForm/QuoteCard";
import QuoteFilterForm from "../../components/QuoteFilterForm/QuoteFilterForm";
import EmptyState from "../../components/Common/EmptyState";
import Modal from "../../components/Common/Modal";
import QuoteForm from "../../components/QuoteForm";

import fondo1 from "../../assets/images/home/imagen_fondo_nosotros.png";
import { fetchCotizacionesApi, createCotizacionApi } from "../../service/cotizacion";
import { getDiagnosticosApi } from "../../service/diagnostico";

const TechnicianQuote = () => {
  const { usuario, authToken } = useAuth();

  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDiagnostico, setSelectedDiagnostico] = useState(null);

  // Cargar cotizaciones y diagnósticos al iniciar
  useEffect(() => {
    if (!authToken || !usuario?.id) return;

    const fetchData = async () => {
      try {
        // Cargar cotizaciones del técnico
        const quotesData = await fetchCotizacionesApi(authToken, { idTecnico: usuario.id });
        setQuotes(quotesData);
        setFilteredQuotes(quotesData);

        // Cargar diagnósticos
        const diagnosticosData = await getDiagnosticosApi(authToken);
        // Filtrar solo diagnósticos asignados a este técnico y sin cotización
        const diagnosticosFiltrados = diagnosticosData.filter(
          d => d.IdTecnico === usuario.id && !d.tieneCotizacion
        );
        setDiagnosticos(diagnosticosFiltrados);
      } catch (error) {
        toast.error("Error al cargar datos");
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [authToken, usuario]);

  const handleEdit = (id) => {
    toast.info("Abriendo formulario para editar cotización");
    console.log("Editar cotización:", id);
  };

  const handleComplete = (id) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: "Completada" } : q))
    );
    toast.success("Servicio marcado como completado");
  };

  const handleViewMore = (quote) => {
    console.log("Detalle de cotización:", quote);
  };

  // Filtro de cotizaciones
  const handleFilter = async (filters = {}) => {
    try {
      if (!usuario?.id || !authToken) return;

      // Siempre incluir el id del técnico
      const filtrosConTecnico = {
        ...filters,
        idTecnico: usuario.id,
      };

      const data = await fetchCotizacionesApi(authToken, filtrosConTecnico);
      setFilteredQuotes(data);
    } catch (error) {
      toast.error("Error al aplicar filtros");
      console.error("Error en handleFilter:", error);
    }
  };

  // Funciones para crear cotización
  const handleCrearCotizacion = (diagnostico) => {
    setSelectedDiagnostico(diagnostico);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDiagnostico(null);
  };

  const handleSubmitCotizacion = async (cotizacionData) => {
    try {
      const nuevaCotizacion = {
        IdDiagnostico: selectedDiagnostico.IdDiagnostico,
        PrecioTotal: cotizacionData.PrecioTotal || 0,
        Observaciones: cotizacionData.Observaciones || "",
        IdEstado: 5, // 5 = "Pendiente" según los datos de la BD
        Garantia: cotizacionData.Garantia || "",
        CostoManoObra: cotizacionData.CostoManoObra || 0,
        CostoMateriales: cotizacionData.CostoMateriales || 0
      };

      await createCotizacionApi(nuevaCotizacion, authToken);
      toast.success("Cotización creada correctamente");

      // Actualizar la lista de diagnósticos
      setDiagnosticos(prev => 
        prev.filter(d => d.IdDiagnostico !== selectedDiagnostico.IdDiagnostico)
      );

      // Recargar cotizaciones
      const quotesData = await fetchCotizacionesApi(authToken, { idTecnico: usuario.id });
      setQuotes(quotesData);
      setFilteredQuotes(quotesData);

      handleCloseModal();
    } catch (error) {
      toast.error("Error al crear cotización");
      console.error(error);
    }
  };

  // Función para actualizar las listas después de crear una cotización
  const actualizarListasDespuesDeCrear = async () => {
    try {
      // Actualizar la lista de diagnósticos
      setDiagnosticos(prev => 
        prev.filter(d => d.IdDiagnostico !== selectedDiagnostico.IdDiagnostico)
      );

      // Recargar cotizaciones
      const quotesData = await fetchCotizacionesApi(authToken, { idTecnico: usuario.id });
      setQuotes(quotesData);
      setFilteredQuotes(quotesData);
    } catch (error) {
      console.error("Error al actualizar listas:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 relative max-w-7xl mx-auto">
      {/* Banner */}
      <div className="relative">
        <img
          src={fondo1}
          className="w-full h-[350px] object-cover opacity-90"
          alt="Fondo"
        />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center text-gray-200">
          <h1 className="font-bold md:text-6xl">Panel de Técnico</h1>
          <p className="md:text-xl py-4">
            Gestione diagnósticos pendientes y cotizaciones asignadas
          </p>
        </div>
      </div>

      <div className="relative z-10 rounded-t-3xl -mt-24 px-4 py-10 mx-10 bg-gray-800 text-white">
        {/* Sección de diagnósticos pendientes */}
        <h3 className="text-xl font-semibold mb-3 text-white">Diagnósticos pendientes de cotización</h3>
        {diagnosticos.length === 0 ? (
          <p className="mb-6 text-black">No hay diagnósticos pendientes de cotización.</p>
        ) : (
          <div className="h-96 overflow-y-auto mb-6">
            <div className="grid gap-4">
              {diagnosticos.map((d) => (
                <div key={d.IdDiagnostico} className="bg-white p-4 rounded shadow relative">
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    Diagnóstico
                  </div>
                  <p className="text-black"><strong>Cliente:</strong> {d.ClienteNombre}</p>
                  <p className="text-black"><strong>Técnico:</strong> {d.TecnicoNombre}</p>
                  <p className="text-black"><strong>Descripción:</strong> {d.Descripcion}</p>
                  <div className="mt-2">
                    <p className="font-semibold text-black">Materiales:</p>
                    {d.Materiales && (
                      <div className="bg-gray-100 p-2 rounded mt-1">
                        {(() => {
                          try {
                            const materialesArray = JSON.parse(d.Materiales);
                            return materialesArray.length > 0 ? (
                              <ul className="list-disc pl-5">
                                {materialesArray.map((material, idx) => (
                                  <li key={idx} className="text-sm text-black">
                                    {material.nombre} - {material.cantidad} {material.umedida}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm italic text-black">No hay materiales registrados</p>
                            );
                          } catch (e) {
                            return <p className="text-sm italic text-black">Formato de materiales no válido</p>;
                          }
                        })()}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleCrearCotizacion(d)}
                    className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Crear cotización
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sección de cotizaciones */}
        <h3 className="text-xl font-semibold mb-3 text-white">Mis Cotizaciones</h3>
        <QuoteFilterForm onFilter={handleFilter} />

        <div className="grid gap-6 mt-6">
          {filteredQuotes.length === 0 ? (
            <EmptyState
              title="No hay cotizaciones"
              description="No hay cotizaciones que coincidan con los filtros."
              icon="quotes"
            />
          ) : (
            filteredQuotes.map((q) => (
              <QuoteCard
                key={q.IdCotizacion}
                quote={q}
                rol="tecnico"
                onEdit={handleEdit}
                onViewMore={handleViewMore}
              />
            ))
          )}
        </div>
      </div>

      {/* Modal para crear cotización */}
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        {selectedDiagnostico && (
          <QuoteForm
            idDiagnostico={selectedDiagnostico.IdDiagnostico}
            onSubmit={handleSubmitCotizacion}
            onCancel={handleCloseModal}
            onSuccess={actualizarListasDespuesDeCrear}
          />
        )}
      </Modal>
    </div>
  );
};

export default TechnicianQuote;
