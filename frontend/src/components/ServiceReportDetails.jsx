import React from "react";

const ServiceReportDetail = ({ servicio }) => {
  if (!servicio) return <p className="text-center text-gray-500">No hay datos disponibles.</p>;

  const clienteNombre = `${servicio.ClienteNombres} ${servicio.ClienteApellidos}`;
  const tecnicoNombre = `${servicio.TecnicoNombres} ${servicio.TecnicoApellidos}`;
  const fecha = new Date(servicio.FechaServicio).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const horaInicial = servicio.HoraInicial?.slice(0, 5) || "No registrada";
  const horaFinal = servicio.HoraFinal?.slice(0, 5) || "No registrada";

  return (
    <div className="bg-white p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Informe completo del servicio</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-black"><strong>Cliente:</strong> {clienteNombre}</p>
          <p className="text-black"><strong>Identificación:</strong> {servicio.ClienteIdentificacion}</p>
          <p className="text-black"><strong>Dirección:</strong> {servicio.DireccionServicio}</p>
        </div>
        <div>
          <p className="text-black"><strong>Técnico:</strong> {tecnicoNombre}</p>
          <p className="text-black"><strong>Fecha:</strong> {fecha}</p>
          <p className="text-black"><strong>Horario:</strong> {horaInicial} - {horaFinal}</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-black"><strong>Tipo de servicio:</strong> {servicio.TiposServicio}</p>
        <p className="text-black"><strong>Estado:</strong> {servicio.EstadoServicioDescripcion}</p>
        <p className="text-black"><strong>Descripción:</strong> {servicio.Descripcion}</p>
        <p className="text-black"><strong>Diagnóstico:</strong> {servicio.DiagnosticoDescripcion}</p>
        <p className="text-black"><strong>Medidas tomadas:</strong> {servicio.Medidas}</p>
        <p className="text-black"><strong>Materiales utilizados:</strong> {servicio.Materiales}</p>
        <p className="text-black"><strong>Observaciones:</strong> {servicio.Observaciones}</p>
        <p className="text-black"><strong>Garantía ofrecida:</strong> {servicio.Garantia}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-black"><strong>Costo de mano de obra:</strong> ${Number(servicio.CostoManoObra).toLocaleString()}</p>
          <p className="text-black"><strong>Costo de materiales:</strong> ${Number(servicio.CostoMateriales).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-green-700">
            <strong>Total del servicio:</strong> ${Number(servicio.PrecioTotal).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="font-semibold mb-2 text-black">Foto antes del servicio:</p>
          <img
            src={`/uploads/${servicio.FotosAntes}`}
            alt="Foto antes"
            className="rounded shadow-md w-full h-auto object-cover"
          />
        </div>
        <div>
          <p className="font-semibold mb-2 text-black">Foto después del servicio:</p>
          <img
            src={`/uploads/${servicio.FotosDespues}`}
            alt="Foto después"
            className="rounded shadow-md w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceReportDetail;
