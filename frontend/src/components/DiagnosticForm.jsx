import { useState } from "react";

const DiagnosticForm = ({ onSubmit, onCancel, citaId }) => {
  const [descripcion, setDescripcion] = useState("");
  const [medidas, setMedidas] = useState("");
  const [materiales, setMateriales] = useState("");
  const [fotoDiagnostico, setFotoDiagnostico] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!descripcion || !medidas || !materiales) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    onSubmit({
      Descripcion: descripcion,
      Medidas: medidas,
      Materiales: materiales,
      FotoDiagnostico: fotoDiagnostico,
      IdCita: citaId,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Crear Diagnóstico</h2>
      {error && <div className="text-red-600">{error}</div>}
      <div>
        <label className="block font-semibold">Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Medidas</label>
        <textarea
          value={medidas}
          onChange={(e) => setMedidas(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Materiales</label>
        <input
          type="text"
          value={materiales}
          onChange={(e) => setMateriales(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Foto Diagnóstico (nombre o URL)</label>
        <input
          type="text"
          value={fotoDiagnostico}
          onChange={(e) => setFotoDiagnostico(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default DiagnosticForm;