import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Importa AuthProvider y useAuth

//importamos las paginas
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/home/HomePage";
import ServicePage from "./pages/home/ServicePage";
import LoginPage from "./pages/home/LoginPage";
import RegisterPage from './pages/home/RegisterPage';
//vistas de administrador
import AdminDashboard from "./pages/admin/AdminDashboard"
import UserManager from './pages/admin/UserManager';
//vistas de usuario
import UserDashboard from "./pages/user/UserDashboard"
//vista de tecnico
import TechnicianDashboard from "./pages/technician/TechnicianDashboard"






// Componentes para las vistas de cada rol
const AdminUsuarios = () => <div>Admin Usuarios</div>;
const AdminReportes = () => <div>Admin Reportes</div>;

const ClienteDashboard = () => <div>Cliente Dashboard</div>;
const ClientePerfil = () => <div>Cliente Perfil</div>;
const ClienteSoporte = () => <div>Cliente Soporte</div>;

const TecnicoDashboard = () => <div>Técnico Dashboard</div>;
const TecnicoTareas = () => <div>Técnico Tareas</div>;
const TecnicoInventario = () => <div>Técnico Inventario</div>;

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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
            <Route path="/service" element={<MainLayout><ServicePage /></MainLayout>} />

            {/* Rutas protegidas por rol, con MainLayout */}
            <Route path="/admin" element={<RequireAuth allowedRoles={['admin']}><MainLayout><AdminDashboard /></MainLayout></RequireAuth>} />
            <Route path="/admin/usuarios" element={<RequireAuth allowedRoles={['admin']}><MainLayout><UserManager /></MainLayout></RequireAuth>} />
            <Route path="/admin/reportes" element={<RequireAuth allowedRoles={['admin']}><MainLayout><AdminReportes /></MainLayout></RequireAuth>} />

            <Route path="/usuario" element={<RequireAuth allowedRoles={['usuario']}><MainLayout><UserDashboard /></MainLayout></RequireAuth>} />
            <Route path="/usuario/perfil" element={<RequireAuth allowedRoles={['usuario']}><MainLayout><ClientePerfil /></MainLayout></RequireAuth>} />
            <Route path="/usuario/soporte" element={<RequireAuth allowedRoles={['usuario']}><MainLayout><ClienteSoporte /></MainLayout></RequireAuth>} />

            <Route path="/tecnico" element={<RequireAuth allowedRoles={['tecnico']}><MainLayout><TechnicianDashboard /></MainLayout></RequireAuth>} />
            <Route path="/tecnico/tareas" element={<RequireAuth allowedRoles={['tecnico']}><MainLayout><TecnicoTareas /></MainLayout></RequireAuth>} />
            <Route path="/tecnico/inventario" element={<RequireAuth allowedRoles={['tecnico']}><MainLayout><TecnicoInventario /></MainLayout></RequireAuth>} />

            {/* Ruta para manejar cualquier otra ruta no definida */}
            <Route path="*" element={<div>Página no encontrada</div>} />
          </Routes>
        </AuthProvider>
      </Router>

    </>

  );
};
export default App;

