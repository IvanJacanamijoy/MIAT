import servicio1 from "../../assets/images/servicecarousel/servicio_1.png";

const VisitCard = ({
  visit,
  rol,
  onCancel,
  onReprogram,
  onAssignTechnician,
  onGenerateQuote,
  onGenerateDiagnosis,
  technicians = [],
}) => {
  const tieneDiagnostico = visit.TieneDiagnostico === 1 || visit.TieneDiagnostico === true;
  const tieneCotizacion = visit.TieneCotizacion === 1 || visit.TieneCotizacion === true;

  const datePart = visit.Fecha ? visit.Fecha.split("T")[0] : "";
  const timePart = visit.Hora || "";
  let visitDateTime = null;
  if (datePart && timePart) {
    visitDateTime = new Date(`${datePart}T${timePart}`);
    if (isNaN(visitDateTime.getTime())) visitDateTime = null;
  }
  const now = new Date();
  const diffInHours = visitDateTime ? (visitDateTime - now) / (1000 * 60 * 60) : -Infinity;
  const canModify = diffInHours >= 6;

  const formattedDate =
    visitDateTime && !isNaN(visitDateTime.getTime())
      ? visitDateTime.toLocaleDateString("es-CO", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Fecha no disponible";
  const formattedTime =
    visitDateTime && !isNaN(visitDateTime.getTime())
      ? visitDateTime.toLocaleTimeString("es-CO", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : "Hora no disponible";

  const estadoMap = {
    3: { label: "En proceso", color: "bg-blue-200 text-blue-800" },
    4: { label: "Finalizado", color: "bg-green-200 text-green-800" },
    5: { label: "Pendiente", color: "bg-yellow-200 text-yellow-800" },
    6: { label: "Aceptada", color: "bg-purple-200 text-purple-800" },
    7: { label: "Cancelada", color: "bg-red-200 text-red-800" },
  };
  const estadoActual =
    estadoMap[visit.IdEstado] || {
      label: "Desconocido",
      color: "bg-gray-200 text-gray-800",
    };

  const clienteNombreCompleto =
    visit.usuario?.nombre ||
    (visit.ClienteNombres && visit.ClienteApellidos
      ? `${visit.ClienteNombres} ${visit.ClienteApellidos}`
      : "Desconocido");
  const tecnicoNombreCompleto =
    visit.tecnico?.nombre ||
    (visit.TecnicoNombres && visit.TecnicoApellidos
      ? `${visit.TecnicoNombres} ${visit.TecnicoApellidos}`
      : "Por asignar");

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
      <div className="w-full md:w-1/3">
        <img
          src={servicio1}
          alt="Visita técnica"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
          <div>
            <h3 className="font-semibold text-lg text-black">
              {visit.TiposServicioCita || "Servicio General"}
            </h3>
            <span
              className={`inline-block text-xl px-2 py-1 rounded-full mt-1 ${estadoActual.color}`}
            >
              {estadoActual.label}
            </span>
          </div>
        </div>

        <div className="bg-gray-200 p-3 rounded text-base my-auto">
          <p className="text-black"><strong>Dirección:</strong> {visit.Direccion}</p>
          <p className="text-black"><strong>Fecha:</strong> {formattedDate}</p>
          <p className="text-black"><strong>Hora:</strong> {formattedTime}</p>
          <p className="text-black"><strong>Solicitante:</strong> {clienteNombreCompleto}</p>
          <p className="text-black">
            <strong>Técnico:</strong>{" "}
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
              visit.TecnicoNombres ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
              {visit.TecnicoNombres
                ? `${visit.TecnicoNombres} ${visit.TecnicoApellidos}`
                : "No asignado"}
            </span>
          </p>

          <div className="flex gap-2 mt-2">
            {tieneDiagnostico && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                Diagnóstico listo
              </span>
            )}
            {tieneCotizacion && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                Cotización generada
              </span>
            )}
          </div>
        </div>

        {visit.IdEstado !== 7 && (
          <div className="flex flex-wrap gap-3 mt-4 justify-around">
            {(rol === "admin" || rol === "usuario") && (
              <>
                <button
                  className={`px-4 py-2 rounded font-bold ${
                    canModify
                      ? "bg-red-500 hover:bg-red-700 text-white cursor-pointer"
                      : "bg-gray-400 text-white cursor-not-allowed"
                  }`}
                  disabled={!canModify}
                  onClick={() => onCancel?.(visit.IdCita)}
                >
                  Cancelar
                </button>
                <button
                  className={`px-4 py-2 rounded font-bold ${
                    canModify
                      ? "bg-blue-500 hover:bg-blue-700 cursor-pointer text-white"
                      : "bg-gray-400 text-white cursor-not-allowed"
                  }`}
                  disabled={!canModify}
                  onClick={() => onReprogram?.(visit)}
                >
                  Reprogramar
                </button>
              </>
            )}
            {(rol === "admin" || rol === "tecnico") &&
              (!tieneDiagnostico || !tieneCotizacion) && (
                <button
                  className="bg-yellow-600 hover:bg-yellow-700 text-white cursor-pointer p-2 rounded-md"
                  onClick={() => onGenerateDiagnosis?.(visit)}
                >
                  {tieneDiagnostico ? "Generar cotización" : "Generar diagnóstico / cotización"}
                </button>
              )}
            {rol === "admin" && (
              <button
                className="px-4 py-2 rounded font-bold bg-blue-500 hover:bg-blue-700 cursor-pointer text-white"
                onClick={() => onAssignTechnician?.(visit)}
              >
                {visit.IdTecnico ? "Reasignar técnico" : "Asignar técnico"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitCard;
