import React from 'react';
import { Eye, Download } from 'lucide-react';

/** Componente que muestra una tarjeta individual para un servicio.
 * se utiliza los props para recibir los datos de cada servicio.
 */

const ServiceCard = ({ service }) => {
  // Extraer datos del servicio
  const servicios = service.TiposServicio || service.title || "No especificado";
  const estado = service.EstadoServicioDescripcion || "Pendiente";
  const tecnicoNombre = service.TecnicoNombres 
    ? `${service.TecnicoNombres} ${service.TecnicoApellidos || ''}`.trim()
    : "No asignado";
  const direccion = service.DireccionServicio || service.direccion || "calle con carrera";
  const fecha = service.FechaServicio 
    ? new Date(service.FechaServicio).toLocaleDateString("es-CO")
    : "Fecha no disponible";
  const hora = service.Hora || "Hora no disponible";
  
  // Verificar si el servicio está finalizado
  const esServicioFinalizado = service.IdEstado === 4 || estado === "Finalizado";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Imagen del servicio */}
      <div className="relative">
        <img
          src={service.imageUrl || 'src/assets/images/servicecarousel/servicio_1.webp'}
          alt={`Imagen de ${servicios}`}
          className="w-full h-48 object-cover"
        />
        
        {/* Servicios en revisión - parte superior */}
        <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
          <p className="text-sm font-medium">{servicios}</p>
          <p className="text-xs text-gray-300">{estado}</p>
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4 bg-gray-100">
        {/* Información del técnico */}
        <div className="mb-3">
          <p className="text-sm font-semibold text-gray-800">Técnico: {tecnicoNombre}</p>
          <p className="text-sm text-gray-600">Dirección: {direccion}</p>
          <p className="text-sm text-gray-600">Fecha: {fecha}</p>
          <p className="text-sm text-gray-600">Hora: {hora}</p>
        </div>

        {/* Botones - solo visibles si el servicio está finalizado */}
        {esServicioFinalizado && (
          <div className="flex gap-2 mt-4">
            <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition-colors">
              <Eye size={16} />
              Ver Informe
            </button>
            <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition-colors">
              <Download size={16} />
              Descargar PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;