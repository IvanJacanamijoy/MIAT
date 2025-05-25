// import './AboutPage.css';

import React from "react";

const AboutPage = () => {
    return (
        <div className="relative">
            {/* Imagen de fondo */}
            <div className="relative">
                <img src="src/assets/images/home/imagen_fondo.png" className="w-full h-[400px] object-cover opacity-60" />
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center text-black font-bold text-4xl md:text-5xl">
                    <h1>Soluciones</h1>
                    <h1>Eléctricas HH</h1>
                </div>
            </div>

            {/* Sección ¿Quiénes Somos? */}
            <section className="bg-black text-white py-10 px-6 text-center">
                <img src="src/assets/images/navbar/logo_miat_rojo.png" alt="Logo ElectroSoluciones" className="mx-auto h-16 mb-4" />
                <h2 className="text-3xl font-bold mb-4">¿Quiénes Somos?</h2>
                <p className="max-w-4xl mx-auto leading-relaxed text-sm sm:text-base">
                    La empresa ElectroSoluciones fue fundada hace más de una década con el firme propósito de ofrecer servicios de alta calidad 
                    en el sector eléctrico. Desde sus inicios, ha demostrado un compromiso constante con la excelencia, lo que le ha permitido 
                    establecerse como un referente en el mercado. Con una experiencia acumulada de más de 10 años, la empresa ha logrado consolidar 
                    un equipo de técnicos altamente especializados, que cuentan con una amplia formación y conocimientos en diversas áreas del sector eléctrico. 
                    Estos profesionales han sido capacitados para enfrentar cualquier tipo de reto, desde instalaciones eléctricas residenciales 
                    hasta complejos sistemas industriales, garantizando siempre soluciones eficientes y seguras.
                </p>
            </section>

            {/* Ilustración inferior */}
            <div className="py-8 px-4 bg-white flex justify-center">
                <img src="" alt="Ilustración técnicos" className="max-w-4xl w-full" />
            </div>
            
        </div>
    )
}

export default AboutPage;