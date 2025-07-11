import { useState } from 'react';
import logomiat from "../../assets/images/navbar/logo_miat_rojo.png";

const ReprogramVisitForm = ({ currentVisit, onSubmit, onCancel }) => {
  const [fecha, setFecha] = useState(currentVisit.fecha || '');
  const [hora, setHora] = useState(currentVisit.hora || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fecha || !hora) {
      alert('Todos los campos son obligatorios');
      return;
    }

    onSubmit({ ...currentVisit, fecha, hora });
  };

  return (
    <form onSubmit={handleSubmit} className="text-black space-y-4">
      <div className="flex flex-col items-center mb-6">
          <img src={logomiat} alt="Logo Miat" className="w-20 h-auto mb-3" />
          <h2 className="text-2xl font-bold text-center text-black">
            Reprogramar visita técnica
          </h2>
      </div>
      <div>
        <label className="block font-bold">Nueva fecha:</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="p-2 w-full rounded border"
          required
        />
      </div>
      <div>
        <label className="block font-bold">Nueva hora:</label>
        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          className="p-2 w-full rounded border"
          required
        />
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400  hover:bg-red-500 text-white px-4 py-2 rounded"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-800 text-white px-4 py-2 rounded"
        >
          Reprogramar
        </button>
      </div>
    </form>
  );
};

export default ReprogramVisitForm;
