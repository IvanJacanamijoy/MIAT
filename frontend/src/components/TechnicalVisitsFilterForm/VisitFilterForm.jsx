import { useState } from 'react';
import Select from 'react-select';

const VisitFilterForm = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    fecha: '',
    clienteIdentificacion: '',
    tipoServicioId: []
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
    const resetFilters = {
      fecha: '',
      clienteIdentificacion: '',
      tipoServicioId: []
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  const opcionesTipoServicio = [
    { value: 1, label: 'Aumento de carga' },
    { value: 2, label: 'Cambio de acometidas' },
    { value: 3, label: 'Independizaciones' },
    { value: 4, label: 'Instalaciones eléctricas' },
    { value: 5, label: 'Maniobras de baja y media tensión' },
    { value: 6, label: 'Mantenimiento de redes' },
    { value: 7, label: 'Modernizaciones y adecuaciones' },
    { value: 8, label: 'Trámites y diseños' },
  ];

  const handleTipoServicioChange = (selectedOptions) => {
    const tipoServicioId = selectedOptions ? selectedOptions.map(op => op.value) : [];
    setFilters({ ...filters, tipoServicioId });
  };

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'white',
      borderColor: state.isFocused ? '#3b82f6' : '#d1d5db', // azul-500 o gray-300
      borderRadius: '0.375rem', // rounded-md
      padding: '0.125rem 0.25rem',
      boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
      minHeight: '40px',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? '#3b82f6' // azul-500
        : state.isFocused
          ? '#e0f2fe' // azul-100
          : 'white',
      color: state.isSelected ? 'white' : '#1f2937', // text-gray-800
      
      padding: '8px 12px',
      cursor: 'pointer',
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: '#bfdbfe', // azul-200
      color: '#1e3a8a',
      borderRadius: '0.25rem',
      padding: '2px 4px',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#1e3a8a', // azul-900
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: '#1e3a8a',
      ':hover': {
        backgroundColor: '#93c5fd', // azul-300
        color: '#1e3a8a',
      },
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };


  return (
    <form onSubmit={handleSubmit} className=" flex flex-col xl:flex-row items-center gap-4 mb-6 bg-gray-700 p-4 rounded-lg text-white">
      <div className="flex flex-col w-full">
        <label className="mb-1">Filtrar por fecha:</label>
        <input
          type="date"
          name="fecha"
          value={filters.fecha}
          onChange={handleChange}
          className="p-2 bg-white rounded-sm text-neutral-700 w-full"
        />
      </div>

      <div className="flex flex-col w-full">
        <label className="mb-1">Filtrar por identificación:</label>
        <input
          type="text"
          name="clienteIdentificacion"
          value={filters.clienteIdentificacion}
          onChange={handleChange}
          placeholder="Numero de identificación"
          className="p-2 bg-white rounded-sm placeholder:text-neutral-500 text-neutral-700"
        />
      </div>
      <div className='flex flex-col w-full'>
        <label className="block font-semibold mb-1">Tipo(s) de Servicio</label>
        <Select
          isMulti
          options={opcionesTipoServicio}
          onChange={handleTipoServicioChange}
          value={opcionesTipoServicio.filter(op => filters.tipoServicioId?.includes(op.value))}
          className="react-select-container placeholder:text-neutral-400"
          classNamePrefix="react-select"
          styles={customSelectStyles}
          menuPortalTarget={document.body}
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
