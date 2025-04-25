import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../layout/MainLayout'
import HomePage from '../pages/HomePage'
import ContactPage from '../pages/ContactPage' // Importa el componente ContactPage
import SchedulePage from '../pages/SchedulePage'
import AboutPage from "../pages/AboutPage";
import ServicePage from "../pages/ServicePage" // Importa el componente ServicePage


const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          // MODIFICADO: Cambiado el path de 'contact' a 'contacto'
          path: 'contacto', // <-- Esta es la ruta URL que ahora coincide con el href del enlace
          element: <ContactPage /> // <-- Este es el componente que se renderiza en esa ruta
        },
        {
          path: 'schedule',
          element: <SchedulePage />
        },
        {
          path: 'about',
          element: <AboutPage />
        },
        {
          path: 'services',
          element: <ServicePage />
        },
      ]
    }
  ])

  export default router
