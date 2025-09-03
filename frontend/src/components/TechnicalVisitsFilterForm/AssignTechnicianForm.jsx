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

  const tecnicoActualId = currentVisit?.IdTecnico;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTechId) {
      toast.warning('Debe seleccionar un técnico');
      return;
    }

    const IdTecnico = parseInt(selectedTechId);
    if (IdTecnico === tecnicoActualId) {
      toast.info('Este técnico ya está asignado a la visita');
      return;
    }

    setLoading(true);
    try {
      await assignTechnicianToVisitApi(currentVisit.IdCita, IdTecnico, authToken);
      toast.success('Técnico asignado correctamente');

      if (typeof onSuccess === 'function') {
        console.log("Ejecutando onSuccess desde el formulario");
        await onSuccess(); // ← padre se encarga de cerrar y recargar
      }
    } catch (error) {
      toast.error('Error al asignar técnico');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-black space-y-4 p-4">
      <div className="flex flex-col items-center text-center mb-4">
        <img src={logomiat} alt="Logo Miat" className="w-20 h-auto mb-2" />
        <h2 className="text-xl font-bold">
          {tecnicoActualId ? 'Reasignar técnico' : 'Asignar técnico'}
        </h2>
        {tecnicoActualId && (
          <p className="text-sm text-gray-700 mt-1">
            <strong>Actual:</strong>{" "}
            {currentVisit.TecnicoNombres
              ? `${currentVisit.TecnicoNombres} ${currentVisit.TecnicoApellidos}`
              : "Sin nombre registrado"}
          </p>
        )}
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
          className={`px-4 py-2 rounded text-white ${
            loading || (parseInt(selectedTechId) === tecnicoActualId)
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-800'
          }`}
          disabled={
            loading || !selectedTechId || parseInt(selectedTechId) === tecnicoActualId
          }
        >
          {loading ? 'Asignando...' : tecnicoActualId ? 'Reasignar' : 'Asignar'}
        </button>
      </div>
    </form>
  );
};

export default AssignTechnicianForm;
