import React from 'react';
// Importa el componente del formulario de registro
import RegisterFormContent from '../components/RegisterFormContent'; // Asegúrate de que la ruta sea correcta

const RegisterPage = () => {
  return (
    <div className='flex flex-col items-center'>

      {/* Sección similar a la Hero de HomePage para el formulario de registro */}
      <section className="
        relative
        w-full
        lg:h-[700px] {/* Ajusta la altura según necesites, el formulario es más largo que el de login */}
        max-w-full
        min-h-screen {/* Asegura que ocupe al menos la altura de la pantalla */}
        flex items-center {/* Para centrar verticalmente el contenido de la sección */}
      ">
        {/* Capa de fondo (puedes usar la misma imagen que en HomePage o una diferente) */}
         <div
          className="
          absolute
          inset-0 bg-[url(/src/assets/images/home/imagen_fondo.png)] {/* Usa la imagen de fondo de HomePage o cambia la ruta */}
          bg-local
          bg-center
          bg-cover
          opacity-70 {/* Ajusta la opacidad según la imagen */}
          "
        ></div>


        {/* Contenido - Diseño de cuadrícula para texto y formulario */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 h-full flex items-center"> {/* 'flex items-center' ayuda a centrar verticalmente el contenido de la cuadrícula si la sección es más alta */}
          <div className="w-full"> {/* Asegura que el div que contiene la cuadrícula ocupe todo el ancho disponible */}
             <div className="grid md:grid-cols-2 gap-12 items-center"> {/* Cuadrícula: texto en una columna, formulario en otra */}
              {/* Columna Izquierda: Texto de bienvenida/información de registro */}
              <div className="">
                {/* Títulos y texto descriptivo */}
                <h2 className="text-4xl font-bold text-gray-950 mb-6">Únete a Nuestra Comunidad</h2>
                <p className="text-lg text-white mb-8 font-semibold"> {/* Texto en blanco para que se vea sobre el fondo semioscuro */}
                  Regístrate para acceder a cotizaciones rápidas y confiables, agendar servicios técnicos y gestionar tus requerimientos eléctricos con facilidad.
                </p>
                {/* Opcional: Lista de beneficios */}
                 <ul className="text-white space-y-2 font-semibold"> {/* Estilo para la lista de beneficios */}
                     <li>✔️ Obtén cotizaciones detalladas y transparentes</li>
                     <li>✔️ Agenda servicios técnicos en línea fácilmente</li>
                     <li>✔️ Accede a tu historial de servicios</li>
                     <li>✔️ Comunícate directamente con los técnicos</li>
                 </ul>
              </div>

              {/* Columna Derecha: El Formulario de Registro */}
              {/* Usa el componente que creamos anteriormente */}
              <RegisterFormContent />

            </div> {/* Cierre del div grid */}
          </div> {/* Cierre del div w-full */}
        </div> {/* Cierre del div de contenido principal */}
      </section>

      {/* Aquí podrías añadir otras secciones de tu página de registro si las tienes */}

    </div> 
  );
};

export default RegisterPage;