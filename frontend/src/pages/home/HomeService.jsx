import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const HomeService = () => {
    const [busqueda, setBusqueda] = useState("");
    const navigate = useNavigate();
    const { usuario } = useAuth();

    const servicios = [
        {
            id: 1,
            nombre: "Mantenimiento",
            precio_visita_tecnica: 50000,
            descripcion:
                "Nuestro servicio de mantenimiento eléctrico garantiza el óptimo funcionamiento de tus instalaciones. Realizamos inspecciones, diagnósticos y correcciones para prevenir fallas y asegurar tu seguridad.",
        },
        {
            id: 2,
            nombre: "Instalación",
            precio_visita_tecnica: 75000,
            descripcion:
                "Instalamos sistemas eléctricos residenciales y comerciales cumpliendo normativas de seguridad y eficiencia.",
        },
        {
            id: 3,
            nombre: "Reparación",
            precio_visita_tecnica: 60000,
            descripcion:
                "Reparamos todo tipo de fallas eléctricas garantizando resultados rápidos y seguros.",
        },
    ];

    const normalizar = (texto) =>
        texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const serviciosFiltrados = servicios.filter((servicio) =>
        normalizar(servicio.nombre).includes(normalizar(busqueda))
    );


    const handleAgendarClick = () => {
        if (usuario) {
            navigate("/user/UserSer");
        } else {
            navigate("/register");
        }
    };

    return (
        <div className="min-h-screen bg-gray-200 relative max-w-7xl mx-auto">
            {/* Imagen de fondo */}
            <div className="relative">
                <img
                    src="src/assets/images/home/imagen_fondo.png"
                    className="w-full h-[500px] object-cover opacity-80"
                    alt="Fondo eléctrico"
                />
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center font-bold text-4xl md:text-5xl px-4">
                    <h1 className="text-7xl text-white">Servicios</h1>
                    <p className="text-1xl md:text-2xl mt-2">
                        Explora todos nuestros servicios y elige el que mejor se adapte a tu necesidad. Agéndalo de manera fácil y rápida.
                    </p>
                </div>
            </div>

            {/* Caja superpuesta */}
            <div className="relative z-10 bg-black rounded-t-3xl -mt-30 px-4 py-10 max-w-5xl mx-auto text-white shadow-xl">

                {/* Buscador */}
                <div className="max-w-4xl mx-auto mb-8">
                    <div className="flex items-center bg-white shadow-md rounded-full px-4 py-2">
                        <Search className="text-red-500" />
                        <input
                            type="text"
                            placeholder="Buscar"
                            className="flex-1 ml-2 outline-none text-black"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>
                </div>

                {/* Lista de servicios */}
                <div className="max-w-4xl mx-auto space-y-6">
                    {serviciosFiltrados.map((servicio) => (
                        <div
                            key={servicio.id}
                            className="bg-white rounded-xl shadow-md p-6 text-black"
                        >
                            <h2 className="text-2xl font-semibold text-red-600 ">{servicio.nombre}</h2>
                            <span className="text-sm text-green-700 bg-green-200 px-4 py-2 rounded-md inline-block mt-2 mb-1">
                                Costo Visita Técnica
                            </span>
                            <p className="text-2xl font-bold text-gray-900">
                                ${servicio.precio_visita_tecnica.toLocaleString()}
                            </p>
                            <button
                                onClick={handleAgendarClick}
                                className="bg-black text-white px-4 py-2 mt-4 rounded font-semibold transition duration-300 hover:bg-red-500 active:bg-red-600"
                            >
                                Agendar
                            </button>
                            <div className="mt-4 border-t pt-2">
                                <h3 className="font-semibold">Descripción</h3>
                                <p className="text-sm text-gray-700 mt-1">
                                    {servicio.descripcion}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeService;
