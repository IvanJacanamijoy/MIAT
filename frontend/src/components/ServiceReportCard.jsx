import { useState } from "react";
import { Eye, Download } from "lucide-react";
import servicio1 from "../assets/images/servicecarousel/servicio_1.webp";
import Modal from "../components/Common/Modal";
import ServiceReportDetail from "./ServiceReportDetails";
import ServiceEditModal from "./ServiceEditModal";

const ServiceReportCard = ({ servicio, rol, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Función para generar y descargar PDF
  const handleDownloadPDF = async () => {
    try {
      // Importar jsPDF dinámicamente
      const { jsPDF } = await import('jspdf');
      
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      let yPosition = 30;

      // Función auxiliar para agregar texto con salto de línea automático
      const addText = (text, x, y, maxWidth = pageWidth - 2 * margin) => {
        const lines = doc.splitTextToSize(text, maxWidth);
        doc.text(lines, x, y);
        return y + (lines.length * 7);
      };

      // Función auxiliar para agregar título
      const addTitle = (title, y) => {
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text(title, margin, y);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        return y + 10;
      };

      // Datos del servicio
      const clienteNombre = `${servicio.ClienteNombres || ""} ${servicio.ClienteApellidos || ""}`.trim() || "No disponible";
      const tecnicoNombre = servicio.TecnicoNombres ? `${servicio.TecnicoNombres} ${servicio.TecnicoApellidos}` : "No asignado";
      const fecha = new Date(servicio.FechaServicio).toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const horaInicial = servicio.HoraInicial?.slice(0, 5) || "No registrada";
      const horaFinal = servicio.HoraFinal?.slice(0, 5) || "No registrada";

      // Título principal
      doc.setFontSize(18);
      doc.setFont(undefined, 'bold');
      doc.text('INFORME COMPLETO DEL SERVICIO', pageWidth / 2, yPosition, { align: 'center' });
      doc.setFont(undefined, 'normal');
      doc.setFontSize(10);
      yPosition += 20;

      // Información del cliente
      yPosition = addTitle('INFORMACIÓN DEL CLIENTE', yPosition);
      yPosition = addText(`Cliente: ${clienteNombre}`, margin, yPosition);
      yPosition = addText(`Identificación: ${servicio.ClienteIdentificacion}`, margin, yPosition);
      yPosition = addText(`Dirección: ${servicio.DireccionServicio}`, margin, yPosition);
      yPosition += 10;

      // Información del técnico
      yPosition = addTitle('INFORMACIÓN DEL TÉCNICO', yPosition);
      yPosition = addText(`Técnico: ${tecnicoNombre}`, margin, yPosition);
      yPosition = addText(`Fecha: ${fecha}`, margin, yPosition);
      yPosition = addText(`Horario: ${horaInicial} - ${horaFinal}`, margin, yPosition);
      yPosition += 10;

      // Detalles del servicio
      yPosition = addTitle('DETALLES DEL SERVICIO', yPosition);
      yPosition = addText(`Tipo: ${servicio.TiposServicio}`, margin, yPosition);
      yPosition = addText(`Estado: ${servicio.EstadoServicioDescripcion}`, margin, yPosition);
      yPosition = addText(`Descripción: ${servicio.Descripcion}`, margin, yPosition);
      yPosition += 10;

      // Diagnóstico
      yPosition = addTitle('DIAGNÓSTICO', yPosition);
      yPosition = addText(`Diagnóstico: ${servicio.DiagnosticoDescripcion}`, margin, yPosition);
      yPosition = addText(`Medidas tomadas: ${servicio.Medidas}`, margin, yPosition);
      yPosition += 10;

      // Materiales utilizados
      yPosition = addTitle('MATERIALES UTILIZADOS', yPosition);
      try {
        const materiales = JSON.parse(servicio.Materiales || '[]');
        if (materiales.length > 0) {
          materiales.forEach((material, index) => {
            const subtotal = Number(material.cantidad) * Number(material.precio);
            yPosition = addText(`${index + 1}. ${material.nombre}`, margin, yPosition);
            yPosition = addText(`   Cantidad: ${Number(material.cantidad).toLocaleString()} ${material.umedida}`, margin, yPosition);
            yPosition = addText(`   Precio: $${Number(material.precio).toLocaleString()}`, margin, yPosition);
            yPosition = addText(`   Subtotal: $${subtotal.toLocaleString()}`, margin, yPosition);
            yPosition += 5;
          });
        } else {
          yPosition = addText('No se especificaron materiales', margin, yPosition);
        }
      } catch (error) {
        yPosition = addText('Formato de materiales no válido', margin, yPosition);
      }
      yPosition += 10;

      // Garantía y Observaciones
      yPosition = addTitle('GARANTÍA', yPosition);
      yPosition = addText(`${servicio.Garantia}`, margin, yPosition);
      yPosition += 10;

      yPosition = addTitle('OBSERVACIONES', yPosition);
      yPosition = addText(`${servicio.Observaciones}`, margin, yPosition);
      yPosition += 10;

      // Resumen de costos
      yPosition = addTitle('RESUMEN DE COSTOS', yPosition);
      yPosition = addText(`Costo de materiales: $${Number(servicio.CostoMateriales).toLocaleString()}`, margin, yPosition);
      yPosition = addText(`Costo de mano de obra: $${Number(servicio.CostoManoObra).toLocaleString()}`, margin, yPosition);
      
      // Total destacado
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      yPosition = addText(`TOTAL DEL SERVICIO: $${Number(servicio.PrecioTotal).toLocaleString()}`, margin, yPosition + 5);

      // Generar nombre del archivo
      const fileName = `Informe_Servicio_${servicio.IdCita}_${clienteNombre.replace(/\s+/g, '_')}.pdf`;
      
      // Descargar el PDF
      doc.save(fileName);
      
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Error al generar el PDF. Por favor, intente nuevamente.');
    }
  };

  // Verificar si el servicio está finalizado para mostrar botones condicionales
  const esServicioFinalizado = servicio.IdEstado === 4;

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
        : estado === "Pendiente"
          ? "bg-yellow-200 text-yellow-800"
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

        {/* Botones ver informe, editar y descargar PDF - Solo mostrar Ver Informe y Descargar PDF si está finalizado */}
        <div className="flex justify-end gap-2 mt-4">
          {esServicioFinalizado && (
            <>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Ver Informe
              </button>
              <button
                onClick={() => handleDownloadPDF()}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Descargar PDF
              </button>
            </>
          )}
          {(rol === "admin" || rol === "tecnico") && (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
              </svg>
              Editar
            </button>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ServiceReportDetail servicio={servicio} />
      </Modal>

      <ServiceEditModal
        servicio={servicio}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={onUpdate}
      />
    </div>
  );
};

export default ServiceReportCard;
