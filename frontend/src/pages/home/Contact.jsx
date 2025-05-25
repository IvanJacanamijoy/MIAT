import React from 'react';


const Contact = () => {

  return (
    <div className='flex flex-col items-center'> {/* Contenedor principal */}

      {/* Sección Hero - "Comunícate con nosotros" */}
      <section className="
          relative
          w-full 
          lg:h-[200px] 
          max-w-full
          min-h-[100px] {/* Altura mínima responsive */}
          flex items-center justify-center {/* Para centrar el contenido */}
          bg-[url('/src/assets/images/home/imagenvectorial.png')]
          bg-local
          bg-center
          bg-cover
      ">
        {/* Capa de fondo con opacidad (Overlay) */}
        <div className="absolute inset-0 bg-black opacity-20"></div> {/* Overlay para oscurecer la imagen */}

        {/* Contenido principal (el título) */}
        <div className="relative z-10 container mx-auto text-center px-4 bg-red-600 py-4 rounded"> {/* <-- Esta es la línea */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">Comunícate con nosotros</h1> 
        </div>
      </section>


      {/* Sección de Información de Contacto (adaptada del diseño) */}
      {/* Esta sección es el contenido principal de la página de contacto */}
      <section className="container mx-auto my-12 px-4 w-full"> {/* Margen y padding similares a otras secciones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Columna Izquierda - Botones de Contacto */}
              <div className="p-8 rounded-lg shadow-lg text-white" style={{ backgroundColor: '#151212' }}> {/* Usando estilo inline temporal para color */}
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">Atención al Cliente WhatsApp</h2>
                  {/* Bot
                  {/* Botón de WhatsApp con efecto hover */}
              {/* Botón de WhatsApp con efecto hover y espaciado correcto */}
              <a
                    href="https://wa.me/1244235235425"
                    className="block mb-24 md:w-90 text-white font-bold py-1 px-6 rounded text-center bg-red-600 hover:bg-red-700 transition-colors" // <-- Cambiado inline-block a block
                  >
                      1244235235425
                  </a>

                  {/* Botón de Correo con efecto hover */}
                  <a
                    href="mailto:miatgmail.com"
                    className="block mb-24 md:w-90 text-white font-bold py-1 px-6 rounded text-center bg-red-600 hover:bg-red-700 transition-colors" // <-- Cambiado inline-block a block (no necesita mb-8 ya que el anterior tiene)
                  >
                      miatgmail.com
                  </a>
              </div>

              {/* Columna Derecha - Lista de Técnicos */}
              <div className="bg-white p-8 rounded-lg shadow-lg text-gray-800"> {/* Fondo blanco */}
                  <h3 className="text-xl font-semibold mb-4">Tecnico 1</h3>
                  <p className="text-gray-700 mb-2">Nombre:</p>
                  <p className="text-gray-700 mb-6">Tel. 325534634</p>

                  <h3 className="text-xl font-semibold mb-4">Tecnico 2</h3>
                  <p className="text-gray-700 mb-2">Nombre:</p>
                  <p className="text-gray-700 mb-6">Tel. 6246556</p>

                  <h3 className="text-xl font-semibold mb-4">Tecnico 3</h3>
                  <p className="text-gray-700 mb-2">Nombre:</p>
                  <p className="text-gray-700 mb-6">Tel. 78638738</p>
              </div>
          </div>
      </section>


      {/* Sección del Footer (adaptada del diseño de contacto) */}
      {/* Nota: Este Footer también debería ser un componente reutilizable */}
     

    </div>
  );
};

export default Contact;