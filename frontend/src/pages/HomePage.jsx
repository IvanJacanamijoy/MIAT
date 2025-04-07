import { ClockIcon } from '@heroicons/react/24/outline';
import Form from '../components/Form'

const HomePage = () => {
  return (
    <div className="relative">
      {/* Fondo con imagen */}
      <div className="fixed inset-0 -z-10">
        <img
          src="/src/assets/images/home/imagen_fondo.png" // Reemplaza con tu imagen
          alt="Fondo eléctrico"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative"> {/* Este relative es importante para el z-index */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Texto principal */}
            <div className="">
              <h2 className="text-4xl font-bold text-gray-950 mb-6">Calidad y precisión en cada conexión</h2>
              <p className="text-lg text-white mb-8">
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

      {/* Seccion de "Agenda Tu servicio" */}
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto max-h-screen grid grid-cols-2">
          <div className="my-auto flex flex-col px-4 sm:px-10 py-4 col-span-2 md:col-span-1">
            <h2 className='text-6xl lg:text-7xl font-bold'>
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
          <img src="/src/assets/images/home/imagen_fondo_agendar.png" alt="" className='max-h-screen hidden md:block'/>
        </div>
      </div>
    </div>

  );
};

export default HomePage;