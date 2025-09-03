import React from 'react';

/** Componente que muestra una tarjeta individual para un servcio.
 * se utiliza los porpos para recibir los datos de cada servicio.
 */


const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
      {/* Imagen del servicio, usa un placeholder si la URL de la imagen no está disponible */}
      <img
        src={service.imageUrl || 'src/assets/images/services/sensores.webp'}
        alt={`Imagen de ${service.title}`}
        className="w-full h-48 object-cover"
      />

      {/* Contenido de la tarjeta */}
      <div className="p-4">
        {/* Título del servicio */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>

        {/* Descripción corta del servicio, truncada a 100 caracteres */}
        <p className="text-gray-600 text-sm mb-4">{service.description.substring(0, 100)}...</p>

        {/* Sección de precio y calificación */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-indigo-600">${service.price}</span>
          <div className="flex items-center">
            {/* Ícono de estrella para la calificación */}
            <span className="text-yellow-400 text-lg mr-1">⭐</span>
            <span className="text-gray-700 text-sm">{service.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;