-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-09-2025 a las 04:37:25
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `miat`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citaservicio`
--

CREATE TABLE `citaservicio` (
  `IdCita` int(11) NOT NULL,
  `Fecha` date NOT NULL,
  `Hora` time NOT NULL,
  `Direccion` text NOT NULL,
  `IdCliente` int(11) NOT NULL,
  `IdTecnico` int(11) DEFAULT NULL,
  `IdEstado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `citaservicio`
--

INSERT INTO `citaservicio` (`IdCita`, `Fecha`, `Hora`, `Direccion`, `IdCliente`, `IdTecnico`, `IdEstado`) VALUES
(1, '2024-08-01', '09:00:00', 'Calle 10 #5', 1, 2, 3),
(2, '2024-08-02', '10:30:00', 'Carrera 20 #10', 3, 4, 3),
(3, '2024-08-03', '14:00:00', 'Avenida 1 #30', 5, 6, 3),
(4, '2024-08-04', '08:15:00', 'Transversal 8 #45', 1, 4, 1),
(5, '2025-08-05', '09:30:00', 'Calle 10 #5, Apto 201', 18, 19, 3),
(6, '2025-08-06', '14:00:00', 'Carrera 30 #5-20, Casa 1', 18, 10, 3),
(7, '2025-08-07', '10:00:00', 'Avenida 5 #40-05, Local 3', 11, 12, 3),
(8, '2024-08-08', '08:00:00', 'Transversal 15 #25-30, Oficina 502', 18, 14, 3),
(9, '2024-08-09', '11:00:00', 'Diagonal 20 #15-45, Bodega 1', 1, NULL, 3),
(10, '2025-08-10', '09:00:00', 'Calle 35 #50-10, Edificio Principal', 3, 19, 3),
(11, '2024-08-11', '15:00:00', 'Carrera 40 #2-55, Apartamento 101', 5, NULL, 3),
(12, '2024-08-12', '09:00:00', 'Avenida 10 #70-20, Consultorio 203', 7, 8, 3),
(13, '2025-08-13', '10:30:00', 'Transversal 25 #3-01, Local B', 9, 10, 3),
(14, '2025-08-14', '08:45:00', 'Diagonal 30 #8-75, Apartamento 502', 11, NULL, 3),
(15, '2024-08-15', '13:00:00', 'Calle 25 #10-15, Casa 3', 13, 14, 3),
(16, '2024-08-16', '10:00:00', 'Carrera 30 #5-20, Oficina 10', 1, NULL, 3),
(17, '2024-08-17', '14:30:00', 'Avenida 5 #40-05, Bodega 2', 3, 10, 3),
(18, '2024-08-18', '09:15:00', 'Transversal 15 #25-30, Apto 301', 5, 12, 3),
(19, '2024-08-19', '11:00:00', 'Diagonal 20 #15-45, Local C', 7, 14, 3),
(20, '2025-09-18', '10:00:00', 'calle con carrera', 18, 19, 5),
(21, '2025-09-18', '14:00:00', 'calle con carrera', 18, 19, 5),
(22, '2025-09-22', '08:00:00', 'calle con carrera', 18, 19, 5),
(23, '2025-09-23', '12:00:00', 'Carrera Inventada 789, Villa', 18, 19, 5),
(24, '2025-09-22', '14:00:00', 'calle con carrera', 18, NULL, 5),
(25, '2025-09-24', '12:00:00', 'Carrera Inventada 789, Villa', 18, 19, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citatiposervicio`
--

CREATE TABLE `citatiposervicio` (
  `IdCita` int(11) NOT NULL,
  `IdTipoServicio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `citatiposervicio`
--

INSERT INTO `citatiposervicio` (`IdCita`, `IdTipoServicio`) VALUES
(1, 1),
(1, 4),
(2, 3),
(3, 2),
(3, 6),
(4, 5),
(5, 1),
(5, 5),
(6, 2),
(7, 3),
(7, 8),
(8, 4),
(9, 5),
(10, 6),
(11, 7),
(12, 8),
(13, 1),
(13, 4),
(14, 2),
(15, 3),
(16, 4),
(16, 7),
(17, 5),
(18, 6),
(19, 7),
(19, 8),
(20, 1),
(21, 1),
(22, 2),
(23, 1),
(23, 2),
(24, 1),
(25, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cotizacion`
--

CREATE TABLE `cotizacion` (
  `IdCotizacion` int(11) NOT NULL,
  `CostoMateriales` decimal(10,2) NOT NULL,
  `CostoManoObra` decimal(10,2) NOT NULL,
  `PrecioTotal` decimal(10,2) NOT NULL,
  `Garantia` text DEFAULT NULL,
  `Observaciones` text DEFAULT NULL,
  `IdDiagnostico` int(11) NOT NULL,
  `IdEstado` int(11) NOT NULL,
  `FechaCreacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cotizacion`
--

INSERT INTO `cotizacion` (`IdCotizacion`, `CostoMateriales`, `CostoManoObra`, `PrecioTotal`, `Garantia`, `Observaciones`, `IdDiagnostico`, `IdEstado`, `FechaCreacion`) VALUES
(1, 120000.00, 80000.00, 200000.00, '6 meses', 'Incluye instalación completa', 1, 1, '2025-09-21 17:43:47'),
(2, 95000.00, 70000.00, 165000.00, '1 año', 'Fusibles de repuesto incluidos', 2, 3, '2025-09-21 17:43:47'),
(3, 130000.00, 90000.00, 220000.00, '3 meses', 'Materiales certificados', 3, 1, '2025-09-21 17:43:47'),
(4, 75000.00, 60000.00, 135000.00, '6 meses', 'Iluminación incluida', 4, 4, '2025-09-21 17:43:47'),
(5, 80000.00, 50000.00, 130000.00, '3 meses', 'Ajuste de conexiones y revisión de carga.', 5, 1, '2025-09-21 17:43:47'),
(6, 150000.00, 90000.00, 240000.00, '6 meses', 'Reemplazo de tramo de acometida y pruebas de continuidad.', 6, 3, '2025-09-21 17:43:47'),
(7, 200000.00, 120000.00, 320000.00, '1 año', 'Diseño y ejecución de nuevos circuitos independientes.', 7, 1, '2025-09-21 17:43:47'),
(8, 100000.00, 70000.00, 170000.00, '6 meses', 'Instalación de 5 puntos de red y 3 tomas eléctricas.', 8, 1, '2025-09-21 17:43:47'),
(9, 180000.00, 110000.00, 290000.00, '6 meses', 'Conexión de nueva maquinaria industrial.', 9, 1, '2025-09-21 17:43:47'),
(10, 50000.00, 100000.00, 150000.00, '3 meses', 'Mantenimiento general de la red eléctrica del edificio.', 10, 1, '2025-09-21 17:43:47'),
(11, 250000.00, 150000.00, 400000.00, '1 año', 'Reemplazo de toda la iluminación a tecnología LED.', 11, 1, '2025-09-21 17:43:47'),
(12, 30000.00, 70000.00, 100000.00, 'N/A', 'Trámite de diseño y aprobación ante entidad.', 12, 1, '2025-09-21 17:43:47'),
(13, 160000.00, 90000.00, 250000.00, '6 meses', 'Adecuación para soportar mayor carga eléctrica.', 13, 1, '2025-09-21 17:43:47'),
(14, 140000.00, 80000.00, 220000.00, '1 año', 'Reemplazo total de la acometida.', 14, 1, '2025-09-21 17:43:47'),
(15, 220000.00, 130000.00, 350000.00, '1 año', 'Instalación de medidor independiente para local.', 15, 1, '2025-09-21 17:43:47'),
(16, 170000.00, 100000.00, 270000.00, '6 meses', 'Instalación de 10 luminarias LED y adecuación de cableado.', 16, 1, '2025-09-21 17:43:47'),
(17, 90000.00, 60000.00, 150000.00, '3 meses', 'Conexión segura de motor industrial.', 17, 1, '2025-09-21 17:43:47'),
(18, 70000.00, 80000.00, 150000.00, '3 meses', 'Reparación de fallas en tablero eléctrico.', 18, 1, '2025-09-21 17:43:47'),
(19, 190000.00, 110000.00, 300000.00, '1 año', 'Adecuación completa a la normativa eléctrica vigente.', 19, 1, '2025-09-21 17:43:47'),
(20, 41000.00, 500.00, 41500.00, 'nose ', 'nosebro', 21, 7, '2025-09-21 17:43:47'),
(21, 10000.00, 49997.00, 59997.00, 'nose x2', 'nose x3', 22, 6, '2025-09-21 17:52:14'),
(22, 5000.00, 200000.00, 205000.00, 'no x2', 'nose br x3', 23, 7, '2025-09-21 17:52:47'),
(24, 100000.00, 50000.00, 150000.00, '6 meses', 'Cotización de prueba', 24, 5, '2025-09-21 18:52:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diagnostico`
--

CREATE TABLE `diagnostico` (
  `IdDiagnostico` int(11) NOT NULL,
  `Descripcion` text NOT NULL,
  `Medidas` text DEFAULT NULL,
  `Materiales` text DEFAULT NULL,
  `FotoDiagnostico` varchar(255) DEFAULT NULL,
  `IdCita` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `diagnostico`
--

INSERT INTO `diagnostico` (`IdDiagnostico`, `Descripcion`, `Medidas`, `Materiales`, `FotoDiagnostico`, `IdCita`) VALUES
(1, 'Revisión carga eléctrica', 'Reubicar tomas', 'Cables, tomas', 'diagnostico1.jpg', 1),
(2, 'Problema en cometida principal', 'Cambiar cometida', 'Cables #8', 'diagnostico2.jpg', 2),
(3, 'Fallo en acometida secundaria', 'Extensión de red', 'Poste, fusibles', 'diagnostico3.jpg', 3),
(4, 'Chequeo sistema iluminación', 'Actualizar luminarias', 'LED, base E27', 'diagnostico4.jpg', 4),
(5, 'Inspección por bajo voltaje', 'Medición de tensión en puntos clave', 'Multímetro, cables de prueba', 'diag_bajo_voltaje.jpg', 5),
(6, 'Revisión de acometida principal dañada', 'Verificación de empalmes y aislamiento', 'Cinta aislante, conectores', 'diag_acometida_danada.jpg', 6),
(7, 'Necesidad de independización de circuitos', 'Diagrama de carga, planos eléctricos', 'Breakers, cableado', 'diag_independizacion.jpg', 7),
(8, 'Instalación de puntos de red y tomas', 'Cableado estructurado, canaletas', 'Tomas RJ45, cable UTP', 'diag_red_tomas.jpg', 8),
(9, 'Maniobra para conexión de maquinaria', 'Verificación de carga y protecciones', 'Interruptores, contactores', 'diag_maquinaria.jpg', 9),
(10, 'Mantenimiento preventivo de redes internas', 'Revisión de cableado, limpieza de tableros', 'Limpiador de contactos, bridas', 'diag_mantenimiento.jpg', 10),
(11, 'Modernización de sistema de iluminación', 'Cálculo de lúmenes, diseño de distribución', 'Luminarias LED, cableado', 'diag_modernizacion.jpg', 11),
(12, 'Diseño y aprobación de nuevo punto eléctrico', 'Planos, cálculos de carga', 'Documentación, planos', 'diag_punto_electrico.jpg', 12),
(13, 'Aumento de carga para nuevos equipos', 'Cálculo de demanda, revisión de protecciones', 'Cableado de mayor calibre, breaker', 'diag_aumento_carga.jpg', 13),
(14, 'Cambio de acometida por deterioro', 'Inspección visual y pruebas de aislamiento', 'Acometida nueva, conectores', 'diag_acometida_deterioro.jpg', 14),
(15, 'Independización de medidor para local comercial', 'Verificación de instalaciones existentes', 'Medidor, cableado, caja', 'diag_independizacion_medidor.jpg', 15),
(16, 'Instalación de luminarias y adecuación de cableado', 'Diseño de iluminación, revisión de circuitos', 'Luminarias, cableado, interruptores', 'diag_luminarias.jpg', 16),
(17, 'Maniobra de baja tensión para conexión de motor', 'Verificación de seguridad, pruebas de carga', 'Contactores, relés térmicos', 'diag_motor.jpg', 17),
(18, 'Mantenimiento correctivo de tablero eléctrico', 'Revisión de conexiones, limpieza de componentes', 'Limpiador dieléctrico, herramientas', 'diag_tablero.jpg', 18),
(19, 'Adecuación de instalaciones para normativa', 'Revisión de planos, cumplimiento de RETIE', 'Documentación, materiales certificados', 'diag_normativa.jpg', 19),
(21, 'nose bro', 'bro', '[{\"nombre\":\"pvc\",\"cantidad\":\"1\",\"umedida\":\"10\",\"precio\":\"1000\"}]', NULL, 21),
(22, 'nose', 'nose bro', '[{\"nombre\":\"tubo pvc\",\"cantidad\":\"2\",\"umedida\":\"1000\",\"precio\":\"10000\"}]', NULL, 23),
(23, 'nose', 'nose bro', '[{\"nombre\":\"tubo pvc\",\"cantidad\":\"1\",\"umedida\":\"1\",\"precio\":\"1000\"}]', NULL, 22),
(24, 'Diagnóstico de prueba', 'Medidas de prueba', 'Materiales de prueba', NULL, 1),
(25, 'prueba', 'nose', '[{\"nombre\":\"tubo\",\"cantidad\":\"1\",\"umedida\":\"2mt\",\"precio\":\"1000\"}]', NULL, 25);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `IdEstado` int(11) NOT NULL,
  `Descripcion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`IdEstado`, `Descripcion`) VALUES
(1, 'Activo'),
(2, 'Inactivo'),
(3, 'En proceso'),
(4, 'Finalizado'),
(5, 'Pendiente'),
(6, 'Aceptada'),
(7, 'Cancelada'),
(8, 'Expirada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `IdRol` int(11) NOT NULL,
  `Descripcion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`IdRol`, `Descripcion`) VALUES
(1, 'Usuario'),
(2, 'Técnico'),
(3, 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

CREATE TABLE `servicio` (
  `IdServicio` int(11) NOT NULL,
  `Descripcion` text DEFAULT NULL,
  `FotosAntes` varchar(255) DEFAULT NULL,
  `FotosDespues` varchar(255) DEFAULT NULL,
  `HoraInicial` time DEFAULT NULL,
  `HoraFinal` time DEFAULT NULL,
  `Observaciones` text DEFAULT NULL,
  `IdCliente` int(11) NOT NULL,
  `IdTecnico` int(11) NOT NULL,
  `IdCotizacion` int(11) NOT NULL,
  `IdEstado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicio`
--

INSERT INTO `servicio` (`IdServicio`, `Descripcion`, `FotosAntes`, `FotosDespues`, `HoraInicial`, `HoraFinal`, `Observaciones`, `IdCliente`, `IdTecnico`, `IdCotizacion`, `IdEstado`) VALUES
(1, 'Instalación de acometida nueva', 'antes1.jpg', 'despues1.jpg', '09:00:00', '11:00:00', 'Todo conforme', 1, 2, 1, 4),
(2, 'Cambio de fusibles y chequeo', 'antes2.jpg', 'despues2.jpg', '10:30:00', '12:00:00', 'Revisión completa', 3, 4, 2, 3),
(3, 'Extensión de red interna', 'antes3.jpg', 'despues3.jpg', '14:00:00', '16:00:00', 'Se reemplazó cableado viejo', 5, 6, 3, 1),
(4, 'Actualización iluminación salón', 'antes4.jpg', 'despues4.jpg', '08:15:00', '09:30:00', 'Iluminación eficiente instalada', 1, 4, 4, 4),
(5, 'Corrección de bajo voltaje', 'antes_voltaje.jpg', 'despues_voltaje.jpg', '09:30:00', '11:00:00', 'Se normalizó el voltaje en todo el inmueble.', 7, 8, 5, 4),
(6, 'Cambio de acometida principal', 'antes_acometida.jpg', 'despues_acometida.jpg', '14:00:00', '16:30:00', 'Se instaló nueva acometida, pruebas OK.', 9, 10, 6, 4),
(7, 'Independización de circuitos eléctricos', 'antes_circuitos.jpg', 'despues_circuitos.jpg', '10:00:00', '17:00:00', 'Se crearon 3 circuitos independientes para el local.', 11, 12, 7, 4),
(8, 'Instalación de red y tomas eléctricas', 'antes_red.jpg', 'despues_red.jpg', '08:00:00', '12:00:00', 'Se dejaron operativos todos los puntos solicitados.', 13, 14, 8, 4),
(9, 'Conexión eléctrica de maquinaria', 'antes_maquinaria.jpg', 'despues_maquinaria.jpg', '11:00:00', '15:00:00', 'Maquinaria funcionando correctamente.', 1, 2, 9, 4),
(10, 'Mantenimiento de redes eléctricas', 'antes_mantenimiento.jpg', 'despues_mantenimiento.jpg', '09:00:00', '13:00:00', 'Red eléctrica en óptimas condiciones.', 3, 4, 10, 4),
(11, 'Modernización de iluminación', 'antes_iluminacion.jpg', 'despues_iluminacion.jpg', '15:00:00', '18:00:00', 'Ambiente más iluminado y eficiente.', 5, 6, 11, 4),
(12, 'Trámite y diseño de punto eléctrico', 'antes_tramite.jpg', 'despues_tramite.jpg', '09:00:00', '11:00:00', 'Documentación aprobada para la instalación.', 7, 8, 12, 4),
(13, 'Aumento de carga e instalación de tomas', 'antes_carga.jpg', 'despues_carga.jpg', '10:30:00', '14:00:00', 'Sistema eléctrico optimizado para nueva carga.', 9, 10, 13, 4),
(14, 'Cambio de acometida por deterioro', 'antes_acometida_deterioro.jpg', 'despues_acometida_deterioro.jpg', '08:45:00', '11:30:00', 'Acometida nueva y segura instalada.', 11, 12, 14, 4),
(15, 'Independización de medidor', 'antes_medidor.jpg', 'despues_medidor.jpg', '13:00:00', '17:00:00', 'Medidor independiente instalado y operativo.', 13, 14, 15, 4),
(16, 'Instalación y adecuación de iluminación', 'antes_iluminacion_oficina.jpg', 'despues_iluminacion_oficina.jpg', '10:00:00', '15:00:00', 'Oficina con nueva iluminación y cableado actualizado.', 1, 8, 16, 4),
(17, 'Maniobra de conexión de motor', 'antes_motor.jpg', 'despues_motor.jpg', '14:30:00', '16:00:00', 'Motor conectado y funcionando correctamente.', 3, 10, 17, 4),
(18, 'Mantenimiento correctivo de tablero', 'antes_tablero.jpg', 'despues_tablero.jpg', '09:15:00', '12:00:00', 'Tablero eléctrico reparado y funcionando.', 5, 12, 18, 4),
(19, 'Adecuación y modernización a normativa', 'antes_normativa.jpg', 'despues_normativa.jpg', '11:00:00', '16:00:00', 'Instalaciones actualizadas y certificadas.', 7, 14, 19, 4),
(27, 'Servicio de prueba desde cotización #24', NULL, NULL, NULL, NULL, NULL, 1, 2, 24, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `serviciotiposervicio`
--

CREATE TABLE `serviciotiposervicio` (
  `IdServicio` int(11) NOT NULL,
  `IdTipoServicio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `serviciotiposervicio`
--

INSERT INTO `serviciotiposervicio` (`IdServicio`, `IdTipoServicio`) VALUES
(1, 1),
(1, 4),
(2, 3),
(3, 2),
(3, 6),
(4, 5),
(5, 1),
(5, 5),
(6, 2),
(7, 3),
(7, 8),
(8, 4),
(9, 5),
(10, 6),
(11, 7),
(12, 8),
(13, 1),
(13, 4),
(14, 2),
(15, 3),
(16, 4),
(16, 7),
(17, 5),
(18, 6),
(19, 7),
(19, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiposervicio`
--

CREATE TABLE `tiposervicio` (
  `IdTipoServicio` int(11) NOT NULL,
  `Descripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tiposervicio`
--

INSERT INTO `tiposervicio` (`IdTipoServicio`, `Descripcion`) VALUES
(1, 'Aumento de carga'),
(2, 'Cambio de acometidas'),
(3, 'Independizaciones'),
(4, 'Instalaciones eléctricas'),
(5, 'Maniobras de baja y media tensión'),
(6, 'Mantenimiento de redes'),
(7, 'Modernizaciones y adecuaciones'),
(8, 'Trámites y diseños');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `IdUsuario` int(11) NOT NULL,
  `Nombres` varchar(100) NOT NULL,
  `Apellidos` varchar(100) NOT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Identificacion` varchar(25) NOT NULL,
  `Contraseña` varchar(255) NOT NULL,
  `Direccion` text DEFAULT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `IdRol` int(11) NOT NULL,
  `IdEstado` int(11) NOT NULL,
  `ResetPasswordToken` varchar(255) DEFAULT NULL,
  `ResetPasswordExpire` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`IdUsuario`, `Nombres`, `Apellidos`, `Email`, `Identificacion`, `Contraseña`, `Direccion`, `Telefono`, `IdRol`, `IdEstado`, `ResetPasswordToken`, `ResetPasswordExpire`) VALUES
(1, 'Ana', 'Lopez', 'ana@example.com', '1001', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Calle 10 #5', '3120000001', 1, 1, NULL, NULL),
(2, 'Luis', 'Martinez', 'luis@example.com', '1002', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Carrera 20 #10', '3120000002', 2, 1, NULL, NULL),
(3, 'Carla', 'Rojas', 'carla@example.com', '1003', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Avenida 1 #30', '3120000003', 1, 1, NULL, NULL),
(4, 'Jorge', 'Gomez', 'jorge@example.com', '1004', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Transversal 8 #45', '3120000004', 2, 1, NULL, NULL),
(5, 'Sofia', 'Torres', 'sofia@example.com', '1005', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Diagonal 12 #60', '3120000005', 1, 1, NULL, NULL),
(6, 'Andrés', 'Vargas', 'andres@example.com', '1006', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Calle 15 #90', '3120000006', 2, 1, NULL, NULL),
(7, 'Pedro', 'Diaz', 'pedro@example.com', '1007', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Calle 25 #10-15', '3120000007', 1, 1, NULL, NULL),
(8, 'Laura', 'Perez', 'laura@example.com', '1008', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Carrera 30 #5-20', '3120000008', 2, 1, NULL, NULL),
(9, 'Carlos', 'Ramirez', 'carlos@example.com', '1009', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Avenida 5 #40-05', '3120000009', 1, 1, NULL, NULL),
(10, 'Maria', 'Sanchez', 'maria@example.com', '1010', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Transversal 15 #25-30', '3120000010', 2, 1, NULL, NULL),
(11, 'Roberto', 'Fernandez', 'roberto@example.com', '1011', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Diagonal 20 #15-45', '3120000011', 1, 1, NULL, NULL),
(12, 'Elena', 'Ruiz', 'elena@example.com', '1012', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Calle 35 #50-10', '3120000012', 2, 1, NULL, NULL),
(13, 'Diego', 'Morales', 'diego@example.com', '1013', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Carrera 40 #2-55', '3120000013', 1, 1, NULL, NULL),
(14, 'Paula', 'Jimenez', 'paula@example.com', '1014', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Avenida 10 #70-20', '3120000014', 2, 1, NULL, NULL),
(15, 'Juan', 'Herrera', 'juan@example.com', '1015', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Transversal 25 #3-01', '3120000015', 1, 1, NULL, NULL),
(16, 'Gabriela', 'Castro', 'gabriela@example.com', '1016', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Diagonal 30 #8-75', '3120000016', 3, 1, NULL, NULL),
(17, 'Juan', 'Perez Gomez', 'admin@admin.com', '1010101010', '$2b$10$gIGIJUxPIF113akSMaxALuWRTGOSoKrKB8MPHXhiDJRU31dEATPeS', 'Calle Falsa 123, Ciudad', '3001112233', 3, 1, NULL, NULL),
(18, 'Maria', 'Lopez Rodriguez', 'usuario@usuario.com', '2020202020', '$2b$10$m8UDA.AAbfcpRH9NfJcdxuunfTSsXwWo9AE4Y1X7YdNFPluh2qZxO', 'Avenida Siempre Viva 456, Pueblo', '3104445566', 1, 1, NULL, NULL),
(19, 'Carlos', 'Garcia Fernandez', 'tecnico@tecnico.com', '3030303030', '$2b$10$Vo.rYFkLqtzJqJJOyyr0SOslC6GlP92UYwgkaT4U2VXu4bcFEbBca', 'Carrera Inventada 789, Villa', '3207778899', 2, 1, NULL, NULL),
(20, 'ivan', 'rojas', 'ivan@gmail.com', '110010101', '$2b$10$sSPSxhv8boXQ/TNetOJmCuc4IWi1Kpb27sAxuuAgWVC9wnb/Z8h1O', 'Calle Falsa 123, Ciudad', '32111111111', 1, 1, NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `citaservicio`
--
ALTER TABLE `citaservicio`
  ADD PRIMARY KEY (`IdCita`),
  ADD KEY `IdCliente` (`IdCliente`),
  ADD KEY `IdTecnico` (`IdTecnico`),
  ADD KEY `IdEstado` (`IdEstado`);

--
-- Indices de la tabla `citatiposervicio`
--
ALTER TABLE `citatiposervicio`
  ADD PRIMARY KEY (`IdCita`,`IdTipoServicio`),
  ADD KEY `IdTipoServicio` (`IdTipoServicio`);

--
-- Indices de la tabla `cotizacion`
--
ALTER TABLE `cotizacion`
  ADD PRIMARY KEY (`IdCotizacion`),
  ADD UNIQUE KEY `IdDiagnostico` (`IdDiagnostico`),
  ADD KEY `IdEstado` (`IdEstado`);

--
-- Indices de la tabla `diagnostico`
--
ALTER TABLE `diagnostico`
  ADD PRIMARY KEY (`IdDiagnostico`),
  ADD KEY `IdCita` (`IdCita`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`IdEstado`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`IdRol`);

--
-- Indices de la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD PRIMARY KEY (`IdServicio`),
  ADD UNIQUE KEY `IdCotizacion` (`IdCotizacion`),
  ADD KEY `IdCliente` (`IdCliente`),
  ADD KEY `IdTecnico` (`IdTecnico`),
  ADD KEY `IdEstado` (`IdEstado`);

--
-- Indices de la tabla `serviciotiposervicio`
--
ALTER TABLE `serviciotiposervicio`
  ADD PRIMARY KEY (`IdServicio`,`IdTipoServicio`),
  ADD KEY `IdTipoServicio` (`IdTipoServicio`);

--
-- Indices de la tabla `tiposervicio`
--
ALTER TABLE `tiposervicio`
  ADD PRIMARY KEY (`IdTipoServicio`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`IdUsuario`),
  ADD UNIQUE KEY `Identificacion` (`Identificacion`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `IdRol` (`IdRol`),
  ADD KEY `IdEstado` (`IdEstado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `citaservicio`
--
ALTER TABLE `citaservicio`
  MODIFY `IdCita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `cotizacion`
--
ALTER TABLE `cotizacion`
  MODIFY `IdCotizacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `diagnostico`
--
ALTER TABLE `diagnostico`
  MODIFY `IdDiagnostico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `IdEstado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `IdRol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
  MODIFY `IdServicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `tiposervicio`
--
ALTER TABLE `tiposervicio`
  MODIFY `IdTipoServicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `IdUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `citaservicio`
--
ALTER TABLE `citaservicio`
  ADD CONSTRAINT `citaservicio_ibfk_1` FOREIGN KEY (`IdCliente`) REFERENCES `usuario` (`IdUsuario`),
  ADD CONSTRAINT `citaservicio_ibfk_2` FOREIGN KEY (`IdTecnico`) REFERENCES `usuario` (`IdUsuario`),
  ADD CONSTRAINT `citaservicio_ibfk_3` FOREIGN KEY (`IdEstado`) REFERENCES `estado` (`IdEstado`);

--
-- Filtros para la tabla `citatiposervicio`
--
ALTER TABLE `citatiposervicio`
  ADD CONSTRAINT `citatiposervicio_ibfk_1` FOREIGN KEY (`IdCita`) REFERENCES `citaservicio` (`IdCita`),
  ADD CONSTRAINT `citatiposervicio_ibfk_2` FOREIGN KEY (`IdTipoServicio`) REFERENCES `tiposervicio` (`IdTipoServicio`);

--
-- Filtros para la tabla `cotizacion`
--
ALTER TABLE `cotizacion`
  ADD CONSTRAINT `cotizacion_ibfk_1` FOREIGN KEY (`IdDiagnostico`) REFERENCES `diagnostico` (`IdDiagnostico`),
  ADD CONSTRAINT `cotizacion_ibfk_2` FOREIGN KEY (`IdEstado`) REFERENCES `estado` (`IdEstado`);

--
-- Filtros para la tabla `diagnostico`
--
ALTER TABLE `diagnostico`
  ADD CONSTRAINT `diagnostico_ibfk_1` FOREIGN KEY (`IdCita`) REFERENCES `citaservicio` (`IdCita`);

--
-- Filtros para la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD CONSTRAINT `servicio_ibfk_1` FOREIGN KEY (`IdCliente`) REFERENCES `usuario` (`IdUsuario`),
  ADD CONSTRAINT `servicio_ibfk_2` FOREIGN KEY (`IdTecnico`) REFERENCES `usuario` (`IdUsuario`),
  ADD CONSTRAINT `servicio_ibfk_3` FOREIGN KEY (`IdCotizacion`) REFERENCES `cotizacion` (`IdCotizacion`),
  ADD CONSTRAINT `servicio_ibfk_4` FOREIGN KEY (`IdEstado`) REFERENCES `estado` (`IdEstado`);

--
-- Filtros para la tabla `serviciotiposervicio`
--
ALTER TABLE `serviciotiposervicio`
  ADD CONSTRAINT `serviciotiposervicio_ibfk_1` FOREIGN KEY (`IdServicio`) REFERENCES `servicio` (`IdServicio`),
  ADD CONSTRAINT `serviciotiposervicio_ibfk_2` FOREIGN KEY (`IdTipoServicio`) REFERENCES `tiposervicio` (`IdTipoServicio`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`IdRol`) REFERENCES `rol` (`IdRol`),
  ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`IdEstado`) REFERENCES `estado` (`IdEstado`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
