import { useState } from 'react';
import logomiat from "../../assets/images/navbar/logo_miat_rojo.png";

const AssignTechnicianForm = ({ technicians = [], currentVisit, onSubmit, onCancel }) => {
  const [selectedTechId, setSelectedTechId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedTechId) {
      alert('Debe seleccionar un técnico');
      return;
    }

    const assignedTech = technicians.find((t) => t.id === selectedTechId);
    onSubmit({ ...currentVisit, tecnico: assignedTech });
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
          value={selectedTechId}
          onChange={(e) => setSelectedTechId(e.target.value)}
          className="p-2 w-full rounded border"
          required
        >
          <option value="">-- Selecciona --</option>
          {technicians.map((tech) => (
            <option key={tech.id} value={tech.id}>
              {tech.nombre}
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
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded"
        >
          {currentVisit.tecnico ? 'Reasignar' : 'Asignar'}
        </button>
      </div>
    </form>
  );
};

export default AssignTechnicianForm;
