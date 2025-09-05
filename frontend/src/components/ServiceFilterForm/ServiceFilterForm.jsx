import React, {useState, useEffect} from 'react';
import ServiceCard from './ServiceCard'; 
import sensoresImage from '../../assets/images/services/sensores.webp';
import camarasImage from '../../assets/images/services/camaras.webp';
/** es el componente padre que contiene un formulario de filtro y muestra una lista de tarjetas de servicio
 * Incluye la logica de filtrado y el manejo del estado.
 */

const ServiceFilterForm = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [services, setServices] = useState([]); // Aqui se almacena todos los servicios
    const [filteredServices, setFilteredServices] = useState([]); //Almacena los servicios filtrados

    //Funcion para simular la obtencion de servicios de una API
const fetchServices = async () => {
    // Datos de ejemplo para desarrollo
    const mockServices = [
        {id: 1, title: 'Instalacion sensores de seguridad', description: 'Servicio de instalacion para Sensores y paneles de seguridad', price: 120.000, rating: 4.5, imageURL: sensoresImage},
        {id: 2, title: 'Instalacion de camaras de seguridad', description: 'Servicio de instalacion para Camaras de seguridad Zeker 2mp WIFI 5g ', price: 290.000, rating: 5.0, image: camarasImage},
        {id: 3, title: 'Reparacion y Mantenimiento PC', description: 'Servicio de reparacion de PC o Laptop, respectivo mantenimiento', price: 115.000, rating: 3.5, imageURL:'https://placehold.co/400x300/e2e8f0/64748b?text=Limpieza'},
        {id: 4, title: 'Servicio de Cableado de Infrastructura', description: 'Servicio para conjunto o residencia de cableado infrastructural para su respectivo objetivo', price: 120.000, rating: 4.5, imageURL:'https://placehold.co/400x300/e2e8f0/64748b?text=Limpieza'},
        {id: 5, title: 'Servicio de Redes y Parabolica', description: 'Servicio de instalacion, cableado, conectividad y manteminiento para Redes, Señal, Parabolica, Router etc', price: 220.000, rating: 4.0, imageURL:'https://placehold.co/400x300/e2e8f0/64748b?text=Limpieza'},
    ];
    setServices(mockServices);
    setFilteredServices(mockServices);
};
// Se ejecuta una vez se monta el componente para obtener los servicios
useEffect(() => {
    fetchServices();
}, []);

// Manejador del cambio en el input de búsqueda

const handleSearchChange =  (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Logica de filtrado : se filtra los servicios por titulo o descripcion
    const newFilteredServices = services.filter(service =>
        service.title.toLowerCase(). includes(value.toLowerCase()) ||
        service.description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredServices(newFilteredServices);

};

return (
    
<div className="container mx-auto p-4">
      {/* Formulario de búsqueda/filtro */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Busca servicios..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        />
      </div>

      {/* Grid para mostrar las tarjetas de servicios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Renderiza las tarjetas de servicios filtrados */}
        {filteredServices.length > 0 ? (
          filteredServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg mt-10">
            No se encontraron servicios que coincidan con tu búsqueda.
          </p>
        )}
      </div>
    </div>
  );

};

export default ServiceFilterForm;