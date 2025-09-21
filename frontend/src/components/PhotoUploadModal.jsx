import { useState, useRef } from "react";
import { X, Upload, Camera, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const PhotoUploadModal = ({ servicioId, onClose, onSuccess, existingPhotos = {} }) => {
  const { authToken } = useAuth();
  const [fotoAntes, setFotoAntes] = useState(null);
  const [fotoDespues, setFotoDespues] = useState(null);
  const [previewAntes, setPreviewAntes] = useState(null);
  const [previewDespues, setPreviewDespues] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  const fileInputAntesRef = useRef(null);
  const fileInputDespuesRef = useRef(null);

  const handleFileChange = (type, file) => {
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({
        ...prev,
        [type]: 'Solo se permiten archivos de imagen'
      }));
      return;
    }

    // Validar tamaño (5MB máximo)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        [type]: 'El archivo no debe superar los 5MB'
      }));
      return;
    }

    // Limpiar errores
    setErrors(prev => ({
      ...prev,
      [type]: null
    }));

    // Crear preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (type === 'antes') {
        setFotoAntes(file);
        setPreviewAntes(e.target.result);
      } else {
        setFotoDespues(file);
        setPreviewDespues(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!fotoAntes && !fotoDespues) {
      toast.error("Selecciona al menos una foto para subir");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      
      if (fotoAntes) {
        formData.append('fotoAntes', fotoAntes);
      }
      
      if (fotoDespues) {
        formData.append('fotoDespues', fotoDespues);
      }

      const response = await fetch(`http://localhost:3000/servicios/${servicioId}/upload-photos`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess();
      } else {
        throw new Error(data.message || 'Error al subir las fotos');
      }
    } catch (error) {
      console.error('Error al subir fotos:', error);
      toast.error(error.message || 'Error al subir las fotos');
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = (type) => {
    if (type === 'antes') {
      setFotoAntes(null);
      setPreviewAntes(null);
      if (fileInputAntesRef.current) {
        fileInputAntesRef.current.value = '';
      }
    } else {
      setFotoDespues(null);
      setPreviewDespues(null);
      if (fileInputDespuesRef.current) {
        fileInputDespuesRef.current.value = '';
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Subir Fotos del Servicio #{servicioId}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Foto Antes */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-700">Foto Antes</h3>
                {existingPhotos.fotoAntes && (
                  <div className="flex items-center text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Ya existe
                  </div>
                )}
              </div>

              {/* Upload area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                {previewAntes ? (
                  <div className="relative">
                    <img
                      src={previewAntes}
                      alt="Preview antes"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removePhoto('antes')}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : existingPhotos.fotoAntes ? (
                  <div className="relative">
                    <img
                      src={`http://localhost:3000/uploads/${existingPhotos.fotoAntes}`}
                      alt="Foto antes actual"
                      className="w-full h-48 object-cover rounded-lg opacity-75"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
                      <p className="text-white text-sm">Foto actual - Selecciona nueva para reemplazar</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto" />
                    <p className="text-gray-500">Selecciona la foto antes del servicio</p>
                  </div>
                )}

                <input
                  ref={fileInputAntesRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange('antes', e.target.files[0])}
                  className="hidden"
                />

                {!previewAntes && (
                  <button
                    onClick={() => fileInputAntesRef.current?.click()}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Upload className="w-4 h-4 inline mr-2" />
                    Seleccionar foto
                  </button>
                )}
              </div>

              {errors.antes && (
                <div className="flex items-center text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.antes}
                </div>
              )}
            </div>

            {/* Foto Después */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-700">Foto Después</h3>
                {existingPhotos.fotoDespues && (
                  <div className="flex items-center text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Ya existe
                  </div>
                )}
              </div>

              {/* Upload area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                {previewDespues ? (
                  <div className="relative">
                    <img
                      src={previewDespues}
                      alt="Preview después"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removePhoto('despues')}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : existingPhotos.fotoDespues ? (
                  <div className="relative">
                    <img
                      src={`http://localhost:3000/uploads/${existingPhotos.fotoDespues}`}
                      alt="Foto después actual"
                      className="w-full h-48 object-cover rounded-lg opacity-75"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
                      <p className="text-white text-sm">Foto actual - Selecciona nueva para reemplazar</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto" />
                    <p className="text-gray-500">Selecciona la foto después del servicio</p>
                  </div>
                )}

                <input
                  ref={fileInputDespuesRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange('despues', e.target.files[0])}
                  className="hidden"
                />

                {!previewDespues && (
                  <button
                    onClick={() => fileInputDespuesRef.current?.click()}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Upload className="w-4 h-4 inline mr-2" />
                    Seleccionar foto
                  </button>
                )}
              </div>

              {errors.despues && (
                <div className="flex items-center text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.despues}
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Información importante:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Solo se permiten archivos de imagen (JPG, PNG, etc.)</li>
                  <li>Tamaño máximo: 5MB por archivo</li>
                  <li>Puedes subir una o ambas fotos</li>
                  <li>Las fotos existentes se reemplazarán si seleccionas nuevas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={uploading}
          >
            Cancelar
          </button>
          <button
            onClick={handleUpload}
            disabled={uploading || (!fotoAntes && !fotoDespues)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Subiendo...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Subir fotos
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploadModal;