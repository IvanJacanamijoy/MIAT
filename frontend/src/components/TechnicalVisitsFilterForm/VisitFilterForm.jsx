import { useState } from 'react';

const VisitFilterForm = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    fecha: '',
    direccion: ''
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    const resetFilters = { fecha: '', direccion: '' };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4 mb-6 bg-gray-700 p-4 rounded-lg text-white">
      <div className="flex flex-col">
        <label className="mb-1">Filtrar por fecha:</label>
        <input
          type="date"
          name="fecha"
          value={filters.fecha}
          onChange={handleChange}
          className="p-2 rounded text-black"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1">Filtrar por dirección:</label>
        <input
          type="text"
          name="direccion"
          value={filters.direccion}
          onChange={handleChange}
          placeholder="Dirección"
          className="p-2 rounded text-black"
        />
      </div>

      <div className="flex gap-2 mt-4 md:mt-6">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-bold"
        >
          Filtrar
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded font-bold"
        >
          Limpiar
        </button>
      </div>
    </form>
  );
};

export default VisitFilterForm;
