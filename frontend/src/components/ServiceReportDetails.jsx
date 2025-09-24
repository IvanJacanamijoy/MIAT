import React from "react";

const ServiceReportDetail = ({ servicio }) => {
  if (!servicio) return <p className="text-center text-gray-500">No hay datos disponibles.</p>;

  const clienteNombre = `${servicio.ClienteNombres || ''} ${servicio.ClienteApellidos || ''}`.trim() || 'No disponible';
  const tecnicoNombre = `${servicio.TecnicoNombres || ''} ${servicio.TecnicoApellidos || ''}`.trim() || 'No disponible';
  
  const fecha = servicio.FechaServicio ? new Date(servicio.FechaServicio).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }) : 'No disponible';

  const horaInicial = servicio.HoraInicial?.slice(0, 5) || "No registrada";
  const horaFinal = servicio.HoraFinal?.slice(0, 5) || "No registrada";

  // Función para parsear materiales
  const parseMateriales = (materialesString) => {
    if (!materialesString) return [];
    try {
      const materiales = JSON.parse(materialesString);
      return Array.isArray(materiales) ? materiales : [];
    } catch (error) {
      return [];
    }
  };

  const materiales = parseMateriales(servicio.Materiales);

  // Función para formatear valores monetarios de forma segura
  const formatCurrency = (value) => {
    const numValue = Number(value);
    return isNaN(numValue) || numValue === 0 ? 'No especificado' : `$${numValue.toLocaleString()}`;
  };

  // Función para obtener valores seguros
  const getSafeValue = (value, defaultValue = 'No especificado') => {
    return value && value.toString().trim() !== '' ? value : defaultValue;
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 max-w-6xl mx-auto rounded-xl shadow-lg">
      {/* Header del informe */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl mb-6 shadow-lg">
        <div className="flex items-center gap-3">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
          </svg>
          <div>
            <h2 className="text-2xl font-bold">Informe Completo del Servicio</h2>
            <p className="text-blue-100 text-sm">Reporte detallado de la intervención técnica</p>
          </div>
        </div>
      </div>

      {/* Información del cliente y técnico */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
            </svg>
            <h3 className="text-lg font-semibold text-green-800">Información del Cliente</h3>
          </div>
          <div className="space-y-2">
            <p className="text-green-700"><strong>Nombre:</strong> {clienteNombre}</p>
            <p className="text-green-700"><strong>Identificación:</strong> {getSafeValue(servicio.ClienteIdentificacion)}</p>
            <p className="text-green-700"><strong>Dirección:</strong> {getSafeValue(servicio.DireccionServicio)}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,15C12.81,15 13.5,14.7 14.11,14.11C14.7,13.5 15,12.81 15,12C15,11.19 14.7,10.5 14.11,9.89C13.5,9.3 12.81,9 12,9C11.19,9 10.5,9.3 9.89,9.89C9.3,10.5 9,11.19 9,12C9,12.81 9.3,13.5 9.89,14.11C10.5,14.7 11.19,15 12,15M12,2C14.21,2 16.21,2.81 17.78,4.39C19.36,5.96 20.17,7.96 20.17,10.17C20.17,12.54 19.5,14.69 18.17,16.5C16.84,18.31 15.17,19.6 13.15,20.35C12.58,20.53 12,20.53 11.42,20.35C9.4,19.6 7.73,18.31 6.4,16.5C5.07,14.69 4.4,12.54 4.4,10.17C4.4,7.96 5.21,5.96 6.78,4.39C8.36,2.81 10.36,2 12.58,2H12Z" />
            </svg>
            <h3 className="text-lg font-semibold text-purple-800">Información del Técnico</h3>
          </div>
          <div className="space-y-2">
            <p className="text-purple-700"><strong>Técnico:</strong> {tecnicoNombre}</p>
            <p className="text-purple-700"><strong>Fecha:</strong> {fecha}</p>
            <p className="text-purple-700"><strong>Horario:</strong> {horaInicial} - {horaFinal}</p>
          </div>
        </div>
      </div>

      {/* Detalles del servicio */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,19H5V5H19V19Z" />
            </svg>
            <h3 className="text-lg font-semibold text-blue-800">Detalles del Servicio</h3>
          </div>
          <div className="space-y-3">
            <p className="text-blue-700"><strong>Tipo:</strong> {getSafeValue(servicio.TiposServicio)}</p>
            <p className="text-blue-700"><strong>Estado:</strong> {getSafeValue(servicio.EstadoServicioDescripcion)}</p>
            <p className="text-blue-700"><strong>Descripción:</strong> {getSafeValue(servicio.Descripcion)}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9Z" />
            </svg>
            <h3 className="text-lg font-semibold text-orange-800">Diagnóstico</h3>
          </div>
          <div className="space-y-3">
            <p className="text-orange-700"><strong>Diagnóstico:</strong> {getSafeValue(servicio.DiagnosticoDescripcion)}</p>
            <p className="text-orange-700"><strong>Medidas tomadas:</strong> {getSafeValue(servicio.Medidas)}</p>
          </div>
        </div>
      </div>

      {/* Materiales utilizados */}
      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl border border-indigo-200 shadow-md mb-6">
        <div className="flex items-center gap-3 mb-4">
          <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
          </svg>
          <h3 className="text-lg font-semibold text-indigo-800">Materiales Utilizados</h3>
        </div>
        
        {materiales.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {materiales.map((material, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-indigo-200 shadow-sm">
                <h4 className="font-semibold text-indigo-800 capitalize mb-2">{material.nombre}</h4>
                <div className="space-y-1 text-sm text-indigo-700">
                  <p><strong>Cantidad:</strong> {Number(material.cantidad).toLocaleString()}</p>
                  <p><strong>Unidad:</strong> {material.umedida}</p>
                  <p><strong>Precio:</strong> ${Number(material.precio).toLocaleString()}</p>
                  <p className="font-semibold text-indigo-800">
                    <strong>Subtotal:</strong> ${(Number(material.cantidad) * Number(material.precio)).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-indigo-600 italic">No se especificaron materiales o formato no válido</p>
        )}
      </div>

      {/* Garantía y Observaciones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl border border-teal-200 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.2C16,16.8 15.4,17.3 14.8,17.3H9.2C8.6,17.3 8,16.8 8,16.2V12.7C8,12.1 8.6,11.5 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z" />
            </svg>
            <h3 className="text-lg font-semibold text-teal-800">Garantía</h3>
          </div>
          <p className="text-teal-700">{getSafeValue(servicio.Garantia)}</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9,5V9H15V5H9M9,19H15V15H9V19M9,14H15V10H9V14M4,9V5H8V9H4M4,19H8V15H4V19M4,14H8V10H4V14M19,5V9H15V5H19M19,19H15V15H19V19M19,14H15V10H19V14Z" />
            </svg>
            <h3 className="text-lg font-semibold text-amber-800">Observaciones</h3>
          </div>
          <p className="text-amber-700">{getSafeValue(servicio.Observaciones)}</p>
        </div>
      </div>

      {/* Resumen de costos */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg mb-6">
        <div className="flex items-center gap-3 mb-4">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z" />
          </svg>
          <h3 className="text-xl font-bold">Resumen de Costos</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <p className="text-red-100 text-sm">Materiales</p>
            <p className="text-2xl font-bold">{formatCurrency(servicio.CostoMateriales)}</p>
          </div>
          <div className="bg-white bg-opacity-20 p-4 rounded-lg">
            <p className="text-red-100 text-sm">Mano de Obra</p>
            <p className="text-2xl font-bold">{formatCurrency(servicio.CostoManoObra)}</p>
          </div>
          <div className="bg-white bg-opacity-30 p-4 rounded-lg border-2 border-white border-opacity-50">
            <p className="text-red-100 text-sm">Total del Servicio</p>
            <p className="text-3xl font-bold">{formatCurrency(servicio.PrecioTotal)}</p>
          </div>
        </div>
      </div>

      {/* Evidencia fotográfica */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-800">Evidencia Fotográfica</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h4 className="font-semibold mb-3 text-gray-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1H5C3.89,1 3,1.89 3,3V21A2,2 0 0,0 5,23H19A2,2 0 0,0 21,21V9M19,9H14V4H5V21H19V9Z" />
              </svg>
              Antes del servicio
            </h4>
            {servicio.FotosAntes ? (
              <img
                src={`/uploads/${servicio.FotosAntes}`}
                alt="Foto antes del servicio"
                className="rounded-lg shadow-md w-full h-64 object-cover border border-gray-200"
              />
            ) : (
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                <p className="text-gray-500">No hay foto disponible</p>
              </div>
            )}
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h4 className="font-semibold mb-3 text-gray-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
              </svg>
              Después del servicio
            </h4>
            {servicio.FotosDespues ? (
              <img
                src={`/uploads/${servicio.FotosDespues}`}
                alt="Foto después del servicio"
                className="rounded-lg shadow-md w-full h-64 object-cover border border-gray-200"
              />
            ) : (
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                <p className="text-gray-500">No hay foto disponible</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceReportDetail;
