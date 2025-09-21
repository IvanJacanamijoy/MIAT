import { useState, useEffect } from "react";
import QuoteCard from "../../components/QuoteFilterForm/QuoteCard";
import { motion } from "framer-motion";
import QuoteFilterForm from "../../components/QuoteFilterForm/QuoteFilterForm";
import fondo1 from "../../assets/images/home/imagen_fondo_nosotros.png";
import { toast } from "react-toastify";
import ButtonTechnicalVisits from "../../components/ButtonTechnicalVisits";
import { useAuth } from "../../context/AuthContext";
import { fetchCotizacionesApi } from "../../service/cotizacion";
import EmptyState from "../../components/Common/EmptyState";
import PendingDiagnoses from "../../components/PendingDiagnoses"

const AdminQuote = () => {
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const { usuario, authToken } = useAuth();

  // 🔄 Buscar cotizaciones al cargar
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const data = await fetchCotizacionesApi(authToken);
        setQuotes(data);
        setFilteredQuotes(data);
      } catch (error) {
        toast.error("Error al cargar cotizaciones");
        console.error("Error al obtener cotizaciones:", error);
      }
    };

    fetchQuotes();
  }, [authToken]);

  const handleEdit = (id) => {
    console.log("Editar cotización:", id);
    toast.info("Abriendo formulario para editar cotización");
    // Aquí iría el modal de edición
  };

  const handleComplete = (id) => {
    setQuotes((prev) =>
      prev.map((q) =>
        q.IdCotizacion === id ? { ...q, EstadoDescripcion: "Completada" } : q
      )
    );
    toast.success("Servicio marcado como completado");
  };

  const handleViewMore = (quote) => {
    console.log("Detalle de cotización:", quote);
    // Aquí abrir modal o navegar a detalle
  };

  // 🔎 Filtro
  const handleFilter = async (filters) => {
  try {
    console.log("Enviando filtros al backend:", filters);
    const data = await fetchCotizacionesApi(authToken, filters);
    console.log(data);
    setFilteredQuotes(data);
  } catch (error) {
    toast.error("Error al aplicar filtros");
    console.error("Error en handleFilter:", error);
  }
};


  return (
    <div className="min-h-screen bg-gray-200 relative max-w-7xl mx-auto">
      {/* Banner */}
      <section className="relative isolate">
        <img
          src={fondo1}
          alt="Fondo eléctrico"
          className="h-[200px] sm:h-[260px] md:h-[320px] w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 grid place-items-center px-4 text-center"
        >
          <div className="max-w-3xl sm:max-w-4xl">
            <h1 className="text-white tracking-tight font-extrabold text-2xl sm:text-3xl md:text-5xl">
              Cotizaciones
            </h1>
            <p className="text-white/90 mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg">
              Gestione todas las cotizaciones, edítelas o márcalas como
              completadas.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Filtros + lista */}
      <div className="relative z-10 rounded-t-3xl -mt-24 px-4 py-10 mx-10 text-white">
        <PendingDiagnoses />
        <QuoteFilterForm onFilter={handleFilter} />

        <div className="grid gap-6 mt-6">
          {filteredQuotes.length === 0 ? (
            <EmptyState
              title="No hay cotizaciones disponibles"
              description="Aún no se han generado cotizaciones o no coinciden con los filtros aplicados."
              icon="quotes"
            />
          ) : (
            filteredQuotes.map((q) => (
              <QuoteCard
                key={q.IdCotizacion}
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
