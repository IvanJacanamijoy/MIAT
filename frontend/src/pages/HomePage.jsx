import { ClockIcon } from '@heroicons/react/24/outline';
import Form from '../components/Form'
import { ServiceCarousel } from '../components/ServiceCarousel';


const HomePage = () => {
  const carouselItems = [
    {
      titulo: "Servicio Eléctrico Residencial",
      descripcion: "Soluciones completas para tu hogar con garantía de 2 años",
      imageUrl: "/src/assets/images/servicecarousel/servicio_1.png",
      textoBoton: "Ver Mas"
    },
    {
      titulo: "Servicio Eléctrico otro",
      descripcion: "Soluciones completas para tu hogar con garantía de 2 años",
      imageUrl: "/src/assets/images/servicecarousel/servicio_2.png",
      textoBoton: "Ver Mas"
    },
    {
      titulo: "Servicio otro Residencial",
      descripcion: "Soluciones completas para tu hogar con garantía de 2 años",
      imageUrl: "/src/assets/images/servicecarousel/servicio_3.png",
      textoBoton: "Ver Mas"
    },
    {
      titulo: "Servicio Eléctrico Residencial",
      descripcion: "Soluciones completas para tu hogar con garantía de 2 años",
      imageUrl: "/src/assets/images/servicecarousel/servicio_1.png",
      textoBoton: "Ver Mas"
    },
    {
      titulo: "Servicio Eléctrico otro",
      descripcion: "Soluciones completas para tu hogar con garantía de 2 años",
      imageUrl: "/src/assets/images/servicecarousel/servicio_2.png",
      textoBoton: "Ver Mas"
    },
    {
      titulo: "Servicio otro Residencial",
      descripcion: "Soluciones completas para tu hogar con garantía de 2 años",
      imageUrl: "/src/assets/images/servicecarousel/servicio_3.png",
      textoBoton: "Ver Mas"
    }
  ];


  return (
    <div className='flex flex-col items-center'>

      <section className="
      relative 
      lg:h-[500px] 
      md:w-[945px] 
      lg:w-[1280px]
      max-w-full
      ">
        {/* Capa de fondo con opacidad */}
        <div
          className="absolute inset-0 bg-[url(src/assets/images/home/imagen_fondo.png)] 
    bg-local bg-center bg-cover backface-hidden opacity-70 z-0"
        ></div>

        {/* Contenido principal */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 h-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Texto principal */}
              <div className="">
                <h2 className="text-4xl font-bold text-gray-950 mb-6">Calidad y precisión en cada conexión</h2>
                <p className="text-lg text-white mb-8 font-semibold">
                  Cotiza y agenda tu servicio de manera rápida y confiable, con la mejor atención y el respaldo de técnicos altamente experimentados. Garantizamos soluciones eléctricas seguras y de calidad para tu tranquilidad.
                </p>
              </div>

              {/* Formulario de inicio de sesión */}
              <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg py-12">
                <Form action="#" styles="space-y-2" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Seccion de "Agenda Tu servicio" */}

      <section className="
      mx-auto 
      max-h-screen 
      grid grid-cols-2 
      bg-white  
      h-[500px] 
      md:w-[945px] 
      lg:w-[1280px]
      max-w-full">
        <div className="my-auto flex flex-col px-4 sm:px-10 py-4 col-span-2 md:col-span-1">
          <h2 className='text-4xl lg:text-7xl font-bold'>
            Agenda Tu Servicio
          </h2>
          <p className='py-6 text-lg font-semibold'>
            Agenda el servicio que necesitas y recibe una visita técnica para evaluar tu requerimiento. Nuestro equipo especializado realizará un análisis detallado y te proporcionará una cotización precisa para continuar con la solución más adecuada.
          </p>
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors justify-center max-w-xs mx-auto">
            {/* icono de reloj */}
            <ClockIcon className="h-5 w-5 mr-2" />
            ¡Agenda AQUI!
          </button>
        </div>
        <img src="/src/assets/images/home/imagen_fondo_agendar.png" alt="" className='max-h-screen hidden md:block lg:ml-5' />
      </section>


      {/* seccion carrucel de servicios */}
      <section className='
        bg-[url(src/assets/images/home/imagen_fondo_servicios.png)] bg-local
        bg-cover
        bg-center
        max-w-full
        h-[560px]
        md:w-[945px]
        lg:w-[1280px]
        '>
        <ServiceCarousel items={carouselItems} />
      </section>

      {/* seccion nose revisar */}
      <section className='
        bg-[url(src/assets/images/home/imagen_fondo_nosotros.png)] bg-local
        bg-cover
        bg-center
        max-w-full
        h-[560px]
        w-full
        md:w-[945px]
        lg:w-[1280px]
        flex
        justify-center
        items-center'>
        <div className='text-center w-2xl lg:w-8xl xl:w-4xl flex flex-col items-center bg-gray-950 py-15 px-10 lg:px-25 rounded-2xl my-10'>
          <img
            src="/src/assets/images/navbar/logo_miat_rojo.png"
            alt="logo miat"
            className='w-40 lg:w-50 mb-4'
          />
          <p className='font-semibold lg:font-bold text-white text-md lg:text-xl'>Nuestras cotizaciones son detalladas y transparentes, permitiéndote conocer el costo estimado de tu servicio antes de aprobarlo. A través del sistema, podrás verificar cada cotización y decidir si aceptarla o rechazarla, asegurando que tengas el control total sobre tu solicitud.</p>
        </div>
      </section>
    </div>

  );
};

export default HomePage;