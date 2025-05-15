import { Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout'; // Asegúrate de que la ruta sea correcta
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServicePage from '../pages/ServicePage'

// Componentes para las vistas de cada rol
const AdminDashboard = () => <div>Admin Dashboard</div>;
const AdminUsuarios = () => <div>Admin Usuarios</div>;
const AdminReportes = () => <div>Admin Reportes</div>;

const ClienteDashboard = () => <div>Cliente Dashboard</div>;
const ClientePerfil = () => <div>Cliente Perfil</div>;
const ClienteSoporte = () => <div>Cliente Soporte</div>;

const TecnicoDashboard = () => <div>Técnico Dashboard</div>;
const TecnicoTareas = () => <div>Técnico Tareas</div>;
const TecnicoInventario = () => <div>Técnico Inventario</div>;
const HomePage = () => <div>Página de Inicio</div>

// routes/index.js
export const RoutesApp = () => {
  return (
    <React.Fragment>
      <Navbar/>
      <Route path="/" element={<HomePage />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='home' element={<HomePage/>}/>
        <Route path='/service' element={<ServicePage/>}/>

        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/usuarios" element={<AdminUsuarios />} />
        <Route path="admin/reportes" element={<AdminReportes />} />
        <Route path="cliente" element={<ClienteDashboard />} />
        <Route path="cliente/perfil" element={<ClientePerfil />} />
        <Route path="cliente/soporte" element={<ClienteSoporte />} />
        <Route path="tecnico" element={<TecnicoDashboard />} />
        <Route path="tecnico/tareas" element={<TecnicoTareas />} />
        <Route path="tecnico/inventario" element={<TecnicoInventario />} />
      </Route>
      <Footer/>
    </React.Fragment>
  );
};

export default RoutesApp;