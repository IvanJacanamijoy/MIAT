import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getDiagnosticosApi } from "../service/diagnostico";
import { createCotizacionApi } from "../service/cotizacion";
import { toast } from "react-toastify";
import Modal from "./Common/Modal";
import QuoteForm from "./QuoteForm";

const PendingDiagnoses = () => {
  const { authToken, usuario } = useAuth();
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDiagnostico, setSelectedDiagnostico] = useState(null);

  useEffect(() => {
    const cargarDiagnosticos = async () => {
      try {
        const data = await getDiagnosticosApi(authToken);
        // Filtrar solo diagnósticos sin cotización
        const diagnosticosSinCotizacion = data.filter(d => !d.tieneCotizacion);
        setDiagnosticos(diagnosticosSinCotizacion);
      } catch (error) {
        toast.error("Error al cargar diagnósticos");
      }
    };

    cargarDiagnosticos();
  }, [authToken]);

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
      const updatedDiagnosticos = diagnosticos.filter(
        d => d.IdDiagnostico !== selectedDiagnostico.IdDiagnostico
      );
      setDiagnosticos(updatedDiagnosticos);

      handleCloseModal();
    } catch (error) {
      toast.error("Error al crear cotización");
      console.error(error);
    }
  };

  return (
    <div className="">
      {/* Diagnósticos sin cotización */}
      <h3 className="text-xl font-semibold mb-3 text-white">Diagnósticos pendientes de cotización</h3>
      {diagnosticos.length === 0 ? (
        <p className="mb-6 text-white bg-white">No hay diagnósticos pendientes de cotización.</p>
      ) : (
        <div className="h-96 overflow-y-auto mb-6">
          <div className="grid gap-4">
            {diagnosticos.slice(0, 3).map((d) => (
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
            {diagnosticos.slice(3).map((d) => (
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

      {/* Modal para crear cotización */}
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        {selectedDiagnostico && (
          <QuoteForm
            idDiagnostico={selectedDiagnostico.IdDiagnostico}
            onSubmit={handleSubmitCotizacion}
            onCancel={handleCloseModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default PendingDiagnoses;
