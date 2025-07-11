import fondo from '../../assets/images/home/imagen_fondo.png';
import logomiat from "../../assets/images/navbar/logo_miat_rojo.png";
import Select from 'react-select';
import { useState } from 'react';

const tipoOpciones = [
  { value: 'Aumento de carga', label: 'Aumento de carga' },
  { value: 'Cambio de acometidas', label: 'Cambio de acometidas' },
  { value: 'Independizaciones', label: 'Independizaciones' },
  { value: 'Instalaciones eléctricas', label: 'Instalaciones eléctricas' },
  { value: 'Maniobras de baja y media tensión', label: 'Maniobras de baja y media tensión' },
  { value: 'Mantenimiento de redes', label: 'Mantenimiento de redes' },
  { value: 'Modernizaciones y adecuaciones', label: 'Modernizaciones y adecuaciones' },
  { value: 'Trámites y diseños', label: 'Trámites y diseños' },
];

const VisitForm = ({ agendar = true, visitaTecnica = {}, onSubmit }) => {
  const [form, setForm] = useState({
    fecha: visitaTecnica.fecha || '',
    hora: visitaTecnica.hora || '',
    telefono: visitaTecnica.telefono || '',
    direccion: visitaTecnica.direccion || '',
    tipoServicio: visitaTecnica.tipoServicio
      ? visitaTecnica.tipoServicio.map((s) => ({ value: s, label: s }))
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
    setForm({ ...form, tipoServicio: selectedOptions });
    setError('');
  };

  const validateForm = () => {
    if (agendar) {
      return (
        form.fecha &&
        form.hora &&
        form.telefono &&
        form.direccion &&
        form.tipoServicio.length > 0
      );
    } else {
      return form.fecha && form.hora;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError('Todos los campos son obligatorios');
      return;
    }

    const data = {
      fecha: form.fecha,
      hora: form.hora,
      ...(agendar && {
        telefono: form.telefono,
        direccion: form.direccion,
        tipoServicio: form.tipoServicio.map((opt) => opt.value),
      }),
    };

    try {
      setLoading(true);

      const response = await fetch('/api/visitas', {
        method: agendar ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Error al enviar datos al servidor');

      if (onSubmit) onSubmit(data);

      alert(agendar ? 'Visita agendada exitosamente' : 'Visita reprogramada correctamente');

      setForm({
        fecha: '',
        hora: '',
        telefono: '',
        direccion: '',
        tipoServicio: [],
      });
    } catch (err) {
      setError('Error al enviar datos al servidor');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <img
        src={fondo}
        className="absolute inset-0 w-full h-full object-cover z-0"
        alt="Fondo eléctrico"
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-20 gap-10">
        <div className="text-white max-w-xl text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Agendar Visita Técnica
          </h1>
          <p className="text-lg sm:text-xl">
            Consulta y gestiona tus citas fácilmente. Visualiza los servicios agendados y, si lo
            necesitas, cancela o reprograma con anticipación de 6 horas.
          </p>
        </div>

      
        <form
          onSubmit={handleSubmit}
          className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-xl space-y-5"
        >
          <div className="flex justify-center mb-4">
            <img src={logomiat} alt="Logo" className="h-10" />
          </div>

          <div>
            <label className="block font-semibold">Fecha</label>
            <input
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Hora</label>
            <input
              type="time"
              name="hora"
              value={form.hora}
              onChange={handleChange}
              step="60"
              className="w-full p-2 rounded border border-gray-300"
              required
            />
          </div>

          {agendar && (
            <>
              <div>
                <label className="block font-semibold">Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  className="w-full p-2 rounded border border-gray-300"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold">Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  className="w-full p-2 rounded border border-gray-300"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Tipo(s) de Servicio</label>
                <Select
                  isMulti
                  name="tipoServicio"
                  value={form.tipoServicio}
                  onChange={handleTipoServicioChange}
                  options={tipoOpciones}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Selecciona uno o varios"
                />
              </div>
            </>
          )}

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex justify-center">
            <button
              type="submit"
              className={`${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
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
      </div>
    </div>
  );
};

export default VisitForm;