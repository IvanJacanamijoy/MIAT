import fondo from '../../assets/images/home/imagen_fondo.png';
import logomiat from "../../assets/images/navbar/logo_miat_rojo.png";
import Select from 'react-select';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createVisitaTecnicaApi, updateVisitaTecnicaApi } from '../../service/visitasTecnicas';
import { BrowserRouter } from 'react-router-dom';

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

const tipoOpciones = [
  { value: 1, label: 'Aumento de carga' },
  { value: 2, label: 'Cambio de acometidas' },
  { value: 3, label: 'Independizaciones' },
  { value: 4, label: 'Instalaciones eléctricas' },
  { value: 5, label: 'Maniobras de baja y media tensión' },
  { value: 6, label: 'Mantenimiento de redes' },
  { value: 7, label: 'Modernizaciones y adecuaciones' },
  { value: 8, label: 'Trámites y diseños' },
];

const VisitForm = ({ agendar = true, visitaTecnica = {}}) => {
  const { usuario, authToken } = useAuth();
  const [form, setForm] = useState({
    Fecha: visitaTecnica.Fecha || '',
    Hora: visitaTecnica.Hora || '',
    Direccion: visitaTecnica.Direccion || '',
    tipoServicioIds: visitaTecnica.tipoServicioIds
      ? visitaTecnica.tipoServicioIds.map((s) => ({ value: s, label: s }))
      : [],

  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError('');
  };

  const handleTipoServicioChange = (selectedOptions) => {
    setForm({ ...form, tipoServicioIds: selectedOptions });
    setError('');
  };

  const validateForm = () => {
    if (agendar) {
      return (
        form.Fecha &&
        form.Hora &&
        form.Direccion &&
        form.tipoServicioIds.length > 0
      );
    } else {
      return form.Fecha && form.Hora;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError('Todos los campos son obligatorios');
      return;
    }

    const data = {
      Fecha: form.Fecha,
      Hora: form.Hora,
      ...(agendar && {
        Direccion: form.Direccion,
        tipoServicioIds: form.tipoServicioIds.map((opt) => opt.value),
        IdCliente: usuario.id,
      }),
      IdEstado: 5,
    };

    try {
      setLoading(true);
      let response;
      if (agendar) {
        response = await createVisitaTecnicaApi(data, authToken);
      } else {
        response = await updateVisitaTecnicaApi(visitaTecnica.id, data, authToken);
      }
      console.log(response);
      if (response && response.message) {
        alert(response.message);
      } else {
        alert('Operación realizada, pero no se recibió mensaje del servidor.');
      }
      window.location.reload();

      setForm({
        Fecha: '',
        Hora: '',
        Direccion: '',
        tipoServicioIds: [],
      });
    } catch (err) {
      setError('Error al enviar datos al servidor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Genera las opciones de hora válidas a partir de la hora actual
  const hourOptions = [
    { value: "08:00", label: "08:00 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "16:00", label: "4:00 PM" },
    { value: "18:00", label: "6:00 PM" },
  ];
  // console.log(hourOptions)

  // Si la fecha seleccionada es hoy, filtra las horas pasadas
  const today = new Date().toISOString().split('T')[0];
  let filteredHourOptions = hourOptions;
  if (form.Fecha === today) {
    const now = new Date();
    filteredHourOptions = hourOptions.filter(opt => {
      const [h, m] = opt.value.split(':');
      const optionDate = new Date();
      optionDate.setHours(Number(h), Number(m), 0, 0);
      return optionDate > now;
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white max-w-lg w-full p-8 rounded-2xl space-y-2"
    >
      <div className="flex justify-center mb-4">
        <img src={logomiat} alt="Logo" className="h-10" />
      </div>
      <h1 className='text-black text-center'>Agenda Tu visita</h1>

      <div>
        <label className="block font-semibold text-black">Fecha</label>
        <input
          type="date"
          name="Fecha"
          value={form.Fecha}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]} // Solo hoy en adelante
          className="w-full p-2 rounded border border-gray-300 text-neutral-800"
          required
        />
      </div>

      <div>
        <label className="block font-semibold text-black">Hora</label>
        <select
          name="Hora"
          value={form.Hora}
          onChange={handleChange}
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

      {agendar && (
        <>
          <div>
            <label className="block font-semibold text-black">Dirección</label>
            <input
              type="text"
              name="Direccion"
              value={form.Direccion}
              onChange={handleChange}
              className="w-full p-2 rounded border text-neutral-800 border-gray-300"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-black">Tipo(s) de Servicio</label>
            <Select
              isMulti
              name="tipoServicioIds"
              value={form.tipoServicioIds}
              onChange={handleTipoServicioChange}
              options={tipoOpciones}
              className="basic-multi-select"
              classNamePrefix="select"
              styles={customSelectStyles}
              placeholder="Selecciona uno o varios"
            />
          </div>
        </>
      )}

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex justify-center">
        <button
          type="submit"
          className={`${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
            } text-black font-bold py-2 px-6 rounded border-4 border-double ...`}
          disabled={loading}
        >
          {loading ? 'Enviando...' : agendar ? 'Agendar' : 'Actualizar'}
        </button>
      </div>

      {!agendar && (
        <p className="text-center text-sm text-gray-500">
          ¿Ya tienes una cuenta?{' '}
          <a href="/login" className="text-red-600 hover:underline">
            Inicia sesión
          </a>
        </p>
      )}
    </form>
  );
};

export default VisitForm;