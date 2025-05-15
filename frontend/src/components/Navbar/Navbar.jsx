import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';

// Simulación de datos de usuario y roles (reemplazar con tu lógica de backend)
const usuarios = [
  { id: 1, email: 'admin@example.com', password: 'password', rol: 'admin', nombre: 'Admin' },
  { id: 2, email: 'cliente@example.com', password: 'password', rol: 'cliente', nombre: 'Cliente' },
  { id: 3, email: 'tecnico@example.com', password: 'password', rol: 'tecnico', nombre: 'Técnico' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

//objeto imagenes con las url de las imagenes
const images = {
  logo_miat_rojo: '/src/assets/images/navbar/logo_miat_rojo.png',
  ruta: '/src/assets/navbar/logo_miat_rojo.png'
}

const Navbar = () => {
  const [rol, setRol] = useState(null);
  const [nombre, setNombre] = useState('');
  const [isOpen, setIsOpen] = useState(false); // Para el menú móvil
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioLogueado = localStorage.getItem('usuario');
    if (usuarioLogueado) {
      const usuario = JSON.parse(usuarioLogueado);
      setRol(usuario.rol);
      setNombre(usuario.nombre);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    window.location.href = '/';
  };

  let navigation = [];
  if (rol === 'admin') {
    navigation = [
      { name: 'Dashboard', to: '/admin' },
      { name: 'Usuarios', to: '/admin/usuarios' },
      { name: 'Reportes', to: '/admin/reportes' },
    ];
  } else if (rol === 'usuario') {
    navigation = [
      { name: 'Dashboard', to: '/usuario' },
      { name: 'Perfil', to: '/usuario/perfil' },
      { name: 'Soporte', to: '/usuario/soporte' },
    ];
  } else if (rol === 'tecnico') {
    navigation = [
      { name: 'Dashboard', to: '/tecnico' },
      { name: 'Tareas', to: '/tecnico/tareas' },
      { name: 'Inventario', to: '/tecnico/inventario' },
    ];
  } else {
    navigation = [
      { name: 'Inicio', to: '/' },
      { name: 'Servicios', to: '/service' },
      { name: 'Agenda tu servicio', to: '/schedule' },
      { name: 'Quienes somos', to: '/whoweare' },
      { name: 'Contacto', to: '/contact' },
    ];
  }

  // Función para determinar si un enlace está activo
  const isActive = (path) => {
    return window.location.pathname === path;
  };

  return (
    <nav className=""> {/* Eliminé el as="nav" de Headless UI */}
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-around">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Botón del menú móvil */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-around">
            <div className="flex shrink-0 items-center">
              <img
                alt="Logo miat"
                src={images.logo_miat_rojo}
                className="h-8 w-auto"
              />
              <p className="text-3xl font-bold">MIAT</p>
            </div>
            <div className="hidden sm:ml-6 sm:block bg-red-600 py-4 px-7 rounded-full">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={isActive(item.to)
                      ? 'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
                      : 'text-black hover:bg-white rounded-md px-3 py-2 text-sm font-medium'}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Menú de perfil */}
              <div className="relative ml-3">
                <a
                  className={
                    rol == null ? "hidden" : "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  }
                  role="menuitem"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  Cerrar sesión
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={isActive(item.to)
                ? 'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium block '
                : 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium block cursor-pointer'}
              onClick={() => setIsOpen(false)} // Cerrar el menú al hacer clic
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;