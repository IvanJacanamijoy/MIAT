import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, pulse } from '../Animations/variants'; // Ajusta la ruta si es necesario
import { useNavigate } from 'react-router-dom';

const ServiceListCard = ({ servicio }) => {
  const navigate = useNavigate();

  const handleAgendarClick = () => {
    navigate('/visitas-tecnicas/agendar'); // Ajusta la ruta a la que deseas redirigir
  };

  return (
    <motion.div
      variants={fadeIn('up', 0.3)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-col sm:flex-row items-center bg-white rounded-2xl shadow-md border border-gray-200 p-4 mb-6 hover:shadow-lg transition duration-300"
    >
      <img
        src={servicio.imageUrl}
        alt={servicio.titulo}
        className="w-full sm:w-48 h-32 object-cover rounded-xl mb-4 sm:mb-0 sm:mr-6 border border-gray-300"
      />

      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-xl font-bold text-red-600 mb-1">{servicio.titulo}</h3>
        <p className="text-gray-600 text-sm">{servicio.descripcion}</p>
      </div>

      <motion.button
        variants={pulse}
        whileHover="hover"
        onClick={handleAgendarClick}
        className="mt-4 sm:mt-0 sm:ml-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl shadow transition duration-300"
      >
        Agendar
      </motion.button>
    </motion.div>
  );
};

export default ServiceListCard;
