import { useState } from "react";
import Modal from "../../components/common/Modal"; // Asegúrate de que la ruta sea correcta
import AssignTechnicianForm from "./AssignTechnicianForm"; // Asegúrate de que la ruta sea correcta
import servicio1 from "../../assets/images/servicecarousel/servicio_1.png"; // Asegúrate de que la ruta sea correcta

const VisitCard = ({ visit, rol, onCancel, onReprogram, onAssign }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  // Safely construct visitDateTime
  let visitDateTime;
  // Extraer solo la parte de la fecha de visit.Fecha (YYYY-MM-DD)
  // visit.Fecha es "2024-07-01T05:00:00.000Z", queremos "2024-07-01"
  const datePart = visit.Fecha ? visit.Fecha.split('T')[0] : '';
  // Usar la hora de visit.Hora (HH:MM:SS), que se asume es la hora local
  const timePart = visit.Hora || '';

  if (datePart && timePart) {
    try {
      // Combinar la parte de la fecha y la parte de la hora.
      // Al no incluir 'Z' o un offset de zona horaria, new Date() interpretará
      // esta cadena en la zona horaria local del navegador, lo que es lo deseado.
      visitDateTime = new Date(`${datePart}T${timePart}`);
      // Check if the date is actually valid after parsing
      if (isNaN(visitDateTime.getTime())) {
        console.error("Invalid Date parsed for visit:", visit);
        visitDateTime = null; // Set to null if invalid
      }
    } catch (e) {
      console.error("Error parsing date for visit:", visit, e);
      visitDateTime = null; // Set to null if an error occurs during parsing
    }
  } else {
    visitDateTime = null; // Set to null if Fecha or Hora are missing
  }

  const now = new Date();
  // Only calculate diffInHours and canModify if visitDateTime is valid
  const diffInHours = visitDateTime ? (visitDateTime - now) / (1000 * 60 * 60) : -Infinity; // If no valid date, cannot modify
  const canModify = diffInHours >= 6; // Lógica para modificar si faltan al menos 6 horas

  // Formatear la fecha para la visualización
  const formattedDate = visitDateTime && !isNaN(visitDateTime.getTime())
    ? visitDateTime.toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Fecha no disponible';

  // Formatear la hora para la visualización
  // La hora se extrae del objeto Date completo, que ahora se construye en la zona horaria local
  const formattedTime = visitDateTime && !isNaN(visitDateTime.getTime())
    ? visitDateTime.toLocaleTimeString('es-CO', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true // Muestra AM/PM
      })
    : 'Hora no disponible';

  const handleOpenModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType("");
  };

  // Determinar el nombre completo del cliente
  const clienteNombreCompleto = visit.usuario?.nombre || (visit.ClienteNombres && visit.ClienteApellidos ? `${visit.ClienteNombres} ${visit.ClienteApellidos}` : 'Desconocido');

  // Determinar el nombre completo del técnico
  const tecnicoNombreCompleto = visit.tecnico?.nombre || (visit.TecnicoNombres && visit.TecnicoApellidos ? `${visit.TecnicoNombres} ${visit.TecnicoApellidos}` : 'Por asignar');


  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
      <div className="w-full md:w-1/3">
        <img
          src={servicio1}
          alt="Visita técnica"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
          <div>
            {/* Asumiendo que `visit.TiposServicioCita` es el nombre del servicio o una lista */}
            <h3 className="font-semibold text-lg text-black">
              {visit.TiposServicioCita || "Servicio General"}
            </h3>
            <span
              className={`inline-block text-xl px-2 py-1 rounded-full mt-1
                ${
                  visit.estado === "En proceso"
                    ? "bg-blue-200 text-blue-800"
                    : visit.estado === "Finalizado" // Usar "Finalizado" si ese es el valor de la base de datos
                    ? "bg-green-200 text-green-800"
                    : visit.estado === "Inactivo" // Usar "Inactivo" si ese es el valor de la base de datos para cancelada
                    ? "bg-red-200 text-red-800"
                    : visit.estado === "Activo" // Usar "Activo" si ese es el valor de la base de datos para pendiente
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-gray-200 text-gray-800"
                }
              `}
            >
              {visit.estado || "Pendiente"}
            </span>
          </div>
        </div>

        {/* Información */}
        <div className="bg-gray-200 p-3 rounded text-base">
          <p className="text-black">
            <strong>Dirección:</strong> {visit.Direccion}
          </p>
          <p className="text-black">
            <strong>Fecha:</strong> {formattedDate}
          </p>
          <p className="text-black">
            <strong>Hora:</strong> {formattedTime}
          </p>
          <p className="text-black">
            <strong>Solicitante:</strong> {clienteNombreCompleto}
          </p>
          <p className="text-red-500">
            <strong>Técnico:</strong> {tecnicoNombreCompleto}
          </p>
        </div>

        {/* Botones */}
        <div className="flex flex-wrap gap-3 mt-4">
          {(rol === "admin" || rol === "usuario") && (
            <>
              <button
                className={`px-4 py-2 rounded font-bold ${
                  canModify
                    ? "bg-red-500 hover:bg-red-700 text-white cursor-pointer"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
                disabled={!canModify}
                onClick={() => onCancel?.(visit.IdCita)}
              >
                Cancelar
              </button>

              <button
                className={`px-4 py-2 rounded font-bold ${
                  canModify
                    ? "bg-blue-500 hover:bg-blue-700 cursor-pointer text-white"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
                disabled={!canModify}
                onClick={() => onReprogram?.(visit)}
              >
                Reprogramar
              </button>
            </>
          )}

          {rol === "admin" && (
            <button
              className="px-4 py-2 rounded font-bold bg-blue-500 hover:bg-blue-700 cursor-pointer text-white"
              onClick={() =>
                handleOpenModal(visit.IdTecnico ? "reasignar" : "asignar")
              }
            >
              {visit.IdTecnico ? "Reasignar técnico" : "Asignar técnico"}
            </button>
          )}
        </div>
      </div>

      {/* Modal de asignación/reasignación */}
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <div className="p-4">
          <AssignTechnicianForm
            currentVisit={visit}
            // Asegúrate de pasar la lista real de técnicos desde el componente padre
            // Por ahora, se mantienen los datos de ejemplo, pero deberías pasar `tecnicosOptions`
            // desde VisitScheduler a VisitCard si necesitas esto aquí.
            technicians={[
              { IdUsuario: 1, Nombres: "Técnico A" }, // Ejemplo: usar IdUsuario y Nombres
              { IdUsuario: 2, Nombres: "Técnico B" },
            ]}
            onSubmit={(updatedVisit) => {
              onAssign?.(updatedVisit);
              handleCloseModal();
            }}
            onCancel={handleCloseModal}
          />
        </div>
      </Modal>
    </div>
  );
};

export default VisitCard;
