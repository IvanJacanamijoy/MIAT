import React from 'react';



const ContactPage = () => {



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

        <div className="relative z-10 container mx-auto text-center px-4 bg-red-600 py-4 rounded">

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">Comunícate con nosotros</h1>

        </div>

      </section>





      {/* Sección de Información de Contacto (adaptada del diseño) */}

      {/* Esta sección es el contenido principal de la página de contacto */}

      <section className="container mx-auto my-12 px-4 w-full"> {/* Margen y padding similares a otras secciones */}

          {/* Div para el diseño de cuadrícula de 2 columnas en md y superior */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* <-- Div grid */}



              {/* Columna Izquierda - Botones de Contacto */}

              <div className="p-8 rounded-lg shadow-lg text-white" style={{ backgroundColor: '#c2c2c2' }}> {/* Esto ahora está dentro del div grid */}

                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">Atención al Cliente WhatsApp</h2>



                  {/* Contenedor flexible PRINCIPAL para WhatsApp y Email (apilados verticalmente) */}

                  <div className="flex flex-col items-start gap-6 p-7 rounded-2xl"> {/* <-- Contenedor principal de los botones (vertical) */}



                    {/* Contenedor flexible para Enlace de WhatsApp e Icono (apilados horizontalmente) */}

                    <div className="flex items-center gap-2 w-full md:w-auto"> {/* <-- Nuevo contenedor para WhatsApp + Icono (horizontal) */}

                        {/* El enlace de WhatsApp (va primero) */}

                        <a

                            href="https://wa.me/1244235235425"

                            className="text-white font-bold py-2 px-11 rounded text-center bg-red-600 hover:bg-red-700 transition-colors"

                            > 1244235235425

                        </a>

                        {/* El Icono de WhatsApp (va segundo, a la derecha) */}

                        <img className="w-8 h-8" src="/src/assets/images/footer/logo_whatsapp2.webp" alt="Logo WhatsApp"/> {/* <-- Icono de WhatsApp con alt corregido */}

                    </div> {/* Cierre del contenedor de WhatsApp/Icono */}


                    <a>
                       
                    </a>

                    <a>

                    </a>
              


                    {/* Contenedor flexible para Enlace de Correo e Imagen de Gmail (ya estaba correcto) */}

                    <div className="flex items-center gap-2 w-full md:w-auto">

                        {/* Enlace de Correo */}

                        <a

                            href="mailto:miat@gmail.com"

                            className="text-white font-bold py-2 px-10 rounded text-center bg-red-600 hover:bg-red-700 transition-colors"

                            > miat@gmail.com

                        </a>

                        {/* Etiqueta img (Icono) */}

                        <img className="w-8 h-8" src="/src/assets/images/footer/logo_gmail2.webp" alt="Logo Gmail"/>

                    </div> {/* Cierre del contenedor de Email/Icono */}



                  </div> {/* Cierre del contenedor flexible PRINCIPAL */}



              </div> {/* Cierre de la Columna Izquierda */}



              {/* Columna Derecha - Lista de Técnicos */}

              <div className="bg-white p-8 rounded-lg shadow-lg text-gray-800"> {/* Esto ahora está dentro del div grid */}

                  <h3 className="text-xl font-semibold mb-4">Tecnico 1</h3>

                  <p className="text-gray-700 mb-2">Nombre:</p>

                  <p className="text-gray-700 mb-6">Tel. 325534634</p>



                  <h3 className="text-xl font-semibold mb-4">Tecnico 2</h3>

                  <p className="text-gray-700 mb-2">Nombre:</p>

                  <p className="text-gray-700 mb-6">Tel. 6246556</p>



                  <h3 className="text-xl font-semibold mb-4">Tecnico 3</h3>

                  <p className="text-gray-700 mb-2">Nombre:</p>

                  <p className="text-gray-700 mb-6">Tel. 78638738</p>

              </div> {/* Cierre de la Columna Derecha */}



          </div> {/* Cierre del div grid */}

      </section>





      {/* Sección del Footer (adaptada del diseño de contacto) */}

      {/* Nota: Este Footer también debería ser un componente reutilizable */}

      {/* El código del footer estaba comentado o faltaba aquí */}





    </div> 

  );

};



export default ContactPage;