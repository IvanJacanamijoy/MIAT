import React from 'react';
import styles from './Header.module.css'
import logo from '../assets/images/logo1.png'; // Importa la imagen
import logo2 from '../assets/images/logo2.svg'; // Importa la imagen
 
export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header_body}>
          {/* Logo */}
          <img
            src={logo}
            alt="Logo de MIAT Soluciones Eléctricas"
            className={styles.logo}
          />

          {/* Texto */}
          <div>
            <h1 className="h4 mb-0">MIAT</h1>
            <p className={styles.subtitle}>Soluciones Eléctricas</p>
          </div>

          <img 
            src={logo2} 
            alt=""
            className={styles.logo}
            />
        </div>
      </div>
    </header>
  );
};