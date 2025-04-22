import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../layout/MainLayout'
import HomePage from '../pages/HomePage'
import ContactPage from '../pages/ContactPage'
import SchedulePage from '../pages/SchedulePage'
import AboutPage from "../pages/AboutPage";
import ServicePage from "../pages/ServicePage"
import RegisterForm from "../components/Form/Forms";


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
          path: 'contact',
          element: <ContactPage />
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