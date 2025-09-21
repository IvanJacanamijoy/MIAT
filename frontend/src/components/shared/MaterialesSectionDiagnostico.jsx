const MaterialesSectionDiagnostico = ({ materiales, setMateriales, editable = true }) => {
  const handleChange = (index, field, value) => {
    const nuevos = [...materiales];
    nuevos[index][field] = value;
    setMateriales(nuevos);
  };

  const agregarMaterial = () => {
    setMateriales([...materiales, { nombre: "", cantidad: "", umedida: "" }]);
  };

  const eliminarMaterial = (index) => {
    if (materiales.length > 1) {
      const nuevos = materiales.filter((_, i) => i !== index);
      setMateriales(nuevos);
    }
  };

  return (
    <div>
      <h3 className="font-medium mb-2">Materiales Requeridos</h3>
      <p className="text-sm text-gray-400 mb-3">
        Especifique los materiales necesarios con sus cantidades y medidas (sin precios)
      </p>
      
      {materiales.map((mat, index) => (
        <div key={index} className="grid grid-cols-4 gap-2 mb-2 items-center">
          <input
            type="text"
            placeholder="Material"
            disabled={!editable}
            value={mat.nombre}
            onChange={(e) => handleChange(index, "nombre", e.target.value)}
            className="px-2 py-1 border rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="number"
            placeholder="Cantidad"
            disabled={!editable}
            value={mat.cantidad}
            onChange={(e) => handleChange(index, "cantidad", e.target.value)}
            className="px-2 py-1 border rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Unidad (m, kg, pza)"
            disabled={!editable}
            value={mat.umedida}
            onChange={(e) => handleChange(index, "umedida", e.target.value)}
            className="px-2 py-1 border rounded bg-gray-700 text-white placeholder-gray-400"
          />
          {editable && materiales.length > 1 && (
            <button
              type="button"
              onClick={() => eliminarMaterial(index)}
              className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Eliminar
            </button>
          )}
        </div>
      ))}
      
      {editable && (
        <button
          type="button"
          onClick={agregarMaterial}
          className="mt-2 px-4 py-1 border rounded text-white bg-gray-600 hover:bg-gray-700"
        >
          + Agregar material
        </button>
      )}
    </div>
  );
};

export default MaterialesSectionDiagnostico;