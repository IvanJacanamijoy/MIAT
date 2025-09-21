import { useState, useEffect } from "react";
import { Camera } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { createCotizacionApi } from "../../service/cotizacion";
import { toast } from "react-toastify";

const QuoteForm = ({ idDiagnostico, onSubmit, onCancel }) => {
    const { authToken, usuario } = useAuth();

    const [descripcion, setDescripcion] = useState("");
    const [materiales, setMateriales] = useState([{ nombre: "", cantidad: "", precio: "" }]);
    const [costoVisita, setCostoVisita] = useState("");
    const [total, setTotal] = useState(0);

    // 🧮 Recalcular total automáticamente
    useEffect(() => {
        const sumaMateriales = materiales.reduce(
            (acc, m) => acc + Number(m.cantidad) * Number(m.precio),
            0
        );
        const totalFinal = sumaMateriales + Number(costoVisita || 0);
        setTotal(totalFinal);
    }, [materiales, costoVisita]);

    const agregarMaterial = () => {
        setMateriales([...materiales, { nombre: "", cantidad: "", precio: "" }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            IdDiagnostico: idDiagnostico,
            IdCliente: usuario.id, // o extraído del diagnóstico si lo tienes
            IdTecnico: usuario.id,
            Total: total,
            Observaciones: descripcion,
            Estado: "Pendiente",
            Materiales: JSON.stringify(materiales),
            CostoVisita: Number(costoVisita),
        };

        try {
            await createCotizacionApi(authToken, payload);
            toast.success("Cotización registrada correctamente");
            onSubmit?.(); // cerrar modal o refrescar vista
        } catch (error) {
            console.error("Error al guardar cotización:", error);
            toast.error("No se pudo guardar la cotización");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-xl rounded-xl p-6 w-full max-w-2xl mx-auto"
        >
            <h1 className="text-2xl font-bold mb-4 text-center">Registrar Cotización</h1>

            {/* Descripción */}
            <textarea
                placeholder="Descripción del servicio"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="border p-2 rounded w-full mb-4"
                rows="3"
            />

            {/* Materiales */}
            <h2 className="font-semibold mb-2">Materiales</h2>
            {materiales.map((mat, index) => (
                <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                    <input
                        type="text"
                        placeholder="Material"
                        value={mat.nombre}
                        onChange={(e) => {
                            const nuevos = [...materiales];
                            nuevos[index].nombre = e.target.value;
                            setMateriales(nuevos);
                        }}
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Cantidad"
                        value={mat.cantidad}
                        onChange={(e) => {
                            const nuevos = [...materiales];
                            nuevos[index].cantidad = e.target.value;
                            setMateriales(nuevos);
                        }}
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Precio"
                        value={mat.precio}
                        onChange={(e) => {
                            const nuevos = [...materiales];
                            nuevos[index].precio = e.target.value;
                            setMateriales(nuevos);
                        }}
                        className="border p-2 rounded"
                    />
                </div>
            ))}
            <button
                type="button"
                onClick={agregarMaterial}
                className="bg-gray-300 px-3 py-1 rounded mb-4"
            >
                + Agregar Material
            </button>

            {/* Costo visita */}
            <input
                type="number"
                placeholder="Costo visita técnica"
                value={costoVisita}
                onChange={(e) => setCostoVisita(e.target.value)}
                className="border p-2 rounded w-full mb-4"
            />

            {/* Total */}
            <div className="flex items-center mb-4">
                <span className="font-bold text-lg">Total: {total}</span>
            </div>

            {/* Registro fotográfico (placeholder) */}
            <h2 className="font-semibold mb-2">Registro Fotográfico</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="border h-32 flex items-center justify-center rounded">Foto 1</div>
                <div className="border h-32 flex items-center justify-center rounded relative">
                    <Camera className="absolute bottom-2 right-2 text-red-500 cursor-pointer" size={28} />
                </div>
            </div>

            {/* Botones */}
            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-700"
                >
                    Guardar
                </button>
            </div>
        </form>
    );
};

export default QuoteForm;
