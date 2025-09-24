import { useEffect, useState } from "react";
import PublicServiceFilter from "../../components/PublicServiceFilter";
import ServiceListCard from "../../components/ServiceListCard";
import { motion } from "framer-motion";
import { fadeIn } from "../../Animations/variants";
import EmptyState from "../../components/Common/EmptyState";

// Importar imágenes del carrusel de servicios
import servicio1 from "../../assets/images/servicecarousel/servicio_1.webp";
import servicio2 from "../../assets/images/servicecarousel/servicio_2.webp";
import servicio3 from "../../assets/images/servicecarousel/servicio_3.webp";

const serviciosData = [
  {
    id: 1,
    titulo: "Aumento de carga",
    descripcion:
      "Incrementa la capacidad eléctrica de tu hogar u oficina con seguridad y certificación.",
    imageUrl: servicio1,
    tipoServicioId: 1,
  },
  {
    id: 2,
    titulo: "Instalaciones eléctricas",
    descripcion:
      "Instalaciones confiables y modernas para proyectos residenciales o industriales.",
    imageUrl: servicio2,
    tipoServicioId: 4,
  },
  {
    id: 3,
    titulo: "Trámites y diseños",
    descripcion:
      "Asesoría profesional en legalización, diseño de redes y licencias eléctricas.",
    imageUrl: servicio3,
    tipoServicioId: 8,
  },
  // ... agrega más servicios si deseas
];

const HomeService = () => {
  const [servicios, setServicios] = useState(serviciosData);
  const [serviciosFiltrados, setServiciosFiltrados] = useState(serviciosData);

  useEffect(() => {
    setServiciosFiltrados(servicios);
  }, [servicios]);

  const handleFiltrar = (filtros) => {
    if (filtros.tipoServicioId?.length === 0) {
      setServiciosFiltrados(servicios);
      return;
    }

    const filtrados = servicios.filter((servicio) =>
      filtros.tipoServicioId.includes(servicio.tipoServicioId)
    );

    setServiciosFiltrados(filtrados);
  };

  return (
    <div className="min-h-screen bg-gray-200 relative max-w-7xl mx-auto px-6 py-12">
      <section className="relative w-full h-[200px] bg-cover bg-center flex items-center justify-center rounded-2xl overflow-hidden shadow-lg mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-red-200 via-gray-200 to-red-200 animate-pulse"></div>
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ amount: 0.2 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold py-2 bg-red-500 bg-clip-text text-transparent drop-shadow-lg">
            Nuestros Servicios
          </h1>
          <p className="mt-4 text-lg md:text-xl text-black max-w-2xl mx-auto">
            En MIAT ofrecemos soluciones. ¡Descubre lo que tenemos para ti!
          </p>
        </motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-2">
        <motion.div
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          animate="show"
        >
          <PublicServiceFilter onFilter={handleFiltrar} />
        </motion.div>

        <div className="mt-6 space-y-6">
          {serviciosFiltrados.length > 0 ? (
            serviciosFiltrados.map((servicio) => (
              <ServiceListCard key={servicio.id} servicio={servicio} />
            ))
          ) : (
            <EmptyState
              title="No se encontro"
              description="Actualmente no realizamos el servicio que buscas."
              icon="notfound"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeService;
