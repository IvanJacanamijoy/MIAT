import { useState } from "react";
import servicio1 from "../../assets/images/servicecarousel/servicio_1.png";
import Modal from "../Common/Modal";

const QuoteCard = ({ quote, rol, onAccept, onReject, onEdit, onViewMore }) => {
  const [accionesVisibles, setAccionesVisibles] = useState(true);

  // Estados de modales
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);

  // Datos extraídos directamente del modelo
  const clienteNombre = `${quote.ClienteNombres || ""} ${quote.ClienteApellidos || ""}`.trim() || "No disponible";
  const tecnicoNombre = quote.TecnicoNombres ? `${quote.TecnicoNombres} ${quote.TecnicoApellidos}` : "No asignado";
  const direccion = quote.Direccion || "No disponible";
  const servicios = quote.TiposServicioCita || "No especificado";
  const estado = quote.EstadoDescripcion || "Desconocido";

  // ✅ Formatear fecha y hora correctamente
  let formattedDate = "Fecha no disponible";
  let formattedTime = "Hora no disponible";

  if (quote.Fecha && quote.Hora) {
    try {
      const baseDate = new Date(quote.Fecha); // ISO con zona horaria
      const [hours, minutes, seconds] = quote.Hora.split(":").map(Number);

      baseDate.setHours(hours);
      baseDate.setMinutes(minutes);
      baseDate.setSeconds(seconds || 0);

      formattedDate = baseDate.toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });

      formattedTime = baseDate.toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
    } catch (error) {
      console.warn("Error al formatear fecha/hora:", error);
    }
  }

  // Colores de estado
  const estadoColor =
    estado === "En proceso"
      ? "bg-blue-200 text-blue-800"
      : estado === "Completada" || estado === "Finalizado"
        ? "bg-green-200 text-green-800"
        : estado === "Rechazada" || estado === "Cancelada" || estado === "Inactivo"
          ? "bg-red-200 text-red-800"
          : estado === "Aceptada" || estado === "Activo"
            ? "bg-yellow-200 text-yellow-800"
            : estado === "Pendiente"
              ? "bg-orange-200 text-orange-800"
              : "bg-gray-200 text-gray-800";

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
      {/* Imagen */}
      <div className="w-full md:w-1/3">
        <img src={servicio1} alt="Servicio" className="w-full h-full object-cover" />
      </div>

      {/* Contenido */}
      <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
          <div>
            <h3 className="font-semibold text-lg text-black">{servicios}</h3>
            <span className={`inline-block text-xl px-2 py-1 rounded-full mt-1 ${estadoColor}`}>
              {estado}
            </span>
          </div>
        </div>

        {/* Información */}
        <div className="bg-gray-200 p-3 rounded text-base">
          {rol === "cliente" && (
            <p className={tecnicoNombre === "No asignado" ? "text-red-500" : "text-black"}>
              <strong>Técnico:</strong> {tecnicoNombre}
            </p>
          )}
          {rol === "admin" && (
            <>
              <p className="text-black">
                <strong>Solicitante:</strong> {clienteNombre}
              </p>
              <p className={tecnicoNombre === "No asignado" ? "text-red-500" : "text-black"}>
                <strong>Técnico:</strong> {tecnicoNombre}
              </p>
            </>
          )}
          {rol === "tecnico" && (
            <p className="text-black">
              <strong>Solicitante:</strong> {clienteNombre}
            </p>
          )}

          <p className="text-black">
            <strong>Dirección:</strong> {direccion}
          </p>
          <p className="text-black">
            <strong>Fecha:</strong> {formattedDate}
          </p>
          <p className="text-black">
            <strong>Hora:</strong> {formattedTime}
          </p>
        </div>

        {/* Botones */}
        <div className="flex flex-wrap gap-3 mt-4">
          {rol === "cliente" && estado === "Pendiente" && accionesVisibles && (
            <>
              <button
                onClick={() => setIsAcceptModalOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Aceptar
              </button>
              <button
                onClick={() => setIsRejectModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Rechazar
              </button>
            </>
          )}

          <button
            onClick={() => setIsViewMoreModalOpen(true)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            Ver más
          </button>

          {(rol === "admin" || rol === "tecnico") && (
            <>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Editar cotización
              </button>
            </>
          )}

        </div>
      </div>

      {/* Modales */}
      <Modal isOpen={isAcceptModalOpen} onClose={() => setIsAcceptModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4 text-black">Aceptar cotización</h2>
        <p className="text-black">¿Confirmas que deseas aceptar esta cotización?</p>
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => {
              onAccept?.(quote.IdCotizacion);
              setIsAcceptModalOpen(false);
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Confirmar
          </button>
          <button
            onClick={() => setIsAcceptModalOpen(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </Modal>


      <Modal isOpen={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4 text-black">Rechazar cotización</h2>
        <p className="text-black">¿Confirmas que deseas rechazar esta cotización?</p>
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => {
              onReject?.(quote.IdCotizacion);
              setIsRejectModalOpen(false);
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Confirmar
          </button>
          <button
            onClick={() => setIsRejectModalOpen(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </Modal>


      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4 text-black">Editar cotización</h2>
        <p className="text-black">Aquí irá el formulario de edición de la cotización.</p>
      </Modal>

      <Modal isOpen={isViewMoreModalOpen} onClose={() => setIsViewMoreModalOpen(false)}>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Detalles de la Cotización</h2>
            <div className="w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
          </div>

          {/* Content Grid */}
          <div className="grid gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Diagnóstico */}
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-blue-500">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="font-semibold text-gray-800">Diagnóstico</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{quote.DiagnosticoDescripcion}</p>
              </div>

              {/* Garantía */}
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-green-500">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-semibold text-gray-800">Garantía</h3>
                </div>
                <p className="text-gray-700">{quote.Garantia || "No especificada"}</p>
              </div>

              {/* Observaciones */}
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-yellow-500">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <h3 className="font-semibold text-gray-800">Observaciones</h3>
                </div>
                <p className="text-gray-700">{quote.Observaciones || "Sin observaciones adicionales"}</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Materiales */}
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-purple-500">
                <div className="flex items-center mb-4">
                  <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <h3 className="font-semibold text-gray-800">Materiales</h3>
                </div>
                
                {(() => {
                  try {
                    const materialesArray = JSON.parse(quote.Materiales || '[]');
                    if (materialesArray.length === 0) {
                      return (
                        <div className="text-center py-8">
                          <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                          </svg>
                          <p className="text-gray-500 italic">No hay materiales registrados</p>
                        </div>
                      );
                    }
                    
                    return (
                      <div className="space-y-3">
                        {materialesArray.map((material, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-gray-800 capitalize">{material.nombre}</h4>
                              <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded-full">
                                ${parseFloat(material.precio || 0).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>Cantidad: <strong>{material.cantidad}</strong></span>
                              <span>Unidad: <strong>{material.umedida || 'N/A'}</strong></span>
                            </div>
                            <div className="mt-2 pt-2 border-t border-gray-200">
                              <span className="text-sm font-medium text-gray-700">
                                Subtotal: ${(parseFloat(material.cantidad || 0) * parseFloat(material.precio || 0)).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  } catch (e) {
                    return (
                      <div className="text-center py-8">
                        <svg className="w-12 h-12 text-red-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-red-500">Error al cargar materiales</p>
                      </div>
                    );
                  }
                })()}
              </div>

              {/* Resumen de Costos */}
               <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-4 text-white shadow-lg">
                <h3 className="font-semibold mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  Resumen de Costos
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Materiales:</span>
                    <span className="font-medium">${parseFloat(quote.CostoMateriales || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mano de obra:</span>
                    <span className="font-medium">${parseFloat(quote.CostoManoObra || 0).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-white/30 pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>${parseFloat(quote.PrecioTotal || 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsViewMoreModalOpen(false)}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Cerrar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QuoteCard;
