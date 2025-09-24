import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getDiagnosticoByIdApi } from "../service/diagnostico";
import { toast } from "react-toastify";

const QuoteForm = ({ 
  idDiagnostico, 
  onSubmit, 
  onCancel, 
  onSuccess 
}) => {
  const { authToken } = useAuth();
  const [materialesDelDiagnostico, setMaterialesDelDiagnostico] = useState([]);
  const [materialesNuevos, setMaterialesNuevos] = useState([]);
  const [costoManoObra, setCostoManoObra] = useState("");
  const [garantia, setGarantia] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [totalMateriales, setTotalMateriales] = useState(0);
  const [loading, setLoading] = useState(true);

  // Cargar datos del diagnóstico al montar el componente
  useEffect(() => {
    const cargarDatosDiagnostico = async () => {
      try {
        setLoading(true);
        const diagnostico = await getDiagnosticoByIdApi(idDiagnostico, authToken);
        
        if (diagnostico && diagnostico.Materiales) {
          try {
            const materialesArray = JSON.parse(diagnostico.Materiales);
            // Agregar campo precio a los materiales del diagnóstico
            const materialesConPrecio = materialesArray.map(material => ({
              ...material,
              precio: "",
              esDiagnostico: true // Flag para identificar materiales del diagnóstico
            }));
            setMaterialesDelDiagnostico(materialesConPrecio);
          } catch (error) {
            console.error("Error al parsear materiales del diagnóstico:", error);
            toast.error("Error al cargar materiales del diagnóstico");
          }
        }
      } catch (error) {
        console.error("Error al cargar diagnóstico:", error);
        toast.error("Error al cargar datos del diagnóstico");
      } finally {
        setLoading(false);
      }
    };

    if (idDiagnostico && authToken) {
      cargarDatosDiagnostico();
    }
  }, [idDiagnostico, authToken]);

  // Calcular total cuando cambien los materiales
  useEffect(() => {
    const totalDiagnostico = materialesDelDiagnostico.reduce((acc, mat) => {
      const cantidad = parseFloat(mat.cantidad) || 0;
      const precio = parseFloat(mat.precio) || 0;
      return acc + cantidad * precio;
    }, 0);

    const totalNuevos = materialesNuevos.reduce((acc, mat) => {
      const cantidad = parseFloat(mat.cantidad) || 0;
      const precio = parseFloat(mat.precio) || 0;
      return acc + cantidad * precio;
    }, 0);

    setTotalMateriales(totalDiagnostico + totalNuevos);
  }, [materialesDelDiagnostico, materialesNuevos]);

  const handlePrecioChange = (index, precio, esDiagnostico = true) => {
    if (esDiagnostico) {
      const nuevos = [...materialesDelDiagnostico];
      nuevos[index].precio = precio;
      setMaterialesDelDiagnostico(nuevos);
    } else {
      const nuevos = [...materialesNuevos];
      nuevos[index].precio = precio;
      setMaterialesNuevos(nuevos);
    }
  };

  const handleMaterialNuevoChange = (index, field, value) => {
    const nuevos = [...materialesNuevos];
    nuevos[index][field] = value;
    setMaterialesNuevos(nuevos);
  };

  const agregarMaterialNuevo = () => {
    setMaterialesNuevos([...materialesNuevos, { 
      nombre: "", 
      cantidad: "", 
      umedida: "", 
      precio: "",
      esDiagnostico: false
    }]);
  };

  const eliminarMaterialNuevo = (index) => {
    const nuevos = materialesNuevos.filter((_, i) => i !== index);
    setMaterialesNuevos(nuevos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Combinar todos los materiales para el payload
    const todosMateriales = [
      ...materialesDelDiagnostico,
      ...materialesNuevos
    ];

    const manoObra = parseFloat(costoManoObra) || 0;
    const payload = {
      tipo: "cotizacion",
      CostoMateriales: totalMateriales,
      CostoManoObra: manoObra,
      PrecioTotal: totalMateriales + manoObra,
      Garantia: garantia,
      Observaciones: observaciones,
      IdDiagnostico: idDiagnostico,
      IdEstado: 5, // pendiente
      Materiales: todosMateriales // Incluir todos los materiales
    };
    
    try {
      await onSubmit(payload);
      // Llamar a onSuccess si existe para actualizar las listas
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error al crear cotización:", error);
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-800 bg-opacity-95 shadow-xl rounded-2xl p-6 w-full max-w-3xl space-y-6 text-white">
        <div className="text-center">
          <p>Cargando datos del diagnóstico...</p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 bg-opacity-95 shadow-xl rounded-2xl p-6 w-full max-w-3xl space-y-6 text-white"
    >
      <h2 className="text-xl font-bold">Generar Cotización</h2>

      {/* Materiales del diagnóstico */}
      {materialesDelDiagnostico.length > 0 && (
        <div>
          <h3 className="font-medium mb-2 text-blue-300">Materiales del Diagnóstico</h3>
          <p className="text-sm text-gray-400 mb-3">
            Agregue el precio para cada material identificado en el diagnóstico
          </p>
          {materialesDelDiagnostico.map((mat, index) => (
            <div key={index} className="grid grid-cols-4 gap-2 mb-2 bg-blue-900 bg-opacity-30 p-2 rounded">
              <input
                type="text"
                value={mat.nombre}
                disabled
                className="px-2 py-1 border rounded bg-gray-600 text-gray-300"
              />
              <input
                type="text"
                value={`${mat.cantidad} ${mat.umedida}`}
                disabled
                className="px-2 py-1 border rounded bg-gray-600 text-gray-300"
              />
              <span className="px-2 py-1 text-gray-300 flex items-center">Precio:</span>
              <input
                type="number"
                placeholder="0.00"
                value={mat.precio}
                onChange={(e) => handlePrecioChange(index, e.target.value, true)}
                className="px-2 py-1 border rounded bg-gray-700 text-white"
                step="0.01"
              />
            </div>
          ))}
        </div>
      )}

      {/* Materiales nuevos */}
      <div>
        <h3 className="font-medium mb-2 text-green-300">Materiales Adicionales</h3>
        <p className="text-sm text-gray-400 mb-3">
          Agregue materiales adicionales que no estaban en el diagnóstico original
        </p>
        {materialesNuevos.map((mat, index) => (
          <div key={index} className="grid grid-cols-5 gap-2 mb-2 bg-green-900 bg-opacity-30 p-2 rounded">
            <input
              type="text"
              placeholder="Material"
              value={mat.nombre}
              onChange={(e) => handleMaterialNuevoChange(index, "nombre", e.target.value)}
              className="px-2 py-1 border rounded bg-gray-700 text-white"
            />
            <input
              type="number"
              placeholder="Cantidad"
              value={mat.cantidad}
              onChange={(e) => handleMaterialNuevoChange(index, "cantidad", e.target.value)}
              className="px-2 py-1 border rounded bg-gray-700 text-white"
            />
            <input
              type="text"
              placeholder="Unidad"
              value={mat.umedida}
              onChange={(e) => handleMaterialNuevoChange(index, "umedida", e.target.value)}
              className="px-2 py-1 border rounded bg-gray-700 text-white"
            />
            <input
              type="number"
              placeholder="Precio"
              value={mat.precio}
              onChange={(e) => handlePrecioChange(index, e.target.value, false)}
              className="px-2 py-1 border rounded bg-gray-700 text-white"
              step="0.01"
            />
            <button
              type="button"
              onClick={() => eliminarMaterialNuevo(index)}
              className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Eliminar
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={agregarMaterialNuevo}
          className="mt-2 px-4 py-1 border rounded text-white bg-green-600 hover:bg-green-700"
        >
          + Agregar material adicional
        </button>
      </div>

      <div>
        <label className="block font-medium mb-1">Costo de mano de obra</label>
        <input
          type="number"
          value={costoManoObra}
          onChange={(e) => setCostoManoObra(e.target.value)}
          className="w-full px-3 py-2 border rounded bg-gray-700 text-white"
          placeholder="Valor de la visita técnica"
          step="0.01"
        />
      </div>

      <div className="bg-gray-900 p-3 rounded-md shadow-inner">
        <h3 className="text-lg font-bold">TOTAL: ${(totalMateriales + (parseFloat(costoManoObra) || 0)).toLocaleString()}</h3>
        <p className="text-sm text-gray-400">
          Materiales: ${totalMateriales.toLocaleString()} + Mano de obra: ${(parseFloat(costoManoObra) || 0).toLocaleString()}
        </p>
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
        <button type="button" onClick={onCancel} className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600">
          Cancelar
        </button>
        <button type="submit" className="bg-green-600 px-4 py-2 rounded hover:bg-green-700">
          Guardar Cotización
        </button>
      </div>
    </form>
  );
};

export default QuoteForm;
