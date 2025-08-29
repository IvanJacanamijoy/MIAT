import { useState } from 'react';
import logomiat from "../../assets/images/navbar/logo_miat_rojo.png";
import { assignTechnicianToVisitApi } from "../../service/visitasTecnicas";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const AssignTechnicianForm = ({
  technicians = [],
  currentVisit,
  onSuccess,
  onCancel
}) => {
  const [selectedTechId, setSelectedTechId] = useState('');
  const [loading, setLoading] = useState(false);
  const { authToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTechId) {
      toast.warning('Debe seleccionar un técnico');
      return;
    }

    setLoading(true);
    try {
      await assignTechnicianToVisitApi(currentVisit.IdCita, parseInt(selectedTechId), authToken);
      toast.success('Técnico asignado con éxito');

      if (typeof onSuccess === 'function') {
        await onSuccess(); // Recarga visitas y cierra modal
      }
    } catch (error) {
      console.error('Asignación fallida:', error);
      toast.error('Error al asignar técnico');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-black space-y-4 p-4">
      <div className="flex flex-col items-center text-center mb-4">
        <img src={logomiat} alt="Logo Miat" className="w-20 h-auto mb-2" />
        <h2 className="text-xl font-bold">
          {currentVisit.tecnico ? 'Reasignar técnico' : 'Asignar técnico'}
        </h2>
      </div>

      <div>
        <label className="block font-bold mb-1">Selecciona un técnico:</label>
        <select
          name="tecnico"
          value={selectedTechId}
          onChange={e => setSelectedTechId(e.target.value)}
          required
          className="w-full p-2 border rounded"
          disabled={loading}
        >
          <option value="">Selecciona un técnico</option>
          {technicians.map(tech => (
            <option key={tech.IdUsuario} value={String(tech.IdUsuario)}>
              {tech.Nombres + " " + tech.Apellidos}
            </option>
          ))}
        </select>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 hover:bg-red-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-800'}`}
          disabled={loading}
        >
          {loading ? 'Asignando...' : currentVisit.tecnico ? 'Reasignar' : 'Asignar'}
        </button>
      </div>
    </form>
  );
};

export default AssignTechnicianForm;
