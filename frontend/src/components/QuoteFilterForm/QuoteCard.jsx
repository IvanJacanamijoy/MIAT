import { useState } from "react";
import servicio1 from "../../assets/images/servicecarousel/servicio_1.png";
import Modal from "../Common/Modal";

const QuoteCard = ({ quote, rol, onAccept, onReject, onEdit, onComplete, onViewMore }) => {
  const [accionesVisibles, setAccionesVisibles] = useState(true);

  // Estados de modales
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
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
              <button
                onClick={() => setIsCompleteModalOpen(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Completar servicio
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modales */}
      <Modal isOpen={isAcceptModalOpen} onClose={() => setIsAcceptModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4">Aceptar cotización</h2>
        <p>¿Confirmas que deseas aceptar esta cotización?</p>
      </Modal>

      <Modal isOpen={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4 text-black">Rechazar cotización</h2>
        <p className="text-black">¿Confirmas que deseas rechazar esta cotización?</p>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4 text-black">Editar cotización</h2>
        <p className="text-black">Aquí irá el formulario de edición de la cotización.</p>
      </Modal>

      <Modal isOpen={isCompleteModalOpen} onClose={() => setIsCompleteModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4 text-black">Completar servicio</h2>
        <p className="text-black">¿Deseas marcar este servicio como completado?</p>
      </Modal>

      <Modal isOpen={isViewMoreModalOpen} onClose={() => setIsViewMoreModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4 text-black">Detalles de la cotización</h2>
        <p className="text-black"><strong>Diagnóstico:</strong> {quote.DiagnosticoDescripcion}</p>
        <p className="text-black"><strong>Materiales:</strong> {quote.Materiales}</p>
        <p className="text-black"><strong>Medidas:</strong> {quote.Medidas}</p>
        <p className="text-black"><strong>Garantía:</strong> {quote.Garantia}</p>
        <p className="text-black"><strong>Observaciones:</strong> {quote.Observaciones}</p>
      </Modal>
    </div>
  );
};

export default QuoteCard;
