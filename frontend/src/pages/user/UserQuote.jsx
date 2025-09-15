import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

import QuoteCard from "../../components/QuoteFilterForm/QuoteCard";
import QuoteFilterForm from "../../components/QuoteFilterForm/QuoteFilterForm";
import EmptyState from "../../components/Common/EmptyState";
import fondo1 from "../../assets/images/home/imagen_fondo_nosotros.png";
import { fetchCotizacionesApi } from "../../service/quotes";

const UserQuotes = () => {
  const { usuario, authToken } = useAuth();

  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);

  // 🔄 Cargar cotizaciones del usuario al montar
  useEffect(() => {
    if (!usuario?.id || !authToken) return;

    const fetchUserQuotes = async () => {
      try {
        const filters = { clienteId: usuario.id };
        const data = await fetchCotizacionesApi(authToken, filters);
        setQuotes(data);
        setFilteredQuotes(data);
      } catch (error) {
        toast.error("Error al cargar cotizaciones");
        console.error("Error al obtener cotizaciones:", error);
      }
    };

    fetchUserQuotes();
  }, [usuario, authToken]);

  // ✅ Aceptar cotización
  const handleAccept = (id) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: "Aprobada" } : q))
    );
    toast.success("Cotización aceptada");
  };

  // ❌ Rechazar cotización
  const handleReject = (id) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: "Rechazada" } : q))
    );
    toast.error("Cotización rechazada");
  };

  // 👁 Ver más detalles
  const handleViewMore = (quote) => {
    console.log("Detalle de cotización:", quote);
  };

  // 🔎 Aplicar filtros desde el formulario
  const handleFilter = async (filters = {}) => {
    try {
      const filtrosConCliente = {
        ...filters,
        clienteId: usuario.id, // 🔒 siempre incluir clienteId
      };

      const data = await fetchCotizacionesApi(authToken, filtrosConCliente);
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
          <h1 className="font-bold md:text-6xl">Mis Cotizaciones</h1>
          <p className="md:text-xl py-4">
            Aquí puede revisar el estado y los detalles de todas sus cotizaciones.
            Acepte o rechace según corresponda.
          </p>
        </div>
      </div>

      {/* Filtros + lista */}
      <div className="relative z-10 rounded-t-3xl -mt-24 px-4 py-10 mx-10 text-white">
        <QuoteFilterForm onFilter={handleFilter} />

        <div className="grid gap-6 mt-6">
          {filteredQuotes.length === 0 ? (
            <EmptyState
              title="No existe cotización"
              description="La cotización que buscas no ha sido generada"
              icon="quotes"
            />
          ) : (
            filteredQuotes.map((q) => (
              <QuoteCard
                key={q.IdCotizacion}
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
