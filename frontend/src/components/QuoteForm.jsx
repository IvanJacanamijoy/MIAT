import { useState, useEffect } from "react";
import MaterialesSection from "./shared/MaterialesSection";

const QuoteForm = ({ idDiagnostico, onSubmit, onCancel }) => {
  const [materiales, setMateriales] = useState([{ nombre: "", cantidad: "", umedida: "", precio: "" }]);
  const [costoManoObra, setCostoManoObra] = useState("");
  const [garantia, setGarantia] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [totalMateriales, setTotalMateriales] = useState(0);

  useEffect(() => {
    const total = materiales.reduce((acc, mat) => {
      const cantidad = parseFloat(mat.cantidad) || 0;
      const precio = parseFloat(mat.precio) || 0;
      return acc + cantidad * precio;
    }, 0);
    setTotalMateriales(total);
  }, [materiales]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const manoObra = parseFloat(costoManoObra) || 0;
    const payload = {
      tipo: "cotizacion", // ← necesario para que el padre lo reconozca
      CostoMateriales: totalMateriales,
      CostoManoObra: manoObra,
      PrecioTotal: totalMateriales + manoObra,
      Garantia: garantia,
      Observaciones: observaciones,
      IdDiagnostico: idDiagnostico,
      IdEstado: 5 // pendiente
    };
    onSubmit(payload);
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 bg-opacity-95 shadow-xl rounded-2xl p-6 w-full max-w-3xl space-y-6 text-white"
    >
      <h2 className="text-xl font-bold">Generar Cotización</h2>

      <MaterialesSection materiales={materiales} setMateriales={setMateriales} />

      <div>
        <label className="block font-medium mb-1">Costo de mano de obra</label>
        <input
          type="number"
          value={costoManoObra}
          onChange={(e) => setCostoManoObra(e.target.value)}
          className="w-full px-3 py-2 border rounded bg-gray-700 text-white"
          placeholder="Valor de la visita técnica"
        />
      </div>

      <div className="bg-gray-900 p-3 rounded-md shadow-inner">
        <h3 className="text-lg font-bold">TOTAL: ${totalMateriales + (parseFloat(costoManoObra) || 0)}</h3>
      </div>

      <div>
        <label className="block font-medium mb-1">Garantía</label>
        <textarea
          value={garantia}
          onChange={(e) => setGarantia(e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border rounded bg-gray-700 text-white"
          placeholder="Detalles de la garantía ofrecida"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Observaciones</label>
        <textarea
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border rounded bg-gray-700 text-white"
          placeholder="Comentarios adicionales"
        />
      </div>

      <div className="flex justify-between mt-6">
        <button type="button" onClick={onCancel} className="bg-gray-500 px-4 py-2 rounded">
          Cancelar
        </button>
        <button type="submit" className="bg-green-600 px-4 py-2 rounded">
          Guardar
        </button>
      </div>
    </form>
  );
};

export default QuoteForm;
