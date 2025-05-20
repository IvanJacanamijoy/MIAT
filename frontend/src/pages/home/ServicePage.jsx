// Datos de citas, simulando una lista de registros
const appointments = [
    {
        id: 1026,
        technician: "Julian Andres Ramirez Peña",
        idNumber: "12345678",
        address: "Carrera 12 # 23-45 Barrio Corkidi, Bogotá D.C.",
        date: "23/08/2025",
        time: "2:00 pm",
        imgSrc: "/src/assets/images/services/imagen_servicio.png"
    },
    {
        id: 1026,
        technician: "Julian Andres Ramirez Peña",
        idNumber: "12345678",
        address: "Carrera 12 # 23-45 Barrio Corkidi, Bogotá D.C.",
        date: "23/08/2025",
        time: "2:00 pm",
        imgSrc: "/src/assets/images/services/imagen_servicio.png"
    },
    {
        id: 1026,
        technician: "Julian Andres Ramirez Peña",
        idNumber: "12345678",
        address: "Carrera 12 # 23-45 Barrio Corkidi, Bogotá D.C.",
        date: "23/08/2025",
        time: "2:00 pm",
        imgSrc: "/src/assets/images/services/imagen_servicio.png"
    },
    {
        id: 1026,
        technician: "Julian Andres Ramirez Peña",
        idNumber: "12345678",
        address: "Carrera 12 # 23-45 Barrio Corkidi, Bogotá D.C.",
        date: "23/08/2025",
        time: "2:00 pm",
        imgSrc: "/src/assets/images/services/imagen_servicio.png"
    },
    {
        id: 1026,
        technician: "Julian Andres Ramirez Peña",
        idNumber: "12345678",
        address: "Carrera 12 # 23-45 Barrio Corkidi, Bogotá D.C.",
        date: "23/08/2025",
        time: "2:00 pm",
        imgSrc: "/src/assets/images/services/imagen_servicio.png"
    },
    {
        id: 1026,
        technician: "Julian Andres Ramirez Peña",
        idNumber: "12345678",
        address: "Carrera 12 # 23-45 Barrio Corkidi, Bogotá D.C.",
        date: "23/08/2025",
        time: "2:00 pm",
        imgSrc: "/src/assets/images/services/imagen_servicio.png"
    },
];


const ServicePage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 pb-4">
            {/* Encabezado */}
            <h1 className="text-3xl font-bold text-gray-800 mt-8">Servicios</h1>

            {/* Contenedor de tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {appointments.map(({ id, technician, idNumber, address, date, time, imgSrc }) => (
                    <div key={id} className="bg-white rounded-lg shadow-md overflow-hidden w-80 p-4">
                        {/* Imagen de la cita */}
                        <img src="/src/assets/images/services/imagen_servicio.jpg" alt="Técnico trabajando" className="w-full h-40 object-cover rounded-md" />

                        {/* Información de la cita */}
                        <div className="mt-4">
                            <h2 className="text-xl font-semibold text-gray-700">Cita Adecuación N°{id}</h2>
                            <p className="text-gray-600 font-medium">Estado Servicio: En proceso</p>

                            {/* Datos importantes */}
                            <div className="mt-2 text-sm text-gray-600">
                                <p><strong>Técnico:</strong> {technician}</p>
                                <p><strong>CC:</strong> {idNumber}</p>
                                <p><strong>Dirección:</strong> {address}</p>
                                <p><strong>Fecha:</strong> {date}</p>
                                <p><strong>Hora:</strong> {time}</p>
                            </div>
                        </div>

                        {/* Botón de registro */}
                        <div className="mt-4 flex justify-between items-center">
                            <span className="text-red-600 font-semibold">ID {id}</span>
                            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                                Completar Registro
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ServicePage;