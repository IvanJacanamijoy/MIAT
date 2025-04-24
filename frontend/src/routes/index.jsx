import { createBrowserRouter } from "react-router-dom";
import MainLayout from '../layout/MainLayout'
import HomePage from '../pages/HomePage'
import ContactPage from '../pages/ContactPage'
import SchedulePage from '../pages/SchedulePage'
import AboutPage from "../pages/AboutPage";
import ServicePage from "../pages/ServicePage"
import ReportPage from "../pages/reportPage";
import FormsPage from "../pages/FormsPage";
import WhoWeare from "../pages/WhoWeare"
//Se importa la ruta

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
      {
        path: 'report',
        element: <ReportPage />
      },
      {
        path: 'forms',
        element: <FormsPage />
      },
      {   //Ruta "/quienes somos"
        path: 'whoweare',
        element: <WhoWeare />
      },
    ]
  }
])

export default router