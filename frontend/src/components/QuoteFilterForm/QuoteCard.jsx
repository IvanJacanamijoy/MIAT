import { useState } from "react";
import servicio1 from "../../assets/images/servicecarousel/servicio_1.png";
import Modal from "../common/Modal"; // Ajusta la ruta según dónde tengas el componente Modal

const QuoteCard = ({ quote, rol, onAccept, onReject, onEdit, onComplete, onViewMore }) => {
  const [accionesVisibles, setAccionesVisibles] = useState(true);

  // Estados de modales
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isViewMoreModalOpen, setIsViewMoreModalOpen] = useState(false);

  // Extraer datos de la visita técnica
  const visita = quote.visitaTecnica || {};
  const clienteNombre = visita.clienteNombre || "No disponible";
  const direccion = visita.direccion || "No disponible";
  const tecnico = visita.tecnicoNombre || "No asignado";
  const servicios = Array.isArray(visita.servicio)
    ? visita.servicio.join(", ")
    : visita.servicio || "No especificado";

  // Formatear fecha y hora
  let visitDateTime = null;
  if (visita.fecha && visita.hora) {
    const datePart = visita.fecha.split("T")[0] || visita.fecha;
    const timePart = visita.hora || "";
    const parsedDate = new Date(`${datePart}T${timePart}`);
    if (!isNaN(parsedDate.getTime())) {
      visitDateTime = parsedDate;
    }
  }

  const formattedDate = visitDateTime
    ? visitDateTime.toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })
    : "Fecha no disponible";

  const formattedTime = visitDateTime
    ? visitDateTime.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", hour12: true })
    : "Hora no disponible";

  // Estado de la cotización (puede venir como `status` o `estado`)
  const estado = quote.status || quote.estado || "Desconocido";

  // Colores de estado
  const estadoColor =
    estado === "En proceso"
      ? "bg-blue-200 text-blue-800"
      : estado === "Completada" || estado === "Finalizado"
      ? "bg-green-200 text-green-800"
      : estado === "Rechazada" || estado === "Inactivo"
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
            <p className={tecnico === "No asignado" ? "text-red-500" : "text-black"}>
              <strong>Técnico:</strong> {tecnico}
            </p>
          )}
          {rol === "admin" && (
            <>
              <p className="text-black">
                <strong>Solicitante:</strong> {clienteNombre}
              </p>
              <p className={tecnico === "No asignado" ? "text-red-500" : "text-black"}>
                <strong>Técnico:</strong> {tecnico}
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
        <h2 className="text-lg font-bold mb-4">Rechazar cotización</h2>
        <p>¿Confirmas que deseas rechazar esta cotización?</p>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4">Editar cotización</h2>
        <p>Aquí irá el formulario de edición de la cotización.</p>
      </Modal>

      <Modal isOpen={isCompleteModalOpen} onClose={() => setIsCompleteModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4">Completar servicio</h2>
        <p>¿Deseas marcar este servicio como completado?</p>
      </Modal>

      <Modal isOpen={isViewMoreModalOpen} onClose={() => setIsViewMoreModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4">Detalles de la cotización</h2>
        <p>Aquí se mostrarán más detalles de la cotización.</p>
      </Modal>
    </div>
  );
};

export default QuoteCard;
