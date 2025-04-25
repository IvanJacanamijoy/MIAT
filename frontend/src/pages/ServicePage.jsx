import React from 'react';

const ServicePage = () => {
  return (
    <div className='flex flex-col items-center'> {/* Contenedor principal */}

      {/* Sección Hero - "Nuestros Servicios" */}
      <section className="
          relative
          w-full
          lg:h-[200px]
          max-w-full
          min-h-[100px] {/* Altura mínima responsive */}
          flex items-center justify-center {/* Para centrar el contenido */}
          bg-[url('/src/assets/images/home/imagenvectorial.png')] {/* Puedes cambiar esta imagen si tienes una específica para servicios */}
          bg-local
          bg-center
          bg-cover
      ">
        {/* Capa de fondo con opacidad (Overlay) */}
        <div className="absolute inset-0 bg-black opacity-20"></div> {/* Overlay para oscurecer la imagen */}

        {/* Contenido principal (el título) */}
        <div className="relative z-10 container mx-auto text-center px-4 bg-red-600 py-4 rounded">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">Nuestros Servicios</h1>
        </div>
      </section>

      {/* Sección de Contenido Principal - Lista de Servicios */}
      <section className="container mx-auto my-12 px-4 w-full"> {/* Margen y padding similares a otras secciones */}
          {/* Div para el diseño de cuadrícula - puedes ajustar las columnas según cómo quieras mostrar los servicios */}
          {/* Por ejemplo, 1 columna en móvil y 2 o 3 en desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* <-- Div grid para los servicios */}

            {/* Ejemplo de Tarjeta de Servicio 1 */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-red-600">Nombre del Servicio 1</h3>
                {/* Puedes añadir un icono aquí si lo tienes */}
                {/* <img src="/path/to/icon1.png" alt="Icono Servicio 1" className="w-12 h-12 mb-4"/> */}
                <p className="text-gray-700 mb-4">Breve descripción del Servicio 1. Explica qué incluye y sus beneficios principales.</p>
                {/* Opcional: Botón o enlace para más detalles */}
                {/* <a href="/servicios/servicio1" className="text-red-600 hover:underline font-semibold">Más detalles</a> */}
            </div>

            {/* Ejemplo de Tarjeta de Servicio 2 */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-red-600">Nombre del Servicio 2</h3>
                 {/* <img src="/path/to/icon2.png" alt="Icono Servicio 2" className="w-12 h-12 mb-4"/> */}
                <p className="text-gray-700 mb-4">Breve descripción del Servicio 2. Sé conciso y atractivo para el usuario.</p>
                 {/* <a href="/servicios/servicio2" className="text-red-600 hover:underline font-semibold">Más detalles</a> */}
            </div>

            {/* Ejemplo de Tarjeta de Servicio 3 */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-gray-800">
                <h3 className="text-xl font-semibold mb-4 text-red-600">Nombre del Servicio 3</h3>
                 {/* <img src="/path/to/icon3.png" alt="Icono Servicio 3" className="w-12 h-12 mb-4"/> */}
                <p className="text-gray-700 mb-4">Breve descripción del Servicio 3. Destaca los puntos clave.</p>
                 {/* <a href="/servicios/servicio3" className="text-red-600 hover:underline font-semibold">Más detalles</a> */}
            </div>

             

          </div> {/* Cierre del div grid de servicios */}

           {/* Sección adicional para llamado a la acción */}
           <div className="mt-12 text-center">
               <p className="text-lg text-gray-800">
                   ¿No encuentras el servicio que necesitas o tienes preguntas?{' '}
                   <a
                       href="/contacto"
                       className="underline text-gray-800 hover:text-red-600 transition-colors"
                   >
                       Contáctanos
                   </a>{' '}
                   para una consulta personalizada.
               </p>
           </div>

      </section>

      {/* Sección del Footer - (Debería ser un componente reutilizable) */}
      {/* Placeholder para el Footer si lo manejas aparte */}
      {/* <footer>...</footer> */}

    </div>
  );
};

export default ServicePage;