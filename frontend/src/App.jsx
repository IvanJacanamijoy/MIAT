import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Importa AuthProvider y useAuth

//Vistas del layout (navbar y footer) e inicio de sesión
import MainLayout from "./layout/MainLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';
//vistas del home
import Home from './pages/home/Home';
import Contact from './pages/home/Contact';
import HomeService from './pages/home/HomeService';
import Whoweare from './pages/home/Whoweare'

//vistas de usuario
import UserDashboard from './pages/user/UserDashboard'
import UserServices from './pages/user/UserServices';
import MyServices from './pages/user/MyServices';
import UserQuote from './pages/user/UserQuote';
import UserReports from './pages/user/UserReports';
import UserAssignedVisits from './pages/user/UserAssignedVisits';
import TechnicalVisits from './pages/user/TechnicalVisits'

//vista de tecnico
import TechnicianDashboard from './pages/technician/TechnicianDashboard'
import TechnicianAssignedVisits from './pages/technician/TechnicianAssignedVisits';
import TechnicianServices from './pages/technician/TechnicianServices';
import TechnicianQuote from './pages/technician/TechnicianQuote';
import TechnicianReports from './pages/technician/TechnicianReports';

//vistas de administrador
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAssignedVisits from './pages/admin/AdminAssignedVisits';
import UserManager from './pages/admin/UserManager';
import ScheduleAppointments from './pages/admin/ScheduleAppointments';
import AdminServices from './pages/admin/AdminServices';
import AdminQuote from './pages/admin/AdminQuote';
import AdminReports from './pages/admin/AdminReports'


// Componente de autenticación
const RequireAuth = ({ children, allowedRoles }) => {
  const { usuario } = useAuth(); // Usa el hook useAuth para obtener el usuario

  if (!usuario) {
    // Si no hay usuario, redirige al inicio de sesión
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(usuario.rol)) {
    // Si el usuario no tiene el rol permitido, muestra un mensaje de acceso denegado
    return <div>Acceso Denegado. No tienes permiso para ver esta página.</div>; // Puedes personalizar esto
  }

  // Si el usuario está autenticado y tiene el rol correcto, renderiza el contenido
  return children;
};

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            {/* rutas del home */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/contacto" element={<MainLayout><Contact /></MainLayout>} />
            <Route path="/servicios" element={<MainLayout><HomeService /></MainLayout>} />
            <Route path="/quienessomos" element={<MainLayout><Whoweare /></MainLayout>} />

            {/* Rutas protegidas por rol, con MainLayout */}
            <Route path="/usuario" element={<RequireAuth allowedRoles={['usuario']}><MainLayout><UserDashboard /></MainLayout></RequireAuth>} />
            <Route path="/usuario/servicios" element={<RequireAuth allowedRoles={['usuario']}><MainLayout><UserServices /></MainLayout></RequireAuth>} />
            <Route path="/usuario/misservicios" element={<RequireAuth allowedRoles={['usuario']}><MainLayout><MyServices /></MainLayout></RequireAuth>} />
            <Route path="/usuario/cotizaciones" element={<RequireAuth allowedRoles={['usuario']}><MainLayout><UserQuote /></MainLayout></RequireAuth>} />
            <Route path="/usuario/informes" element={<RequireAuth allowedRoles={['usuario']}><MainLayout><UserReports /></MainLayout></RequireAuth>} />
            <Route path="/usuario/visitastecnicas" element={<RequireAuth allowedRoles={['usuario']}><MainLayout><TechnicalVisits /></MainLayout></RequireAuth>} />
            <Route path="/usuario/contacto" element={<RequireAuth allowedRoles={['usuario']}><MainLayout><Contact /></MainLayout></RequireAuth>} />

            {/* Rutas protegidas por rol, con MainLayout */}
            <Route path="/tecnico" element={<RequireAuth allowedRoles={['tecnico']}><MainLayout><TechnicianDashboard /></MainLayout></RequireAuth>} />
            <Route path="/tecnico/visitasasignadas" element={<RequireAuth allowedRoles={['tecnico']}><MainLayout><TechnicianAssignedVisits /></MainLayout></RequireAuth>} />
            <Route path="/tecnico/servicios" element={<RequireAuth allowedRoles={['tecnico']}><MainLayout><TechnicianServices /></MainLayout></RequireAuth>} />
            <Route path="/tecnico/cotizaciones" element={<RequireAuth allowedRoles={['tecnico']}><MainLayout><TechnicianQuote /></MainLayout></RequireAuth>} />
            <Route path="/tecnico/informes" element={<RequireAuth allowedRoles={['tecnico']}><MainLayout><TechnicianReports /></MainLayout></RequireAuth>} />

            {/* Rutas protegidas por rol, con MainLayout */}
            <Route path="/admin" element={<RequireAuth allowedRoles={['admin']}><MainLayout><AdminDashboard /></MainLayout></RequireAuth>} />
            <Route path="/admin/agendar" element={<RequireAuth allowedRoles={['admin']}><MainLayout><AdminAssignedVisits /></MainLayout></RequireAuth>} />
            <Route path="/admin/usuarios" element={<RequireAuth allowedRoles={['admin']}><MainLayout><UserManager /></MainLayout></RequireAuth>} />
            <Route path="/admin/citasasignadas" element={<RequireAuth allowedRoles={['admin']}><MainLayout><ScheduleAppointments /></MainLayout></RequireAuth>} />
            <Route path="/admin/servicios" element={<RequireAuth allowedRoles={['admin']}><MainLayout><AdminServices /></MainLayout></RequireAuth>} />
            <Route path="/admin/cotizaciones" element={<RequireAuth allowedRoles={['admin']}><MainLayout><AdminQuote /></MainLayout></RequireAuth>} />
            <Route path="/admin/informes" element={<RequireAuth allowedRoles={['admin']}><MainLayout><AdminReports /></MainLayout></RequireAuth>} />
            {/* Ruta para manejar cualquier otra ruta no definida */}
            <Route path="*" element={
              /* Vista que indica que la pagina no ha sido encontrada -- pendiente */
              <div>Página no encontrada</div>
              } />
          </Routes>
        </AuthProvider>
      </Router>

    </>

  );
};
export default App;

