import { useState } from "react";
import servicio1 from "../assets/images/servicecarousel/servicio_1.png";
import Modal from "../components/Common/Modal";
import ServiceReportDetail from "./ServiceReportDetails";

const ServiceReportCard = ({ servicio, rol }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Datos del modelo unificado de servicios finalizados
  const clienteNombre = `${servicio.ClienteNombres || ""} ${servicio.ClienteApellidos || ""}`.trim() || "No disponible";
  const tecnicoNombre = servicio.TecnicoNombres ? `${servicio.TecnicoNombres} ${servicio.TecnicoApellidos}` : "No asignado";
  const direccion = servicio.DireccionServicio || "No disponible";
  const servicios = servicio.TiposServicio || "No especificado";
  const estado = servicio.EstadoServicioDescripcion || "Desconocido";

  let formattedDate = "Fecha no disponible";
  let formattedTime = "Hora no disponible";

  if (servicio.FechaServicio && servicio.HoraFinal) {
    try {
      const fecha = new Date(servicio.FechaServicio); // ← ya es un Date válido

      formattedDate = fecha.toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });

      // Usamos HoraFinal directamente
      const [hour, minute] = servicio.HoraFinal.split(":");
      fecha.setHours(parseInt(hour));
      fecha.setMinutes(parseInt(minute));

      formattedTime = fecha.toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
    } catch (error) {
      console.warn("Error al formatear fecha/hora:", error);
    }
  }


  const estadoColor =
    estado === "Finalizado"
      ? "bg-green-200 text-green-800"
      : estado === "Cancelada" || estado === "Rechazada"
        ? "bg-red-200 text-red-800"
        : "bg-gray-200 text-gray-800";

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
      {/* Imagen */}
      <div className="w-full md:w-1/3">
        <img src={servicio1} alt="Servicio" className="w-full h-full object-cover" />
      </div>

      {/* Contenido */}
      <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
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

        {/* Botón ver informe */}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            Ver Informe
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ServiceReportDetail servicio={servicio} />
      </Modal>
    </div>
  );
};

export default ServiceReportCard;
