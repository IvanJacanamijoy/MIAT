import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const images = {
  logo_miat_rojo: '/src/assets/images/navbar/logo_miat_rojo.png',
  ruta: '/src/assets/navbar/logo_miat_rojo.png',
};

const Navbar = () => {
  const [rol, setRol] = useState(null);
  const [nombre, setNombre] = useState('');
  const [isOpen, setIsOpen] = useState(false); // Para el menú móvil
  const [scrolled, setScrolled] = useState(false); // efecto toolbar sólo en fondo

  const { usuario, cerrarSesion } = useAuth();

  useEffect(() => {
    const usuarioLogueado = localStorage.getItem('token');
    if (usuarioLogueado && usuario) {
      setRol(usuario.rol);
      setNombre(usuario.nombre);
    }
  }, [usuario]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    cerrarSesion();
  };

  let navigation = [];
  if (rol === 'admin') {
    navigation = [
      { name: 'Inicio', to: '/admin' },
      { name: 'Gestionar Usuarios', to: '/admin/usuarios' },
      { name: 'Visitas Tecnicas', to: '/admin/visitatecnica' },
      { name: 'Cotizaciones', to: '/admin/cotizaciones' },
      { name: 'Servicios e Informes', to: '/admin/servicios' },
    ];
  } else if (rol === 'usuario') {
    navigation = [
      { name: 'Inicio', to: '/usuario' },
      { name: 'Visitas Tecnicas', to: '/usuario/visitatecnica' },
      { name: 'Cotizaciones', to: '/usuario/cotizaciones' },
      { name: 'Servicios e Informes', to: '/usuario/serviciosinformes' },
      { name: 'Contacto', to: '/contacto' },
    ];
  } else if (rol === 'tecnico') {
    navigation = [
      { name: 'Inicio', to: '/tecnico' },
      { name: 'Visitas Asignadas', to: '/tecnico/visitasasignadas' },
      { name: 'Cotizaciones', to: '/tecnico/cotizaciones' },
      { name: 'Servicios e informes', to: '/tecnico/serviciosinformes' },
    ];
  } else {
    navigation = [
      { name: 'Inicio', to: '/' },
      { name: 'Servicios', to: '/servicios' },
      { name: 'Contactanos', to: '/contacto' },
      { name: 'Quienes somos', to: '/quienessomos' },
    ];
  }

  const isActive = (path) => window.location.pathname === path;

  return (
    <nav
      className={classNames(
        'sticky top-0 z-40 min-h-[60px]',
        'backdrop-blur supports-[backdrop-filter]:bg-white/60', // efecto toolbar
        scrolled ? 'bg-white/80 border-b border-gray-200 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="mx-auto w-full px-5">
        <div className="relative flex items-center justify-around">
          <div className="absolute inset-y-0 left-0 flex items-center xl:hidden">
            {/* Botón del menú móvil */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer inline-flex items-center justify-center rounded-4xl p-1 text-gray-700 border-gray-500 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white mt-3 border-2"
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
          <div className="flex flex-1 items-center justify-center xl:items-stretch xl:justify-around mt-3 xl:mt-0">
            <div className="flex shrink-0 items-center">
              <img alt="Logo miat" src={images.logo_miat_rojo} className="h-8 w-auto" />
              <p className="text-3xl font-bold">MIAT</p>
            </div>
            {/* ¡NO modificamos los botones! */}
            <div className="hidden ml-2 sm:ml-6 xl:block bg-red-500 py-3 px-7 rounded-full my-2">
              <div className="flex space-x-4 items-center px-4">
                {navigation.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={isActive(item.to)
                      ? 'bg-white text-black rounded-sm px-2 text-sm font-semibold text-center py-2'
                      : 'text-black hover:bg-white rounded-sm px-2 text-sm font-semibold text-center py-2'}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            {/* boton de cerrar sesion */}
            <div className="absolute inset-y-0 -right-3 xl:flex items-center pr-2 xl:static xl:inset-auto ml-1 xl:pr-0 mt-2 xl:mt-0">
              <a
                className={
                  rol == null ? 'hidden' : 'block px-2 xl:px-4 py-2 text-sm text-gray-700 hover:bg-gray-700 hover:text-white border-2 border-gray-400 cursor-pointer rounded-4xl text-center'
                }
                role="menuitem"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                <span className='hidden xl:block'>Cerrar sesión</span>
                <div className='block xl:hidden'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                  </svg>
                </div>

              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Menú móvil (botones intactos) */}
      <div className={`xl:hidden ${isOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={isActive(item.to)
                ? 'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium block '
                : 'text-gray-700 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium block cursor-pointer'}
              onClick={() => setIsOpen(false)}
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
