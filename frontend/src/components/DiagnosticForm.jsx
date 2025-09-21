import { useState } from "react";
import MaterialesSectionDiagnostico from "./shared/MaterialesSectionDiagnostico";
import TecnicoSelect from "./shared/TecnicoSelect";

const DiagnosticForm = ({ tecnicos, tecnicoAsignado, citaId, onSubmit, onCancel, initialData = null }) => {
  const [descripcion, setDescripcion] = useState(initialData?.Descripcion || "");
  const [medidas, setMedidas] = useState(initialData?.Medidas || "");
  const [materiales, setMateriales] = useState(
    initialData?.Materiales ? JSON.parse(initialData.Materiales) : []
  );
  const [fotoDiagnostico, setFotoDiagnostico] = useState(initialData?.FotoDiagnostico || "");

  // Si el técnico está asignado (rol técnico), omitimos el selector
  const isTecnicoFijo = !!tecnicoAsignado;
  const [tecnico, setTecnico] = useState(tecnicoAsignado || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      Descripcion: descripcion,
      Medidas: medidas,
      Materiales: materiales, // ✅ Enviar como array, no como string
      IdCita: citaId
    };

    console.log("Payload enviado:", JSON.stringify(payload, null, 2));
    onSubmit(payload);
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 bg-opacity-95 shadow-xl rounded-2xl p-6 w-full max-w-3xl space-y-6 text-white"
    >
      <h2 className="text-xl font-bold">
        {initialData ? "Editar Diagnóstico" : "Generar Diagnóstico"}
      </h2>

      {/* Solo mostrar selector si el técnico no está predefinido */}
      {!isTecnicoFijo && (
        <TecnicoSelect
          tecnicos={tecnicos}
          value={tecnico}
          setValue={setTecnico}
          bloqueado={false}
        />
      )}

      <div>
        <label className="block font-medium mb-1">Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-500 rounded-md bg-gray-700 focus:outline-none focus:border-red-500 text-white"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Medidas recomendadas</label>
        <textarea
          value={medidas}
          onChange={(e) => setMedidas(e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border border-gray-500 rounded-md bg-gray-700 focus:outline-none focus:border-red-500 text-white"
        />
      </div>

      <MaterialesSectionDiagnostico materiales={materiales} setMateriales={setMateriales} />

      <div className="flex justify-between mt-6">
        <button type="button" onClick={onCancel} className="bg-gray-500 px-4 py-2 rounded">
          Cancelar
        </button>
        <button type="submit" className="bg-green-600 px-4 py-2 rounded">
          {initialData ? "Actualizar Diagnóstico" : "Crear Diagnóstico"}
        </button>
      </div>
    </form>
  );
};

export default DiagnosticForm;
