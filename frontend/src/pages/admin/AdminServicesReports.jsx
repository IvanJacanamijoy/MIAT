const AdminServicesReports = () => {
     return (
        <div>
            servicios, vista del admin
        </div>
     )
}
export default AdminServicesReports;


// // src/pages/admin/AdminServicesReports.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import GenericEntityManager from '../../components/common/GenericEntityManager';
// import ServiceFilter from '../../components/services/ServiceFilter';
// import ServiceList from '../../components/services/ServiceList';
// import ServiceForm from '../../components/services/ServiceForm';
// import { fetchAllServicesApi } from '../../api/services';
// // import { fetchAllStatusesApi } from '../../api/statuses'; // Necesaria para cargar los estados del filtro
// import { useAuth } from '../../context/AuthContext';

// const AdminServicesReports = () => {
//     // Definición de los campos del filtro
//     // Asegúrate de que estos nombres (name) coincidan con los que espera tu backend en req.query
//     const filterFields = [
//         { name: 'descripcion', label: 'Descripción Servicio', type: 'text' }, // Campo para buscar por la descripción del servicio
//         { name: 'identificacionCliente', label: 'Identificación Cliente', type: 'text' }, // Campo para buscar por la identificación del cliente
//         { name: 'estadoId', label: 'Estado', type: 'select' }, // Campo de selección de estado
//     ];

//     const { authToken } = useAuth(); // Obtiene el token de autenticación del contexto

//     // --- ESTADOS PARA LOS ESTADOS DE SERVICIO (para el SELECT del filtro) ---
//     const [serviceStatuses, setServiceStatuses] = useState([]);
//     const [loadingStatuses, setLoadingStatuses] = useState(false);
//     const [errorStatuses, setErrorStatuses] = useState(null);

//     // Efecto para cargar los estados al montar el componente.
//     // Esto es necesario para poblar el <select> de estados en ServiceFilter.
//     // useEffect(() => {
//     //     const getStatuses = async () => {
//     //         if (!authToken) return; // No intenta cargar si no hay token
//     //         setLoadingStatuses(true);
//     //         setErrorStatuses(null);
//     //         try {
//     //             const statuses = await fetchAllStatusesApi(authToken);
//     //             setServiceStatuses(statuses); // Almacena los estados obtenidos
//     //         } catch (err) {
//     //             console.error("Error al cargar los estados de servicio para el filtro:", err);
//     //             setErrorStatuses(err.message || "Error al cargar los estados del filtro.");
//     //         } finally {
//     //             setLoadingStatuses(false);
//     //         }
//     //     };
//     //     getStatuses();
//     // }, [authToken]); // Vuelve a ejecutar si el token cambia

//     // --- LÓGICA DE FILTRADO PARA EL BACKEND ---
//     // Esta función se encarga de CONSTRUIR los query parameters para la URL que se enviará al backend.
//     // Recibe los formValues del filtro.
//     const serviceFilterLogic = useCallback((formValues) => {
//         const queryParams = new URLSearchParams();

//         // Si el campo 'descripcion' tiene un valor, lo añade a los parámetros
//         if (formValues.descripcion) {
//             queryParams.append('descripcion', formValues.descripcion);
//         }
//         // Si el campo 'identificacionCliente' tiene un valor, lo añade a los parámetros
//         if (formValues.identificacionCliente) {
//             queryParams.append('identificacionCliente', formValues.identificacionCliente);
//         }
//         // Si el campo 'estadoId' tiene un valor y no está vacío, lo añade a los parámetros
//         if (formValues.estadoId && formValues.estadoId !== '') {
//             queryParams.append('estadoId', formValues.estadoId);
//         }

//         const queryString = queryParams.toString(); // Convierte los parámetros a una cadena (ej. "param1=valor1&param2=valor2")
//         console.log("AdminServicesReports: Query String generada para backend:", queryString);
//         return queryString; // Devuelve la cadena de consulta
//     }, []); // No hay dependencias externas aquí ya que 'formValues' se recibe como argumento

//     // --- Lógica para la obtención de detalles del servicio para edición ---
//     // Esta función se pasa a GenericEntityManager para que la use cuando se haga clic en "editar".
//     const customOnEditClick = useCallback(async (serviceSummary) => {
//         if (!authToken) return null;
//         try {
//             // Llama a la API para obtener los detalles completos de un servicio por su ID
//             const detailedService = await fetchServiceByIdApi(serviceSummary.IdServicio, authToken);
//             return detailedService;
//         } catch (error) {
//             console.error("Error al cargar detalles del servicio:", error);
//             alert("Error al cargar los detalles del servicio."); // Considera usar un modal o Toast en lugar de alert
//             return null;
//         }
//     }, [authToken]); // Depende del token de autenticación

//     // --- Lógica para actualizar un servicio ---
//     // Esta función se pasa a GenericEntityManager para que la use al enviar el formulario de edición.
//     const handleUpdateService = useCallback(async (updatedService, token, user) => {
//         try {
//             await updateServiceApi(updatedService, token); // Llama a la API para actualizar el servicio
//             alert('Servicio actualizado exitosamente!'); // Considera usar un modal o Toast
//         } catch (error) {
//             console.error('Error al actualizar el servicio:', error);
//             alert('Error al actualizar el servicio: ' + error.message); // Muestra el mensaje de error
//             throw error; // Propaga el error para que GenericEntityManager lo capture
//         }
//     }, []); // No hay dependencias externas para esta función

//     // --- Lógica para cambiar el estado de un servicio ---
//     // Esta función se pasa a GenericEntityManager para el botón de cambio de estado.
//     const handleToggleStatus = useCallback(async (service, token) => {
//         try {
//             await toggleStatusApi(service, token); // Llama a la API para cambiar el estado del servicio
//             alert('Estado del servicio cambiado!'); // Considera usar un modal o Toast
//         } catch (error) {
//             console.error('Error al cambiar estado del servicio:', error);
//             alert('Error al cambiar estado del servicio: ' + error.message); // Muestra el mensaje de error
//             throw error; // Propaga el error para que GenericEntityManager lo capture
//         }
//     }, []); // No hay dependencias externas para esta función

//     return (
//         <div className="relative">
//             {/* Sección de fondo y título de la página */}
//             <div
//                 className="
//                     absolute 
//                     inset-0 
//                     bg-[url(src/assets/images/home/imagen_fondo_servicios.png)] 
//                     bg-local 
//                     bg-center 
//                     bg-cover
//                     max-w-7xl
//                     mx-auto 
//                     h-[500px]
//                 "
//             ></div>
//             <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-5 pb-5 bg-linear-to-t from-gray-700 from-80% to-transparent">
//                 <h1 className="text-center font-bold text-5xl py-10 text-white text-shadow-red-700 text-shadow-sm">Gestión de Servicios</h1>
                
//                 {/* Contenedor principal de GenericEntityManager */}
//                 <div className="p-5 bg-neutral-500 rounded-2xl">
//                     <GenericEntityManager
//                         title="Gestión de Servicios" // Título que se mostrará en GenericEntityManager
//                         fetchDataFn={fetchAllServicesApi} // Función API para obtener los datos (ahora acepta queryParams)
//                         filterComponent={ServiceFilter} // Componente React para el formulario de filtro
//                         listComponent={ServiceList} // Componente React para mostrar la lista de servicios
//                         editFormComponent={ServiceForm} // Componente React para el formulario de edición
//                         updateDataFn={handleUpdateService} // Función para actualizar un servicio
//                         toggleStatusFn={handleToggleStatus} // Función para cambiar el estado de un servicio
//                         filterFields={filterFields} // Definición de los campos del filtro
//                         filterLogic={serviceFilterLogic} // Lógica para construir los queryParams para el backend
//                         entityIdField="IdServicio" // Nombre del campo que identifica un servicio de forma única
//                         onEditClickFn={customOnEditClick} // Función para obtener detalles de un servicio al editar
//                         customFilterProps={{ // Props adicionales que se pasan al ServiceFilter
//                             serviceStatuses: serviceStatuses, // Estados de servicio cargados
//                             // loadingStatuses: loadingStatuses, // Indicador de carga de estados
//                             // errorStatuses: errorStatuses, // Indicador de error al cargar estados
//                         }}
//                         filterOnBackend={true} // <-- CLAVE: Indica a GenericEntityManager que el filtro se hace en el backend
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminServicesReports;
