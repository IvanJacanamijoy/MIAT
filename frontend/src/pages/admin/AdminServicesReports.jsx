import React from 'react';
import fondo1 from "../../assets/images/home/imagen_fondo_nosotros.png";

const AdminReportesDashboard = () => {
  // Datos de ejemplo para la tabla
  const serviciosDeEjemplo = [
    {
            id: "SRV-001",
            tecnico: "Luis Posada",
            cliente: "Empresa Agropecuaria",
            fecha: "2025-04-09",
            estado: "Completado",
        },

        {
            id: "SRV-002",
            tecnico: "Jorge Sneyder",
            cliente: "Tienda Local Fruver",
            fecha: "2025-05-09",
            estado: "Completado",
        },

        {
            id: "SRV-003",
            tecnico: "Ivan Cheverry",
            cliente: "Restaruante la 72",
            fecha: "2025-08-09",
            estado: "En Proceso",
        },

        {
            id: "SRV-004",
            tecnico: "Sara Garzon",
            cliente: "Claudia - Residencia",
            fecha: "2025-07-09",
            estado: "En Proceso",
        },

        {
            id: "SRV-001",
            tecnico: "Albert Grayson",
            cliente: "Empresa Multinacional",
            fecha: "2025-10-09",
            estado: "Pendiente",
        },
    ];


  return (
    <div className="min-h-screen bg-gray-200 relative max-w-7xl mx-auto">
      {/* Banner */}
      <div className="relative">
        <img
          src={fondo1}
          className="w-full h-[500px] object-cover opacity-90"
          alt="Fondo"
        />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center text-white drop-shadow-2xl">
          <h1 className="font-bold md:text-6xl">Administración de Servicios e Informes</h1>
          <p className="md:text-xl py-4">
            Gestione todos los servicios e informes técnicos.
          </p>
        </div>
      </div>

      {/* Tabla de reportes */}
      <div className="relative z-10 rounded-t-3xl -mt-24 px-4 py-10 mx-10 text-white">
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          <p className="text-lg text-center text-white mb-6">
            Aquí podrás visualizar una tabla con los servicios e informes generados por los técnicos.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID de Servicio
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Técnico
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Cliente
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Fecha
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Estado
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-gray-900">
                {serviciosDeEjemplo.map((servicio) => (
                  <tr key={servicio.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{servicio.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{servicio.tecnico}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{servicio.cliente}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{servicio.fecha}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        servicio.estado === "Completado" ? "bg-green-100 text-green-800" :
                        servicio.estado === "Pendiente" ? "bg-yellow-100 text-yellow-800" :
                        "bg-blue-100 text-blue-800"
                      }`}>
                        {servicio.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4">Ver</a>
                      <a href="#" className="text-red-600 hover:text-red-900">Eliminar</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReportesDashboard;
