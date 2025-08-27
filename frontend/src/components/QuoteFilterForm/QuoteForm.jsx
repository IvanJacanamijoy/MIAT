import { useState } from "react";
import { Camera } from "lucide-react"; // icono cámara (instalar con npm install lucide-react)

const QuoteForm = () => {
    const [tecnico, setTecnico] = useState("");
    const [fecha, setFecha] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [materiales, setMateriales] = useState([{ nombre: "", cantidad: "", precio: "" }]);
    const [costoVisita, setCostoVisita] = useState("");
    const [total, setTotal] = useState(0);

    // Calcular total
    const calcularTotal = () => {
        let suma = materiales.reduce((acc, m) => acc + (Number(m.cantidad) * Number(m.precio)), 0);
        suma += Number(costoVisita);
        setTotal(suma);
    };

    // Agregar fila de materiales
    const agregarMaterial = () => {
        setMateriales([...materiales, { nombre: "", cantidad: "", precio: "" }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ tecnico, fecha, descripcion, materiales, costoVisita, total });
        alert("Formulario guardado (ver consola)");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-xl rounded-xl p-6 w-full max-w-2xl"
            >
                <h1 className="text-2xl font-bold mb-4 text-center ">Registrar Diagnóstico</h1>

                {/* Técnico y Fecha */}
                <div className="grid grid-cols-2 gap-4 mb-4 ">
                    <input
                        type="text"
                        placeholder="Técnico"
                        value={tecnico}
                        onChange={(e) => setTecnico(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                </div>

                {/* Descripción */}
                <textarea
                    placeholder="Descripción a realizar"
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
                    <button
                        type="button"
                        onClick={calcularTotal}
                        className="bg-gray-800 text-white px-4 py-2 rounded mr-2"
                    >
                        TOTAL
                    </button>
                    <span className="font-bold text-lg"> {total} </span>
                </div>

                {/* Registro fotográfico */}
                <h2 className="font-semibold mb-2 ">Registro Fotográfico</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="border h-32 flex items-center justify-center rounded ">Foto 1</div>
                    <div className="border h-32 flex items-center justify-center rounded relative ">
                        <Camera className="absolute bottom-2 right-2 text-red-500 cursor-pointerborder-red" size={28} />
                    </div>
                </div>

                {/* Botones */}
                <div className="flex justify-between">
                    <button
                        type="button"
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700"
                    >
                        Editar
                    </button>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-700"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default QuoteForm;