import styles from './Navbar.module.css'
import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para la navegación

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        {/* Botón para colapsar el Navbar en dispositivos móviles */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido del Navbar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav text-center">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link to="/servicios" className="nav-link">Servicios</Link>
            </li>
            <li className="nav-item">
              <Link to="/cotizaciones" className="nav-link">Cotizaciones</Link>
            </li>
            <li className="nav-item">
              <Link to="/historial-servicios" className="nav-link" >Historial de servicios</Link>
            </li>
            <li className="nav-item">
              <Link to="/quienes-somos" className="nav-link">Quienes somos</Link>
            </li>
            <li className="nav-item">
              <Link to="/contacto" className="nav-link">Contacto</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
};
