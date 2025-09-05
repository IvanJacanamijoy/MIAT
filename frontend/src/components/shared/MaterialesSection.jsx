const MaterialesSection = ({ materiales, setMateriales, editable = true }) => {
  const handleChange = (index, field, value) => {
    const nuevos = [...materiales];
    nuevos[index][field] = value;
    setMateriales(nuevos);
  };

  const agregarMaterial = () => {
    setMateriales([...materiales, { nombre: "", cantidad: "", umedida: "", precio: "" }]);
  };

  return (
    <div>
      <h3 className="font-medium mb-2">Materiales</h3>
      {materiales.map((mat, index) => (
        <div key={index} className="grid grid-cols-4 gap-2 mb-2">
          <input
            type="text"
            placeholder="Material"
            disabled={!editable}
            value={mat.nombre}
            onChange={(e) => handleChange(index, "nombre", e.target.value)}
            className="px-2 py-1 border rounded bg-gray-700 text-white"
          />
          <input
            type="number"
            placeholder="Cantidad"
            disabled={!editable}
            value={mat.cantidad}
            onChange={(e) => handleChange(index, "cantidad", e.target.value)}
            className="px-2 py-1 border rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Unidad"
            disabled={!editable}
            value={mat.umedida}
            onChange={(e) => handleChange(index, "umedida", e.target.value)}
            className="px-2 py-1 border rounded bg-gray-700 text-white"
          />
          <input
            type="number"
            placeholder="Precio"
            disabled={!editable}
            value={mat.precio}
            onChange={(e) => handleChange(index, "precio", e.target.value)}
            className="px-2 py-1 border rounded bg-gray-700 text-white"
          />
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

export default MaterialesSection;
