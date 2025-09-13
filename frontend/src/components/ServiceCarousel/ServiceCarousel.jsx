import { useState, useEffect } from 'react';
import CardService from './CardService';
import NavigationArrows from './NavigationArrows';

const ServiceCarousel = ({ items }) => {
  const [indiceActual, setIndiceActual] = useState(0);
  const [serviciosVisibles, setServiciosVisibles] = useState(1);
  const [anchoCardServicio, setAnchoCardServicio] = useState('100%');

  // Ajustar el número de tarjetas visibles según el ancho de pantalla
  useEffect(() => {
    const updateServiciosVisibles = () => {
      const width = window.innerWidth;
      if (width < 640) { // Mobile
        setServiciosVisibles(1);
        setAnchoCardServicio('100%');
      } else if (width < 1024) { // Tablet grande
        setServiciosVisibles(2);
        setAnchoCardServicio('50%');
      } else { // Desktop
        setServiciosVisibles(3);
        setAnchoCardServicio('33.33%');
      }
    };

    updateServiciosVisibles();
    window.addEventListener('resize', updateServiciosVisibles);
    return () => window.removeEventListener('resize', updateServiciosVisibles);
  }, []);

  // Flecha siguiente
  const deslizarSiguiente = () => {
    setIndiceActual((prev) => {
      const indiceMaximo = items.length - serviciosVisibles;
      return prev >= indiceMaximo ? 0 : prev + 1;
    });
  };

  // Flecha anterior (corregido: ahora retorna el nuevo índice)
  const deslizarAnterior = () => {
    setIndiceActual((prev) => {
      const indiceMaximo = items.length - serviciosVisibles;
      return prev === 0 ? indiceMaximo : prev - 1;
    });
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6">
      {/* Contenedor del carrusel */}
      <div className="relative overflow-hidden">
        {/* Carrusel */}
        <div
          className="flex transition-transform duration-500 ease-in-out py-10"
          style={{
            transform: `translateX(-${indiceActual * (100 / serviciosVisibles)}%)`,
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{ width: anchoCardServicio }}
            >
              <div className="px-2">
                <CardService {...item} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controles */}
      <NavigationArrows
        vistaAnterior={deslizarAnterior}
        vistaSiguiente={deslizarSiguiente}
      />
    </div>
  );
};

export default ServiceCarousel;
