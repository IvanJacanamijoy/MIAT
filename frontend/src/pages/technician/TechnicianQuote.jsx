import { useState } from "react";
import QuoteCard from "../../components/QuoteFilterForm/QuoteCard";
import QuoteFilterForm from "../../components/QuoteFilterForm/QuoteFilterForm";
import fondo1 from "../../assets/images/home/imagen_fondo_nosotros.png";
import { toast } from "react-toastify";

const mockQuotes = [
  {
    id: 3,
    totalAmount: 500000,
    description: "Instalación de panel solar",
    status: "Pendiente",
    visitaTecnica: {
      clienteNombre: "Juan Pérez",
      clienteIdentificacion: "123456789",
      direccion: "Calle 123 #45-67, Bogotá",
      servicio: "Instalación de panel solar",
      fecha: "2025-08-20",
      hora: "10:00",
      tecnicoNombre: "Tú",
    },
  },
  {
    id: 4,
    totalAmount: 250000,
    description: "Reparación de cableado",
    status: "Aceptada",
    visitaTecnica: {
      clienteNombre: "Ana Gómez",
      clienteIdentificacion: "987654321",
      direccion: "Carrera 10 #20-30, Medellín",
      servicio: "Reparación de cableado",
      fecha: "2025-08-22",
      hora: "16:00",
      tecnicoNombre: "Tú",
    },
  },
];

const TechnicianQuote = () => {
  const [quotes, setQuotes] = useState(mockQuotes);
  const [filteredQuotes, setFilteredQuotes] = useState(mockQuotes);

  const handleEdit = (id) => {
    console.log("Editar cotización:", id);
    toast.info("Abriendo formulario para editar cotización");
    // Aquí abrir modal de edición
  };

  const handleComplete = (id) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: "Completada" } : q))
    );
    toast.success("Servicio marcado como completado");
  };

  const handleViewMore = (quote) => {
    console.log("Detalle de cotización:", quote);
    // Aquí abrir modal o navegar a detalle
  };

  // 🔎 Función para filtrar
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
          <h1 className="font-bold md:text-6xl">Cotizaciones Técnicas</h1>
          <p className="md:text-xl py-4">
            Administre y edite sus cotizaciones, y márquelas como completadas cuando corresponda.
          </p>
        </div>
      </div>

      {/* Filtros + lista de cotizaciones */}
      <div className="relative z-10 rounded-t-3xl -mt-24 px-4 py-10 mx-10 text-white">
        
        {/* 🔽 Formulario de filtros */}
        <QuoteFilterForm onFilter={handleFilter} />

        <div className="grid gap-6 mt-6">
          {filteredQuotes.length === 0 ? (
            <p>No hay cotizaciones que coincidan con los filtros.</p>
          ) : (
            filteredQuotes.map((q) => (
              <QuoteCard
                key={q.id}
                quote={q}
                rol="tecnico"
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

export default TechnicianQuote;
