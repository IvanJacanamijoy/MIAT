import { useState } from 'react';
import logomiat from "../../assets/images/navbar/logo_miat_rojo.png";

const hourOptions = [
  { value: "08:00", label: "08:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "16:00", label: "4:00 PM" },
  { value: "18:00", label: "6:00 PM" },
];

const ReprogramVisitForm = ({ currentVisit, onSubmit, onCancel }) => {
  const [fecha, setFecha] = useState(currentVisit.fecha || '');
  const [hora, setHora] = useState(currentVisit.hora || '');

  // Filtra las horas si la fecha es hoy
  const today = new Date().toISOString().split('T')[0];
  let filteredHourOptions = hourOptions;
  if (fecha === today) {
    const now = new Date();
    filteredHourOptions = hourOptions.filter(opt => {
      const [h, m] = opt.value.split(':');
      const optionDate = new Date();
      optionDate.setHours(Number(h), Number(m), 0, 0);
      return optionDate > now;
    });
  }

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
          min={today}
          className="w-full p-2 rounded border border-gray-300 text-neutral-800"
  
          required
        />
      </div>
      <div>
        <label className="block font-bold">Nueva hora:</label>
        <select
          name="hora"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          className="w-full p-2 rounded border text-neutral-800 border-gray-300"
          required
        >
          <option value="">Selecciona una hora</option>
          {filteredHourOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
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
