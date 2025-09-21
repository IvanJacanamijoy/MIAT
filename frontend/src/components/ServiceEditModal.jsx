import { useState, useEffect } from "react";
import { X, Save, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";
import { updateServicioApi } from "../service/services";
import { useAuth } from "../context/AuthContext";

const ServiceEditModal = ({ servicio, isOpen, onClose, onUpdate }) => {
  const { authToken } = useAuth();
  const [formData, setFormData] = useState({
    Descripcion: "",
    HoraInicial: "",
    HoraFinal: "",
    Observaciones: "",
    Materiales: "",
    Garantia: "",
    CostoMateriales: "",
    CostoManoObra: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (servicio && isOpen) {
      setFormData({
        Descripcion: servicio.Descripcion || "",
        HoraInicial: servicio.HoraInicial || "",
        HoraFinal: servicio.HoraFinal || "",
        Observaciones: servicio.Observaciones || "",
        Materiales: servicio.Materiales || "",
        Garantia: servicio.Garantia || "",
        CostoMateriales: servicio.CostoMateriales || "",
        CostoManoObra: servicio.CostoManoObra || ""
      });
      setErrors({});
    }
  }, [servicio, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.Descripcion.trim()) {
      newErrors.Descripcion = "La descripción es obligatoria";
    }
    
    if (!formData.HoraInicial) {
      newErrors.HoraInicial = "La hora inicial es obligatoria";
    }
    
    if (!formData.HoraFinal) {
      newErrors.HoraFinal = "La hora final es obligatoria";
    }
    
    if (formData.HoraInicial && formData.HoraFinal && formData.HoraInicial >= formData.HoraFinal) {
      newErrors.HoraFinal = "La hora final debe ser posterior a la hora inicial";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Por favor, corrige los errores en el formulario");
      return;
    }

    try {
      setIsLoading(true);
      
      // Preparar datos para enviar
      const dataToUpdate = {
        ...formData,
        CostoMateriales: formData.CostoMateriales ? parseFloat(formData.CostoMateriales) : null,
        CostoManoObra: formData.CostoManoObra ? parseFloat(formData.CostoManoObra) : null
      };

      await updateServicioApi(authToken, servicio.IdServicio, dataToUpdate);
      
      toast.success("Servicio actualizado exitosamente");
      onUpdate(); // Recargar la lista de servicios
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error("Error al actualizar servicio:", error);
      toast.error("Error al actualizar el servicio. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Editar Servicio #{servicio?.IdServicio}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción del Servicio *
            </label>
            <textarea
              name="Descripcion"
              value={formData.Descripcion}
              onChange={handleInputChange}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.Descripcion ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe el trabajo realizado..."
            />
            {errors.Descripcion && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.Descripcion}
              </p>
            )}
          </div>

          {/* Horarios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hora Inicial *
              </label>
              <input
                type="time"
                name="HoraInicial"
                value={formData.HoraInicial}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.HoraInicial ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.HoraInicial && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.HoraInicial}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hora Final *
              </label>
              <input
                type="time"
                name="HoraFinal"
                value={formData.HoraFinal}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.HoraFinal ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.HoraFinal && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.HoraFinal}
                </p>
              )}
            </div>
          </div>

          {/* Materiales */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Materiales Utilizados
            </label>
            <textarea
              name="Materiales"
              value={formData.Materiales}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Lista de materiales utilizados..."
            />
          </div>

          {/* Garantía */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Garantía
            </label>
            <input
              type="text"
              name="Garantia"
              value={formData.Garantia}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: 12 meses, 6 meses, etc."
            />
          </div>

          {/* Costos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Costo de Materiales
              </label>
              <input
                type="number"
                name="CostoMateriales"
                value={formData.CostoMateriales}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Costo de Mano de Obra
              </label>
              <input
                type="number"
                name="CostoManoObra"
                value={formData.CostoManoObra}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Observaciones */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Observaciones
            </label>
            <textarea
              name="Observaciones"
              value={formData.Observaciones}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Observaciones adicionales del servicio..."
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceEditModal;