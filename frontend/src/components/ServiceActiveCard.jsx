import { useState } from "react";
import { Camera, Upload, CheckCircle, Clock, User, MapPin, Calendar, CheckSquare, FileText, DollarSign, Shield, Wrench, Edit } from "lucide-react";
import PhotoUploadModal from "./PhotoUploadModal";
import ServiceEditModal from "./ServiceEditModal";
import { toast } from "react-toastify";
import { finalizarServicioApi } from "../service/services";
import { useAuth } from "../context/AuthContext";

const ServiceActiveCard = ({ servicio, onUpdate }) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isFinalizingService, setIsFinalizingService] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { authToken } = useAuth();

  // Datos del servicio
  const clienteNombre = `${servicio.ClienteNombres || ""} ${servicio.ClienteApellidos || ""}`.trim() || "No disponible";
  const tecnicoNombre = servicio.TecnicoNombres ? `${servicio.TecnicoNombres} ${servicio.TecnicoApellidos}` : "No asignado";
  const direccion = servicio.DireccionServicio || "No disponible";
  const servicios = servicio.TiposServicio || "No especificado";
  const estado = servicio.EstadoServicioDescripcion || "Desconocido";
  const descripcion = servicio.Descripcion || "No disponible";
  const observaciones = servicio.Observaciones || "Sin observaciones";
  const garantia = servicio.Garantia || "No especificada";
  const materiales = servicio.Materiales || "No especificados";
  const costoMateriales = servicio.CostoMateriales ? `$${parseFloat(servicio.CostoMateriales).toLocaleString('es-CO')}` : "No disponible";
  const costoManoObra = servicio.CostoManoObra ? `$${parseFloat(servicio.CostoManoObra).toLocaleString('es-CO')}` : "No disponible";
  const precioTotal = servicio.PrecioTotal ? `$${parseFloat(servicio.PrecioTotal).toLocaleString('es-CO')}` : "No disponible";
  const horaInicial = servicio.HoraInicial || "No disponible";
  const horaFinal = servicio.HoraFinal || "No disponible";

  let formattedDate = "Fecha no disponible";
  if (servicio.FechaServicio) {
    try {
      const fecha = new Date(servicio.FechaServicio);
      formattedDate = fecha.toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch (error) {
      console.warn("Error al formatear fecha:", error);
    }
  }

  const estadoColor = 
    estado === "En proceso" || estado === "Activo"
      ? "bg-blue-200 text-blue-800"
      : estado === "Pendiente"
        ? "bg-yellow-200 text-yellow-800"
        : "bg-gray-200 text-gray-800";

  const tieneTodasLasFotos = servicio.FotosAntes && servicio.FotosDespues;
  const tieneFotoAntes = servicio.FotosAntes;
  const tieneFotoDespues = servicio.FotosDespues;

  const handleUploadSuccess = () => {
    toast.success("Fotos subidas exitosamente");
    setShowUploadModal(false);
    onUpdate(); // Recargar la lista de servicios
  };

  // Validar que todos los datos estén completos para finalizar
  const validarDatosCompletos = () => {
    const errores = [];
    
    if (!servicio.Descripcion || servicio.Descripcion === "No disponible") errores.push("Descripción del servicio");
    if (!servicio.HoraInicial || servicio.HoraInicial === "No disponible") errores.push("Hora inicial");
    if (!servicio.HoraFinal || servicio.HoraFinal === "No disponible") errores.push("Hora final");
    if (!tieneFotoAntes) errores.push("Foto antes del servicio");
    if (!tieneFotoDespues) errores.push("Foto después del servicio");
    
    return errores;
  };

  const handleFinalizarServicio = async () => {
    const errores = validarDatosCompletos();
    
    if (errores.length > 0) {
      toast.error(`Faltan los siguientes datos para finalizar el servicio: ${errores.join(", ")}`);
      return;
    }

    try {
      setIsFinalizingService(true);
      await finalizarServicioApi(authToken, servicio.IdServicio, {
        fechaFinalizacion: new Date().toISOString(),
        observaciones: "Servicio finalizado desde la aplicación"
      });
      
      toast.success("Servicio finalizado exitosamente");
      onUpdate(); // Recargar la lista de servicios
    } catch (error) {
      console.error("Error al finalizar servicio:", error);
      toast.error("Error al finalizar el servicio. Inténtalo de nuevo.");
    } finally {
      setIsFinalizingService(false);
    }
  };

  const puedeFinalizarServicio = validarDatosCompletos().length === 0;

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="p-6">
          {/* Header con estado */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Servicio #{servicio.IdServicio}
              </h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${estadoColor}`}>
                {estado}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {tieneTodasLasFotos ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-1" />
                  <span className="text-sm font-medium">Fotos completas</span>
                </div>
              ) : (
                <div className="flex items-center text-orange-600">
                  <Clock className="w-5 h-5 mr-1" />
                  <span className="text-sm font-medium">Fotos pendientes</span>
                </div>
              )}
            </div>
          </div>

          {/* Descripción del servicio */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center text-gray-700 mb-2">
              <FileText className="w-4 h-4 mr-2" />
              <span className="text-sm font-semibold">Descripción:</span>
              {(!servicio.Descripcion || servicio.Descripcion === "No disponible") && (
                <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                  Requerido
                </span>
              )}
            </div>
            <p className={`text-sm ml-6 ${(!servicio.Descripcion || servicio.Descripcion === "No disponible") ? 'text-red-500 italic' : 'text-gray-600'}`}>
              {descripcion}
            </p>
          </div>

          {/* Información del servicio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <User className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  <strong>Cliente:</strong> {clienteNombre}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <User className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  <strong>Técnico:</strong> {tecnicoNombre}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  <strong>Horario:</strong> {horaInicial} - {horaFinal}
                </span>
                {((!servicio.HoraInicial || servicio.HoraInicial === "No disponible") || 
                  (!servicio.HoraFinal || servicio.HoraFinal === "No disponible")) && (
                  <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                    Requerido
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  <strong>Dirección:</strong> {direccion}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  <strong>Fecha:</strong> {formattedDate}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <Shield className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  <strong>Garantía:</strong> {garantia}
                </span>
              </div>
            </div>
          </div>

          {/* Servicios y materiales */}
          <div className="mb-4 space-y-2">
            <div className="flex items-start text-gray-600">
              <Wrench className="w-4 h-4 mr-2 mt-0.5" />
              <span className="text-sm">
                <strong>Servicios:</strong> {servicios}
              </span>
            </div>
            <div className="flex items-start text-gray-600">
              <FileText className="w-4 h-4 mr-2 mt-0.5" />
              <span className="text-sm">
                <strong>Materiales:</strong> {materiales}
              </span>
            </div>
          </div>

          {/* Información de costos - Expandible */}
          <div className="mb-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              <DollarSign className="w-4 h-4 mr-1" />
              {showDetails ? "Ocultar detalles de costos" : "Ver detalles de costos"}
            </button>
            
            {showDetails && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Costo materiales:</span>
                  <span className="font-medium">{costoMateriales}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Costo mano de obra:</span>
                  <span className="font-medium">{costoManoObra}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold border-t pt-2">
                  <span className="text-gray-800">Precio total:</span>
                  <span className="text-blue-600">{precioTotal}</span>
                </div>
              </div>
            )}
          </div>

          {/* Observaciones */}
          {observaciones && observaciones !== "Sin observaciones" && (
            <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center text-yellow-700 mb-2">
                <FileText className="w-4 h-4 mr-2" />
                <span className="text-sm font-semibold">Observaciones:</span>
              </div>
              <p className="text-sm text-yellow-600 ml-6">{observaciones}</p>
            </div>
          )}

          {/* Estado de las fotos */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Estado de las fotos:</h4>
            <div className="flex gap-4">
              <div className={`flex items-center ${tieneFotoAntes ? 'text-green-600' : 'text-red-500'}`}>
                <Camera className="w-4 h-4 mr-1" />
                <span className="text-sm">Foto Antes</span>
                {tieneFotoAntes ? (
                  <CheckCircle className="w-4 h-4 ml-1" />
                ) : (
                  <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                    Requerido
                  </span>
                )}
              </div>
              <div className={`flex items-center ${tieneFotoDespues ? 'text-green-600' : 'text-red-500'}`}>
                <Camera className="w-4 h-4 mr-1" />
                <span className="text-sm">Foto Después</span>
                {tieneFotoDespues ? (
                  <CheckCircle className="w-4 h-4 ml-1" />
                ) : (
                  <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                    Requerido
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div className="flex gap-2">
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Upload className="w-4 h-4 mr-2" />
                {tieneTodasLasFotos ? "Actualizar fotos" : "Subir fotos"}
              </button>

              <button
                onClick={() => setShowEditModal(true)}
                className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200"
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar Datos
              </button>
            </div>

            <button
              onClick={handleFinalizarServicio}
              disabled={!puedeFinalizarServicio || isFinalizingService}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                puedeFinalizarServicio && !isFinalizingService
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              title={!puedeFinalizarServicio ? `Faltan datos: ${validarDatosCompletos().join(", ")}` : "Finalizar servicio"}
            >
              <CheckSquare className="w-4 h-4 mr-2" />
              {isFinalizingService ? "Finalizando..." : "Finalizar Servicio"}
            </button>
          </div>
        </div>
      </div>

      {/* Modal para subir fotos */}
      {showUploadModal && (
        <PhotoUploadModal
          servicioId={servicio.IdServicio}
          onClose={() => setShowUploadModal(false)}
          onSuccess={handleUploadSuccess}
          existingPhotos={{
            fotoAntes: servicio.FotosAntes,
            fotoDespues: servicio.FotosDespues
          }}
        />
      )}

      {/* Modal para editar datos */}
      {showEditModal && (
        <ServiceEditModal
          servicio={servicio}
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};

export default ServiceActiveCard;