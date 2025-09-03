import { useState, useEffect } from "react";

const DiagnosticOrQuoteForm = ({
  onSubmit,
  onCancel,
  citaId,
  tieneDiagnostico,
  tieneCotizacion,
}) => {
  const [formType, setFormType] = useState("diagnostico");

  useEffect(() => {
    if (tieneDiagnostico && !tieneCotizacion) {
      setFormType("cotizacion");
    } else {
      setFormType("diagnostico");
    }
  }, [tieneDiagnostico, tieneCotizacion]);

  // Campos comunes
  const [descripcion, setDescripcion] = useState("");
  const [medidas, setMedidas] = useState("");
  const [materiales, setMateriales] = useState("");
  const [fotoDiagnostico, setFotoDiagnostico] = useState("");

  // Campos cotización
  const [costoMateriales, setCostoMateriales] = useState("");
  const [costoManoObra, setCostoManoObra] = useState("");
  const [garantia, setGarantia] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formType === "diagnostico") {
      if (!descripcion || !medidas || !materiales) {
        setError("Todos los campos del diagnóstico son obligatorios.");
        return;
      }
      onSubmit({
        tipo: "diagnostico",
        Descripcion: descripcion,
        Medidas: medidas,
        Materiales: materiales,
        FotoDiagnostico: fotoDiagnostico,
        IdCita: citaId,
      });
    } else {
      if (!costoMateriales || !costoManoObra) {
        setError("Costo de materiales y mano de obra son obligatorios.");
        return;
      }
      const precioTotal = parseFloat(costoMateriales) + parseFloat(costoManoObra);
      onSubmit({
        tipo: "cotizacion",
        CostoMateriales: parseFloat(costoMateriales),
        CostoManoObra: parseFloat(costoManoObra),
        PrecioTotal: precioTotal,
        Garantia: garantia,
        Observaciones: observaciones,
        IdCita: citaId,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-md w-[320px] sm:w-[400px]">
      <h2 className="text-xl font-bold mb-4 text-center text-black">
        {formType === "diagnostico" ? "Crear Diagnóstico" : "Crear Cotización"}
      </h2>

      {/* Mostrar selector solo si no hay diagnóstico */}
      {!tieneDiagnostico && !tieneCotizacion && (
        <div className="flex justify-center gap-4 mb-4">
          <button
            type="button"
            onClick={() => setFormType("diagnostico")}
            className={`px-4 py-2 rounded font-semibold transition ${
              formType === "diagnostico"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Diagnóstico
          </button>
          <button
            type="button"
            onClick={() => setFormType("cotizacion")}
            className={`px-4 py-2 rounded font-semibold transition ${
              formType === "cotizacion"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Cotización
          </button>
        </div>
      )}

      {error && <div className="text-red-600 text-sm text-center">{error}</div>}

      {formType === "diagnostico" && (
        <>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full p-2 border rounded text-neutral-700"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Medidas</label>
            <textarea
              value={medidas}
              onChange={(e) => setMedidas(e.target.value)}
              className="w-full p-2 border rounded text-neutral-700"
              rows={2}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Materiales</label>
            <input
              type="text"
              value={materiales}
              onChange={(e) => setMateriales(e.target.value)}
              className="w-full p-2 border rounded text-neutral-700"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Foto Diagnóstico (URL o nombre)</label>
            <input
              type="text"
              value={fotoDiagnostico}
              onChange={(e) => setFotoDiagnostico(e.target.value)}
              className="w-full p-2 border rounded text-neutral-700"
            />
          </div>
        </>
      )}

      {formType === "cotizacion" && (
        <>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Costo de materiales</label>
            <input
              type="number"
              value={costoMateriales}
              onChange={(e) => setCostoMateriales(e.target.value)}
              className="w-full p-2 border rounded text-neutral-700"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Costo de mano de obra</label>
            <input
              type="number"
              value={costoManoObra}
              onChange={(e) => setCostoManoObra(e.target.value)}
              className="w-full p-2 border rounded text-neutral-700"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Garantía</label>
            <input
              type="text"
              value={garantia}
              onChange={(e) => setGarantia(e.target.value)}
              className="w-full p-2 border rounded text-neutral-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black">Observaciones</label>
            <textarea
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              className="w-full p-2 border rounded text-neutral-700"
              rows={2}
            />
          </div>
        </>
      )}

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default DiagnosticOrQuoteForm;
