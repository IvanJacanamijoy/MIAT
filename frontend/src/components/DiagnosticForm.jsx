import { useState } from "react";
import MaterialesSection from "./shared/MaterialesSection";
import TecnicoSelect from "./shared/TecnicoSelect";

const DiagnosticForm = ({ tecnicos, tecnicoAsignado, citaId, onSubmit, onCancel }) => {
  const [descripcion, setDescripcion] = useState("");
  const [medidas, setMedidas] = useState("");
  const [materiales, setMateriales] = useState([{ nombre: "", cantidad: "", umedida: "", precio: "" }]);
  const [tecnico, setTecnico] = useState(tecnicoAsignado || "");
  const bloqueado = !!tecnicoAsignado;


  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      Descripcion: descripcion,
      Medidas: medidas,
      Materiales: JSON.stringify(materiales), // ← debe ser string
      IdCita: citaId // ← obligatorio y único
    };

    console.log("Payload enviado:", JSON.stringify(payload, null, 2)); // ← para verificar

    onSubmit(payload); // ← sin campo 'tipo'
  };



  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 bg-opacity-95 shadow-xl rounded-2xl p-6 w-full max-w-3xl space-y-6 text-white"
    >
      <h2 className="text-xl font-bold">Generar Diagnóstico</h2>
      <TecnicoSelect
        tecnicos={tecnicos}
        value={tecnico}
        setValue={setTecnico}
        bloqueado={bloqueado}
      />

      <div>
        <label className="block font-medium mb-1">Descripción</label>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-500 rounded-md bg-gray-700 focus:outline-none focus:border-red-500 text-white"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Medidas recomendadas</label>
        <textarea value={medidas} onChange={(e) => setMedidas(e.target.value)} rows={2} className="w-full px-3 py-2 border border-gray-500 rounded-md bg-gray-700 focus:outline-none focus:border-red-500 text-white"
        />
      </div>
      <MaterialesSection materiales={materiales} setMateriales={setMateriales} />
      <div className="flex justify-between mt-6">
        <button type="button" onClick={onCancel} className="bg-gray-500 px-4 py-2 rounded">Cancelar</button>
        <button type="submit" className="bg-green-600 px-4 py-2 rounded">Guardar</button>
      </div>
    </form>
  );
};

export default DiagnosticForm;
