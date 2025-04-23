import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../layout/MainLayout'
import HomePage from '../pages/HomePage'
import ContactPage from '../pages/ContactPage'
import SchedulePage from '../pages/SchedulePage'
import AboutPage from "../pages/AboutPage";
import ServicePage from "../pages/ServicePage"
<<<<<<< HEAD
import ReportPage from "../pages/reportPage";
=======
import RegisterForm from "../components/Form/Forms";
>>>>>>> 5592d8db24b3f4fa0cd7f3361caf1a81b164dd72


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
<<<<<<< HEAD
        {
          path: 'report',
          element: <ReportPage/>
        },
=======

        
>>>>>>> 5592d8db24b3f4fa0cd7f3361caf1a81b164dd72
      ]
    }
  ])
  
  export default router