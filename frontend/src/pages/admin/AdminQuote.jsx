import { useState } from "react";
import QuoteCard from "../../components/QuoteFilterForm/QuoteCard";
import QuoteFilterForm from "../../components/QuoteFilterForm/QuoteFilterForm";
import fondo1 from "../../assets/images/home/imagen_fondo_nosotros.png";
import { toast } from "react-toastify";
import ButtonTechnicalVisits from "../../components/ButtonTechnicalVisits";

const mockQuotes = [
  {
    id: 5,
    totalAmount: 120000,
    description: "Inspección eléctrica de rutina",
    estado: "Pendiente",
    visitaTecnica: {
      clienteNombre: "Roberto Díaz",
      clienteIdentificacion: "111222333",
      direccion: "Av. Siempre Viva 742",
      servicio: "Inspección eléctrica",
      fecha: "2025-08-18",
      hora: "08:30",
      tecnicoNombre: "María Gómez",
    },
  },
  {
    id: 6,
    totalAmount: 300000,
    description: "Cambio completo de tablero eléctrico",
    estado: "Aceptada",
    visitaTecnica: {
      clienteNombre: "Fernanda Ríos",
      clienteIdentificacion: "444555666",
      direccion: "Calle 89 #12-45",
      servicio: "Cambio de tablero",
      fecha: "2025-08-19",
      hora: "15:00",
      tecnicoNombre: "Pedro Ramírez",
    },
  },
];

const AdminQuote = () => {
  const [quotes, setQuotes] = useState(mockQuotes);
  const [filteredQuotes, setFilteredQuotes] = useState(mockQuotes);

  const handleEdit = (id) => {
    console.log("Editar cotización:", id);
    toast.info("Abriendo formulario para editar cotización");
    // Aquí iría el modal de edición
  };

  const handleComplete = (id) => {
    setQuotes((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, status: "Completada" } : q
      )
    );
    toast.success("Servicio marcado como completado");
  };

  const handleViewMore = (quote) => {
    console.log("Detalle de cotización:", quote);
    // Aquí abrir modal o navegar a detalle
  };

  // 🔎 Filtro
  const handleFilter = (filters) => {
    let result = [...quotes];

    if (filters.fecha) {
      result = result.filter((q) => q.visitaTecnica.fecha === filters.fecha);
    }

    if (filters.tipoServicioId?.length > 0) {
      result = result.filter((q) =>
        filters.tipoServicioId.some((id) =>
          q.visitaTecnica.servicio
            .toLowerCase()
            .includes(String(id).toLowerCase())
        )
      );
    }

    if (filters.clienteIdentificacion) {
      result = result.filter(
        (q) =>
          q.visitaTecnica.clienteIdentificacion ===
          filters.clienteIdentificacion
      );
    }

    setFilteredQuotes(result);
  };

  return (
    <div className="min-h-screen bg-gray-200 relative max-w-7xl mx-auto">
      {/* Banner */}
      <div className="relative">
        <img
          src={fondo1}
          className="w-full h-[500px] object-cover opacity-90"
          alt="Fondo"
        />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center text-gray-200">
          <h1 className="font-bold md:text-6xl">Cotizaciones Administrador</h1>
          <p className="md:text-xl py-4">
            Gestione todas las cotizaciones, edítelas o márcalas como completadas.
          </p>
        </div>
      </div>

      {/* Filtros + lista */}
      <div className="relative z-10 rounded-t-3xl -mt-24 px-4 py-10 mx-10 text-white">
    
        
        {/*Formulario de filtros */}
        <QuoteFilterForm onFilter={handleFilter} />

        <div className="grid gap-6 mt-6">
          {filteredQuotes.length === 0 ? (
            <p>No hay cotizaciones que coincidan con los filtros.</p>
          ) : (
            filteredQuotes.map((q) => (
              <QuoteCard
                key={q.id}
                quote={q}
                rol="admin"
                onEdit={handleEdit}
                onApprove={handleComplete}
                onViewMore={handleViewMore}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminQuote;
