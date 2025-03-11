import React from 'react';
import styles from './Header.module.css'
import logo from '../assets/images/header/logo1.png'; // Importa la imagen
import logo2 from '../assets/images/header/logo2.svg'; // Importa la imagen
import divisor from '../assets/images/header/divisor.png'; // Importa la imagen

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={`${styles.header_body} row`}>
          {/* Logo */}
          <div className="col-3">
            <img
              src={logo}
              alt="Logo de MIAT Soluciones Eléctricas"
              className={styles.logo}
            />
          </div>

          {/* Texto */}
          <div className='col-6'>
            <h1 className={styles.title}>MIAT</h1>
            <p className={styles.subtitle}>Soluciones Eléctricas</p>
          </div>

          <div className="col-3">
            <img
              src={logo2}
              alt="logo 2"
              className={styles.logo}
            />
          </div>
        </div>
      </div>
      <img src={divisor} alt="divisor" className={styles.divisor} />
    </header>
  );
};