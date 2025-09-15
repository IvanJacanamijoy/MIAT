import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; // ✅ Importación corregida
import { toast } from "react-toastify";

import QuoteCard from "../../components/QuoteFilterForm/QuoteCard";
import QuoteFilterForm from "../../components/QuoteFilterForm/QuoteFilterForm";
import EmptyState from "../../components/Common/EmptyState";

import fondo1 from "../../assets/images/home/imagen_fondo_nosotros.png";
import { fetchCotizacionesApi } from "../../service/quotes"; // ✅ Asegúrate de tener este import correctamente

const TechnicianQuote = () => {
  const { usuario, authToken } = useAuth();

  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);

  // 🔄 Buscar cotizaciones al cargar
  useEffect(() => {
    if (!authToken || !usuario?.id) return;

    const fetchQuotes = async () => {
      const filters = { idTecnico: usuario.id };
      // console.log("Enviando filtros a fetchCotizacionesApi:", filters);

      try {
        const data = await fetchCotizacionesApi(authToken, filters);
        setQuotes(data);
        setFilteredQuotes(data);
      } catch (error) {
        toast.error("Error al cargar cotizaciones");
        console.error("Error al obtener cotizaciones:", error);
      }
    };

    fetchQuotes();
  }, [authToken, usuario]);



  const handleEdit = (id) => {
    toast.info("Abriendo formulario para editar cotización");
    console.log("Editar cotización:", id);
  };

  const handleComplete = (id) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: "Completada" } : q))
    );
    toast.success("Servicio marcado como completado");
  };

  const handleViewMore = (quote) => {
    console.log("Detalle de cotización:", quote);
  };

  // 🔎 Filtro
  const handleFilter = async (filters = {}) => {
    try {
      if (!usuario?.id || !authToken) return;

      // 🔒 Siempre incluir el id del técnico
      const filtrosConTecnico = {
        ...filters,
        idTecnico: usuario.id,
      };

      console.log("Enviando filtros al backend (rol técnico):", filtrosConTecnico);

      const data = await fetchCotizacionesApi(authToken, filtrosConTecnico);
      setFilteredQuotes(data);
    } catch (error) {
      toast.error("Error al aplicar filtros");
      console.error("Error en handleFilter:", error);
    }
  };



  return (
    <div className="min-h-screen bg-gray-200 relative max-w-7xl mx-auto">
      {/* Banner */}
      <div className="relative">
        <img
          src={fondo1}
          className="w-full h-[350px] object-cover opacity-90"
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
        <QuoteFilterForm onFilter={handleFilter} />

        <div className="grid gap-6 mt-6">
          {filteredQuotes.length === 0 ? (
            <EmptyState
              title="No hay cotizaciones"
              description="No hay cotizaciones que coincidan con los filtros."
              icon="quotes"
            />
          ) : (
            filteredQuotes.map((q) => (
              <QuoteCard
                key={q.IdCotizacion}
                quote={q}
                rol="tecnico"
                onEdit={handleEdit}
                onComplete={handleComplete}
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
