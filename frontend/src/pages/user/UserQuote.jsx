import { useState } from "react";
import QuoteCard from "../../components/QuoteFilterForm/QuoteCard";
import QuoteFilterForm from "../../components/QuoteFilterForm/QuoteFilterForm";
import fondo1 from "../../assets/images/home/imagen_fondo_nosotros.png";
import { toast } from "react-toastify";
import EmptyState from "../../components/Common/EmptyState";

const mockQuotes = [
  {
    id: 1,
    totalAmount: 150000,
    description: "Instalación eléctrica básica",
    status: "Pendiente",
    visitaTecnica: {
      clienteNombre: "Juan Pérez",
      clienteIdentificacion: "123456789",
      direccion: "Calle 123 #45-67",
      servicio: "Instalación eléctrica",
      fecha: "2025-08-15",
      hora: "14:30",
      tecnicoNombre: "Carlos López",
    },
  },
  {
    id: 2,
    totalAmount: 80000,
    description: "Mantenimiento general del sistema",
    status: "Aceptada",
    visitaTecnica: {
      clienteNombre: "Ana Torres",
      clienteIdentificacion: "987654321",
      direccion: "Carrera 8 #12-34",
      servicio: "Mantenimiento general",
      fecha: "2025-08-16",
      hora: "09:00",
      tecnicoNombre: "Luis Martínez",
    },
  },
];

const UserQuotes = () => {
  const [quotes, setQuotes] = useState(mockQuotes);
  const [filteredQuotes, setFilteredQuotes] = useState(mockQuotes);

  const handleAccept = (id) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: "Aprobada" } : q))
    );
    toast.success("Cotización aceptada");
  };

  const handleReject = (id) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: "Rechazada" } : q))
    );
    toast.error("Cotización rechazada");
  };

  const handleViewMore = (quote) => {
    console.log("Detalle de cotización:", quote);
    // Aquí puedes abrir un modal o navegar a la página de detalle
  };

  // 🔎 Función para aplicar filtros
  const handleFilter = (filters) => {
    let result = [...quotes];

    if (filters.fecha) {
      result = result.filter(
        (q) => q.visitaTecnica.fecha === filters.fecha
      );
    }

    if (filters.tipoServicioId?.length > 0) {
      result = result.filter((q) =>
        filters.tipoServicioId.some((id) =>
          q.visitaTecnica.servicio.toLowerCase().includes(String(id).toLowerCase())
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
      
      <div className="relative">
        <img
          src={fondo1}
          className="w-full h-[350px] object-cover opacity-90"
          alt="Fondo"
        />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center text-gray-200">
          <h1 className="font-bold md:text-6xl">Mis Cotizaciones</h1>
          <p className="md:text-xl py-4">
            Aquí puede revisar el estado y los detalles de todas sus cotizaciones.
            Acepte o rechace según corresponda.
          </p>
        </div>
      </div>

      {/* Contenedor de filtros + lista */}
      <div className="relative z-10 rounded-t-3xl -mt-24 px-4 py-10 mx-10 text-white">
        
        {/* 🔽 Filtro */}
        <QuoteFilterForm onFilter={handleFilter} />

        {/* Lista */}
        <div className="grid gap-6 mt-6">
          {filteredQuotes.length === 0 ? (
            <EmptyState
              title="No existe cotización"
              description="la cotización que buscas no ha sido generada"
              icon="quotes"
            />
          ) : (
            filteredQuotes.map((q) => (
              <QuoteCard
                key={q.id}
                quote={q}
                rol="usuario"
                onAccept={handleAccept}
                onReject={handleReject}
                onViewMore={handleViewMore}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserQuotes;
