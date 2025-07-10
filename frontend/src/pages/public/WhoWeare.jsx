const WhoWeare = () => {
  return (
    <div className="min-h-screen bg-gray-200 relative max-w-7xl mx-auto">
      <div className="relative">
        <img
          src="src/assets/images/home/imagen_fondo.png"
          className="w-full h-[400px] object-cover opacity-80"
          alt="Fondo eléctrico"
        />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center text-black font-bold text-4xl md:text-5xl">
          <h1>Soluciones</h1>
          <h1>Eléctricas HH</h1>
        </div>
      </div>

      <div className="relative z-10 bg-black rounded-t-3xl -mt-24 px-4 py-10 mx-10 sm:mx-20 xl:mx-30 text-white shadow-xl">
        <img
          src="src/assets/images/navbar/logo_miat_rojo.png"
          alt="Logo ElectroSoluciones"
          className="w-50 h-40 mx-auto mb-6"
        />

        {/* Título */}
        <h2 className="text-3xl font-bold text-center mb-4">¿Quiénes Somos?</h2>

        {/* Primer párrafo */}
        <p className="text-sm sm:text-base leading-relaxed text-justify">
          La empresa ElectroSoluciones fue fundada hace más de una década con el
          firme propósito de ofrecer servicios de alta calidad en el sector
          eléctrico. Desde sus inicios, ha demostrado un compromiso constante
          con la excelencia, lo que le ha permitido establecerse como un
          referente en el mercado. Con una experiencia acumulada de más de 10
          años, la empresa ha logrado consolidar un equipo de técnicos altamente
          especializados, que cuentan con una amplia formación y conocimientos
          en diversas áreas del sector eléctrico. Estos profesionales han sido
          capacitados para enfrentar cualquier tipo de reto, desde instalaciones
          eléctricas residenciales hasta complejos sistemas industriales,
          garantizando siempre soluciones eficientes y seguras.
        </p>

        {/* Imagen 1 */}
        <img
          src="src/assets/images/home/imagen_fondo_nosotros.png"
          alt="Ilustración técnicos"
          className="w-full h-auto my-10 rounded"
        />

        {/* Segundo bloque */}
        <h2 className="text-2xl font-bold text-center mb-4">
          ¿Por Qué Deberías Escogernos?
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-justify">
          Nuestra empresa de soluciones eléctricas, aunque pequeña, se distingue
          por su compromiso, atención personalizada y calidad en cada servicio.
          Al ser una empresa en crecimiento, ofrecemos un trato directo y
          cercano con cada cliente, adaptándonos a sus necesidades específicas
          con rapidez y eficiencia. Nuestro equipo está conformado por técnicos
          capacitados que brindan soluciones profesionales en mantenimiento,
          instalaciones, diagnóstico y mejora de sistemas eléctricos. Elegirnos
          significa contar con un servicio confiable, transparente y enfocado en
          resultados reales, donde cada cliente es nuestra prioridad.
        </p>

        {/* Tercer bloque */}
        <h2 className="text-2xl font-bold text-center mt-10 mb-4">
          Nuestro Compromiso
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-justify">
          A lo largo de su trayectoria, ElectroSoluciones ha trabajado con un
          enfoque en la innovación y la adaptación a las necesidades cambiantes
          del mercado. Esto le ha permitido ampliar su portafolio de servicios y
          ofrecer soluciones integrales que van desde el diseño de proyectos
          eléctricos hasta el mantenimiento preventivo y correctivo de
          instalaciones. La empresa también se ha destacado por su compromiso
          con la sostenibilidad, implementando prácticas que promueven el uso
          eficiente de la energía y la adopción de tecnologías limpias. Gracias
          a su dedicación y al talento de su equipo, Soluciones HH ha logrado
          ganar la confianza de una amplia base de clientes, que incluye tanto a
          pequeñas empresas como a grandes corporaciones. Su enfoque en la
          calidad, la seguridad y la satisfacción del cliente ha sido clave para
          su crecimiento.
        </p>
        <img
          src="src/assets/images/home/vistobueno.png"
          alt="Ilustración técnicos"
          className="relative max-w-7xl mx-auto"
        />
      </div>
    </div>
  );
};

export default WhoWeare;
