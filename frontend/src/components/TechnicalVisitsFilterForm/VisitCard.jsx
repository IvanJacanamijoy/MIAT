import { useState } from "react";
import Modal from "../../components/common/Modal";
import AssignTechnicianForm from "./AssignTechnicianForm";
import servicio1 from "../../assets/images/servicecarousel/servicio_1.png";

const VisitCard = ({ visit, rol, onCancel, onReprogram, onAssign }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const visitDateTime = new Date(`${visit.fecha}T${visit.hora}`);
  const now = new Date();
  const diffInHours = (visitDateTime - now) / (1000 * 60 * 60);
  const canModify = diffInHours >= 6;

  const handleOpenModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType("");
  };

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
            <h3 className="font-semibold text-lg text-black">
              Nombre del Servicio
            </h3>
            <span
              className={`inline-block text-xl px-2 py-1 rounded-full mt-1
                ${
                  visit.estado === "En proceso"
                    ? "bg-blue-200 text-blue-800"
                    : visit.estado === "Terminada"
                    ? "bg-green-200 text-green-800"
                    : visit.estado === "Cancelada"
                    ? "bg-red-200 text-red-800"
                    : visit.estado === "Pendiente"
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
            <strong>Fecha:</strong> {visit.Fecha}
          </p>
          <p className="text-black">
            <strong>Hora:</strong> {visit.Hora}
          </p>
          <p className="text-black">
            <strong>Solicitante:</strong> {visit.ClienteNombres + ' ' + visit.ClienteApellidos}
          </p>
          <p className="text-red-500">
            <strong>Técnico:</strong> {visit.TecnicoNombres && visit.TecnicoApellidos  ? `${visit.TecnicoNombres} ${visit.TecnicoApellidos}` : "Por asignar"}
          </p>
        </div>

        {/* Botones */}
        <div className="flex flex-wrap gap-3 mt-4">
          {(rol === "admin" || rol === "usuario") && (
            <>
              <button
                className={`px-4 py-2 rounded font-bold ${
                  canModify
                    ? "bg-gray-600 hover:bg-red-500 text-white"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
                disabled={!canModify}
                onClick={() => onCancel?.(visit.id)}
              >
                Cancelar
              </button>

              <button
                className={`px-4 py-2 rounded font-bold ${
                  canModify
                    ? "bg-red-500 hover:bg-green-500 text-white"
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
              className="px-4 py-2 rounded font-bold bg-blue-600 hover:bg-blue-900 text-white"
              onClick={() =>
                handleOpenModal(visit.tecnico ? "reasignar" : "asignar")
              }
            >
              {visit.tecnico ? "Reasignar técnico" : "Asignar técnico"}
            </button>
          )}
        </div>
      </div>

      {/* Modal de asignación/reasignación */}
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <div className="p-4">
          <AssignTechnicianForm
            currentVisit={visit}
            technicians={[
              { id: "1", nombre: "Técnico A" },
              { id: "2", nombre: "Técnico B" },
            ]}
            onSubmit={(updatedVisit) => {
              onAssign?.(updatedVisit); //
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
