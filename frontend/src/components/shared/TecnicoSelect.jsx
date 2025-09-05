const TecnicoSelect = ({ tecnicos, value, setValue, bloqueado = false }) => {
  const tecnicoSeleccionado = tecnicos.find((t) => t.IdUsuario === parseInt(value));

  if (bloqueado && tecnicoSeleccionado) {
    return (
      <div>
        <label className="block font-medium mb-1">Técnico asignado</label>
        <input
          type="text"
          value={`${tecnicoSeleccionado.Nombres} ${tecnicoSeleccionado.Apellidos}`}
          disabled
          className="w-full px-3 py-2 border border-gray-500 rounded-md bg-gray-700 text-white opacity-50 cursor-not-allowed"
        />
      </div>
    );
  }

  return (
    <div>
      <label className="block font-medium mb-1">Seleccionar técnico</label>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-3 py-2 border border-gray-500 rounded-md bg-gray-700 text-white focus:outline-none focus:border-red-500"
      >
        <option value="">Selecciona un técnico</option>
        {tecnicos.map((t) => (
          <option key={t.IdUsuario} value={t.IdUsuario}>
            {t.Nombres} {t.Apellidos}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TecnicoSelect;
