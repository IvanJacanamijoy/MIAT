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
              <Form action="#" styles="space-y-2"/>
            </div>
          </div>
        </div>
      </div>
      {/* Nueva sección SIN FONGO (transparente) */}
      <div className="relative bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Nuestros Servicios Eléctricos</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Soluciones integrales para tus necesidades eléctricas residenciales, comerciales e industriales
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            otraseccion
          </div>

          <div className="mt-12 text-center">
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
              <ClockIcon className="h-5 w-5 mr-2" />
              Agendar una visita
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default HomePage;