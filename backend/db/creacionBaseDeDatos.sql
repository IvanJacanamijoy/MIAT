CREATE DATABASE MIAT;
USE MIAT;

-- Tabla de roles
CREATE TABLE Rol (
    IdRol INT PRIMARY KEY AUTO_INCREMENT,
    Descripcion VARCHAR(50) NOT NULL
);

-- Tabla de estados
CREATE TABLE Estado (
    IdEstado INT PRIMARY KEY AUTO_INCREMENT,
    Descripcion VARCHAR(50) NOT NULL
);

INSERT INTO Estado (Descripcion) VALUES
('Activo'),
('Inactivo'),
('En proceso'),
('Finalizado'),
('Pendiente'),
('Aceptada'),
('Cancelada'),
('Expirada');

-- Tabla de usuarios
CREATE TABLE Usuario (
    IdUsuario INT PRIMARY KEY AUTO_INCREMENT,
    Nombres VARCHAR(100) NOT NULL,
    Apellidos VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE,
    Identificacion VARCHAR(25) UNIQUE NOT NULL,
    Contraseña VARCHAR(255) NOT NULL,
    Direccion TEXT,
    Telefono VARCHAR(20),
    IdRol INT NOT NULL,
    IdEstado INT NOT NULL,
    ResetPasswordToken VARCHAR(255) NULL,
    ResetPasswordExpire BIGINT NULL,
    FOREIGN KEY (IdRol) REFERENCES Rol(IdRol),
    FOREIGN KEY (IdEstado) REFERENCES Estado(IdEstado)
);

-- Insertar roles
INSERT INTO Rol (Descripcion) VALUES
('Usuario'),
('Técnico'),
('Administrador');

-- Tabla de tipos de servicio
CREATE TABLE TipoServicio (
    IdTipoServicio INT PRIMARY KEY AUTO_INCREMENT,
    Descripcion VARCHAR(100) NOT NULL
);

INSERT INTO TipoServicio (Descripcion) VALUES
('Aumento de carga'),
('Cambio de acometidas'),
('Independizaciones'),
('Instalaciones eléctricas'),
('Maniobras de baja y media tensión'),
('Mantenimiento de redes'),
('Modernizaciones y adecuaciones'),
('Trámites y diseños');

-- Tabla de citas
CREATE TABLE CitaServicio (
    IdCita INT PRIMARY KEY AUTO_INCREMENT,
    Fecha DATE NOT NULL,
    Hora TIME NOT NULL,
    Direccion TEXT NOT NULL,
    IdCliente INT NOT NULL,
    IdTecnico INT,
    IdEstado INT NOT NULL,
    FOREIGN KEY (IdCliente) REFERENCES Usuario(IdUsuario),
    FOREIGN KEY (IdTecnico) REFERENCES Usuario(IdUsuario),
    FOREIGN KEY (IdEstado) REFERENCES Estado(IdEstado)
);

-- Tipos de servicio por cita
CREATE TABLE CitaTipoServicio (
    IdCita INT,
    IdTipoServicio INT,
    PRIMARY KEY (IdCita, IdTipoServicio),
    FOREIGN KEY (IdCita) REFERENCES CitaServicio(IdCita),
    FOREIGN KEY (IdTipoServicio) REFERENCES TipoServicio(IdTipoServicio)
);

-- Diagnóstico por cita
CREATE TABLE Diagnostico (
    IdDiagnostico INT PRIMARY KEY AUTO_INCREMENT,
    Descripcion TEXT NOT NULL,
    Medidas TEXT,
    Materiales TEXT,
    FotoDiagnostico VARCHAR(255),
    IdCita INT NOT NULL,
    FOREIGN KEY (IdCita) REFERENCES CitaServicio(IdCita)
);

-- Cotización asociada al diagnóstico
CREATE TABLE Cotizacion (
    IdCotizacion INT PRIMARY KEY AUTO_INCREMENT,
    CostoMateriales DECIMAL(10,2) NOT NULL,
    CostoManoObra DECIMAL(10,2) NOT NULL,
    PrecioTotal DECIMAL(10,2) NOT NULL,
    Garantia TEXT,
    Observaciones TEXT,
    IdDiagnostico INT UNIQUE NOT NULL,
    IdEstado INT NOT NULL,
    FechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (IdDiagnostico) REFERENCES Diagnostico(IdDiagnostico),
    FOREIGN KEY (IdEstado) REFERENCES Estado(IdEstado)
);

-- Servicio final
-- CAMPOS OBLIGATORIOS PARA FINALIZAR: Descripcion, FotosAntes, FotosDespues, HoraInicial, HoraFinal
-- Los servicios pueden crearse con datos incompletos pero solo se pueden finalizar cuando todos los campos obligatorios están completos
CREATE TABLE Servicio (
    IdServicio INT PRIMARY KEY AUTO_INCREMENT,
    Descripcion TEXT,
    FotosAntes VARCHAR(255),
    FotosDespues VARCHAR(255),
    HoraInicial TIME,
    HoraFinal TIME,
    Observaciones TEXT,
    IdCliente INT NOT NULL,
    IdTecnico INT NOT NULL,
    IdCotizacion INT UNIQUE NOT NULL,
    IdEstado INT NOT NULL,
    FOREIGN KEY (IdCliente) REFERENCES Usuario(IdUsuario),
    FOREIGN KEY (IdTecnico) REFERENCES Usuario(IdUsuario),
    FOREIGN KEY (IdCotizacion) REFERENCES Cotizacion(IdCotizacion),
    FOREIGN KEY (IdEstado) REFERENCES Estado(IdEstado)
);

INSERT INTO Usuario (Nombres, Apellidos, Email, Identificacion, Contraseña, Direccion, Telefono, IdRol, IdEstado) VALUES
('Ana', 'Lopez', 'ana@example.com', '1001', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Calle 10 #5', '3120000001', 1, 1),
('Luis', 'Martinez', 'luis@example.com', '1002', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Carrera 20 #10', '3120000002', 2, 1),
('Carla', 'Rojas', 'carla@example.com', '1003', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Avenida 1 #30', '3120000003', 1, 1),
('Jorge', 'Gomez', 'jorge@example.com', '1004', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Transversal 8 #45', '3120000004', 2, 1),
('Sofia', 'Torres', 'sofia@example.com', '1005', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Diagonal 12 #60', '3120000005', 1, 1),
('Andrés', 'Vargas', 'andres@example.com', '1006', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Calle 15 #90', '3120000006', 2, 1);

-- Tipos de servicio por servicio
CREATE TABLE ServicioTipoServicio (
    IdServicio INT,
    IdTipoServicio INT,
    PRIMARY KEY (IdServicio, IdTipoServicio),
    FOREIGN KEY (IdServicio) REFERENCES Servicio(IdServicio),
    FOREIGN KEY (IdTipoServicio) REFERENCES TipoServicio(IdTipoServicio)
);

-- Citas (4)
INSERT INTO CitaServicio (Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado) VALUES
('2024-08-01', '09:00:00', 'Calle 10 #5', 1, 2, 3),
('2024-08-02', '10:30:00', 'Carrera 20 #10', 3, 4, 3),
('2024-08-03', '14:00:00', 'Avenida 1 #30', 5, 6, 3),
('2024-08-04', '08:15:00', 'Transversal 8 #45', 1, 4, 1);

-- CitaTipoServicio
INSERT INTO CitaTipoServicio (IdCita, IdTipoServicio) VALUES
(1, 1), (1, 4),
(2, 3),
(3, 2), (3, 6),
(4, 5);

-- Diagnóstico
INSERT INTO Diagnostico (Descripcion, Medidas, Materiales, FotoDiagnostico, IdCita) VALUES
('Revisión carga eléctrica', 'Reubicar tomas', 'Cables, tomas', 'diagnostico1.jpg', 1),
('Problema en cometida principal', 'Cambiar cometida', 'Cables #8', 'diagnostico2.jpg', 2),
('Fallo en acometida secundaria', 'Extensión de red', 'Poste, fusibles', 'diagnostico3.jpg', 3),
('Chequeo sistema iluminación', 'Actualizar luminarias', 'LED, base E27', 'diagnostico4.jpg', 4);

-- Cotización
INSERT INTO Cotizacion (CostoMateriales, CostoManoObra, PrecioTotal, Garantia, Observaciones, IdDiagnostico, IdEstado) VALUES
(120000.00, 80000.00, 200000.00, '6 meses', 'Incluye instalación completa', 1, 1),
(95000.00, 70000.00, 165000.00, '1 año', 'Fusibles de repuesto incluidos', 2, 3),
(130000.00, 90000.00, 220000.00, '3 meses', 'Materiales certificados', 3, 1),
(75000.00, 60000.00, 135000.00, '6 meses', 'Iluminación incluida', 4, 4);

-- Servicios de ejemplo con diferentes estados de completitud
-- Servicios 1-2: Finalizados (todos los campos completos)
-- Servicios 3-4: En proceso (algunos campos faltantes para demostrar funcionalidad)
INSERT INTO Servicio (Descripcion, FotosAntes, FotosDespues, HoraInicial, HoraFinal, Observaciones, IdCliente, IdTecnico, IdCotizacion, IdEstado) VALUES
('Instalación de acometida nueva', 'antes1.jpg', 'despues1.jpg', '09:00:00', '11:00:00', 'Todo conforme', 1, 2, 1, 4),
('Cambio de fusibles y chequeo', 'antes2.jpg', 'despues2.jpg', '10:30:00', '12:00:00', 'Revisión completa', 3, 4, 2, 4),
('Extensión de red interna', NULL, NULL, NULL, NULL, 'Servicio en proceso, faltan fotos y horarios', 5, 6, 3, 3),
('Actualización iluminación salón', 'antes4.jpg', NULL, '08:15:00', NULL, 'Falta foto después y hora final', 1, 4, 4, 3);


INSERT INTO ServicioTipoServicio (IdServicio, IdTipoServicio) VALUES
(1, 1),
(1, 4),
(2, 3),
(3, 2),
(3, 6),
(4, 5);

-- Insertar 10 usuarios adicionales
-- Contraseña encriptada para 'password123' con bcrypt (salt 10): $2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K
INSERT INTO Usuario (Nombres, Apellidos, Email, Identificacion, Contraseña, Direccion, Telefono, IdRol, IdEstado) VALUES
('Pedro', 'Diaz', 'pedro@example.com', '1007', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Calle 25 #10-15', '3120000007', 1, 1),
('Laura', 'Perez', 'laura@example.com', '1008', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Carrera 30 #5-20', '3120000008', 2, 1),
('Carlos', 'Ramirez', 'carlos@example.com', '1009', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Avenida 5 #40-05', '3120000009', 1, 1),
('Maria', 'Sanchez', 'maria@example.com', '1010', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Transversal 15 #25-30', '3120000010', 2, 1),
('Roberto', 'Fernandez', 'roberto@example.com', '1011', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Diagonal 20 #15-45', '3120000011', 1, 1),
('Elena', 'Ruiz', 'elena@example.com', '1012', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Calle 35 #50-10', '3120000012', 2, 1),
('Diego', 'Morales', 'diego@example.com', '1013', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Carrera 40 #2-55', '3120000013', 1, 1),
('Paula', 'Jimenez', 'paula@example.com', '1014', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Avenida 10 #70-20', '3120000014', 2, 1),
('Juan', 'Herrera', 'juan@example.com', '1015', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Transversal 25 #3-01', '3120000015', 1, 1),
('Gabriela', 'Castro', 'gabriela@example.com', '1016', '$2b$10$uRnbONOXIMeMDN0mlehlUeptx6MrddjFZxJxwhzU2NBnXqeKOwb7K', 'Diagonal 30 #8-75', '3120000016', 3, 1),
('Juan', 'Perez Gomez', 'admin@admin.com', '1010101010', '$2b$10$gIGIJUxPIF113akSMaxALuWRTGOSoKrKB8MPHXhiDJRU31dEATPeS', 'Calle Falsa 123, Ciudad', '3001112233', 3, 1), -- Administrador
('Maria', 'Lopez Rodriguez', 'usuario@usuario.com', '2020202020', '$2b$10$m8UDA.AAbfcpRH9NfJcdxuunfTSsXwWo9AE4Y1X7YdNFPluh2qZxO', 'Avenida Siempre Viva 456, Pueblo', '3104445566', 1, 1), -- Usuario
('Carlos', 'Garcia Fernandez', 'tecnico@tecnico.com', '3030303030', '$2b$10$Vo.rYFkLqtzJqJJOyyr0SOslC6GlP92UYwgkaT4U2VXu4bcFEbBca', 'Carrera Inventada 789, Villa', '3207778899', 2, 1); -- Tecnico

-- Servicios adicionales con diferentes estados de completitud para demostrar funcionalidad
-- Servicios 5-10: Finalizados (todos los campos completos)
-- Servicios 11-15: En proceso (algunos campos faltantes)
-- Servicios 16-19: Mixtos (algunos completos, otros incompletos)

-- Servicio 1 (IdServicio 5) - FINALIZADO
INSERT INTO CitaServicio (Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado) VALUES
('2025-08-05', '09:30:00', 'Calle 10 #5, Apto 201', 7, 8, 3); -- Cliente: Pedro Diaz, Tecnico: Laura Perez
INSERT INTO CitaTipoServicio (IdCita, IdTipoServicio) VALUES (5, 1), (5, 5);
INSERT INTO Diagnostico (Descripcion, Medidas, Materiales, FotoDiagnostico, IdCita) VALUES
('Inspección por bajo voltaje', 'Medición de tensión en puntos clave', 'Multímetro, cables de prueba', 'diag_bajo_voltaje.jpg', 5);
INSERT INTO Cotizacion (CostoMateriales, CostoManoObra, PrecioTotal, Garantia, Observaciones, IdDiagnostico, IdEstado) VALUES
(80000.00, 50000.00, 130000.00, '3 meses', 'Ajuste de conexiones y revisión de carga.', 5, 1);
INSERT INTO Servicio (Descripcion, FotosAntes, FotosDespues, HoraInicial, HoraFinal, Observaciones, IdCliente, IdTecnico, IdCotizacion, IdEstado) VALUES
('Corrección de bajo voltaje', 'antes_voltaje.jpg', 'despues_voltaje.jpg', '09:30:00', '11:00:00', 'Se normalizó el voltaje en todo el inmueble.', 7, 8, 5, 4);
INSERT INTO ServicioTipoServicio (IdServicio, IdTipoServicio) VALUES (5, 1), (5, 5);

-- Servicio 2 (IdServicio 6) - FINALIZADO
INSERT INTO CitaServicio (Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado) VALUES
('2025-08-06', '14:00:00', 'Carrera 30 #5-20, Casa 1', 9, 10, 3); -- Cliente: Carlos Ramirez, Tecnico: Maria Sanchez
INSERT INTO CitaTipoServicio (IdCita, IdTipoServicio) VALUES (6, 2);
INSERT INTO Diagnostico (Descripcion, Medidas, Materiales, FotoDiagnostico, IdCita) VALUES
('Revisión de acometida principal dañada', 'Verificación de empalmes y aislamiento', 'Cinta aislante, conectores', 'diag_acometida_danada.jpg', 6);
INSERT INTO Cotizacion (CostoMateriales, CostoManoObra, PrecioTotal, Garantia, Observaciones, IdDiagnostico, IdEstado) VALUES
(150000.00, 90000.00, 240000.00, '6 meses', 'Reemplazo de tramo de acometida y pruebas de continuidad.', 6, 3);
INSERT INTO Servicio (Descripcion, FotosAntes, FotosDespues, HoraInicial, HoraFinal, Observaciones, IdCliente, IdTecnico, IdCotizacion, IdEstado) VALUES
('Cambio de acometida principal', 'antes_acometida.jpg', 'despues_acometida.jpg', '14:00:00', '16:30:00', 'Se instaló nueva acometida, pruebas OK.', 9, 10, 6, 4);
INSERT INTO ServicioTipoServicio (IdServicio, IdTipoServicio) VALUES (6, 2);

-- Servicio 3 (IdServicio 7) - EN PROCESO (faltan fotos después y hora final)
INSERT INTO CitaServicio (Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado) VALUES
('2025-08-07', '10:00:00', 'Avenida 5 #40-05, Local 3', 11, 12, 3); -- Cliente: Roberto Fernandez, Tecnico: Elena Ruiz
INSERT INTO CitaTipoServicio (IdCita, IdTipoServicio) VALUES (7, 3), (7, 8);
INSERT INTO Diagnostico (Descripcion, Medidas, Materiales, FotoDiagnostico, IdCita) VALUES
('Necesidad de independización de circuitos', 'Diagrama de carga, planos eléctricos', 'Breakers, cableado', 'diag_independizacion.jpg', 7);
INSERT INTO Cotizacion (CostoMateriales, CostoManoObra, PrecioTotal, Garantia, Observaciones, IdDiagnostico, IdEstado) VALUES
(200000.00, 120000.00, 320000.00, '1 año', 'Diseño y ejecución de nuevos circuitos independientes.', 7, 1);
INSERT INTO Servicio (Descripcion, FotosAntes, FotosDespues, HoraInicial, HoraFinal, Observaciones, IdCliente, IdTecnico, IdCotizacion, IdEstado) VALUES
('Independización de circuitos eléctricos', 'antes_circuitos.jpg', NULL, '10:00:00', NULL, 'Trabajo en progreso, faltan fotos finales y hora de finalización.', 11, 12, 7, 3);
INSERT INTO ServicioTipoServicio (IdServicio, IdTipoServicio) VALUES (7, 3), (7, 8);

-- Servicio 4 (IdServicio 8) - EN PROCESO (falta descripción y fotos antes)
INSERT INTO CitaServicio (Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado) VALUES
('2024-08-08', '08:00:00', 'Transversal 15 #25-30, Oficina 502', 13, 14, 3); -- Cliente: Diego Morales, Tecnico: Paula Jimenez
INSERT INTO CitaTipoServicio (IdCita, IdTipoServicio) VALUES (8, 4);
INSERT INTO Diagnostico (Descripcion, Medidas, Materiales, FotoDiagnostico, IdCita) VALUES
('Instalación de puntos de red y tomas', 'Cableado estructurado, canaletas', 'Tomas RJ45, cable UTP', 'diag_red_tomas.jpg', 8);
INSERT INTO Cotizacion (CostoMateriales, CostoManoObra, PrecioTotal, Garantia, Observaciones, IdDiagnostico, IdEstado) VALUES
(100000.00, 70000.00, 170000.00, '6 meses', 'Instalación de 5 puntos de red y 3 tomas eléctricas.', 8, 1);
INSERT INTO Servicio (Descripcion, FotosAntes, FotosDespues, HoraInicial, HoraFinal, Observaciones, IdCliente, IdTecnico, IdCotizacion, IdEstado) VALUES
(NULL, NULL, 'despues_red.jpg', NULL, '12:00:00', 'Servicio iniciado, faltan datos iniciales.', 13, 14, 8, 3);
INSERT INTO ServicioTipoServicio (IdServicio, IdTipoServicio) VALUES (8, 4);

-- Servicio 5 (IdServicio 9) - FINALIZADO
INSERT INTO CitaServicio (Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado) VALUES
('2024-08-09', '11:00:00', 'Diagonal 20 #15-45, Bodega 1', 1, 2, 3); -- Cliente: Ana Lopez, Tecnico: Luis Martinez
INSERT INTO CitaTipoServicio (IdCita, IdTipoServicio) VALUES (9, 5);
INSERT INTO Diagnostico (Descripcion, Medidas, Materiales, FotoDiagnostico, IdCita) VALUES
('Maniobra para conexión de maquinaria', 'Verificación de carga y protecciones', 'Interruptores, contactores', 'diag_maquinaria.jpg', 9);
INSERT INTO Cotizacion (CostoMateriales, CostoManoObra, PrecioTotal, Garantia, Observaciones, IdDiagnostico, IdEstado) VALUES
(180000.00, 110000.00, 290000.00, '6 meses', 'Conexión de nueva maquinaria industrial.', 9, 1);
INSERT INTO Servicio (Descripcion, FotosAntes, FotosDespues, HoraInicial, HoraFinal, Observaciones, IdCliente, IdTecnico, IdCotizacion, IdEstado) VALUES
('Conexión eléctrica de maquinaria', 'antes_maquinaria.jpg', 'despues_maquinaria.jpg', '11:00:00', '15:00:00', 'Maquinaria funcionando correctamente.', 1, 2, 9, 4);
INSERT INTO ServicioTipoServicio (IdServicio, IdTipoServicio) VALUES (9, 5);

-- Servicio 6 (IdServicio 10) - EN PROCESO (falta descripción y hora inicial)
INSERT INTO CitaServicio (Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado) VALUES
('2025-08-10', '09:00:00', 'Calle 35 #50-10, Edificio Principal', 3, 4, 3); -- Cliente: Carla Rojas, Tecnico: Jorge Gomez
INSERT INTO CitaTipoServicio (IdCita, IdTipoServicio) VALUES (10, 6);
INSERT INTO Diagnostico (Descripcion, Medidas, Materiales, FotoDiagnostico, IdCita) VALUES
('Mantenimiento preventivo de redes internas', 'Revisión de cableado, limpieza de tableros', 'Limpiador de contactos, bridas', 'diag_mantenimiento.jpg', 10);
INSERT INTO Cotizacion (CostoMateriales, CostoManoObra, PrecioTotal, Garantia, Observaciones, IdDiagnostico, IdEstado) VALUES
(50000.00, 100000.00, 150000.00, '3 meses', 'Mantenimiento general de la red eléctrica del edificio.', 10, 1);
INSERT INTO Servicio (Descripcion, FotosAntes, FotosDespues, HoraInicial, HoraFinal, Observaciones, IdCliente, IdTecnico, IdCotizacion, IdEstado) VALUES
(NULL, 'antes_mantenimiento.jpg', 'despues_mantenimiento.jpg', NULL, '13:00:00', 'Servicio en progreso, falta descripción y hora inicial.', 3, 4, 10, 3);
INSERT INTO ServicioTipoServicio (IdServicio, IdTipoServicio) VALUES (10, 6);

-- Servicio 7 (IdServicio 11) - FINALIZADO
INSERT INTO CitaServicio (Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado) VALUES
('2024-08-11', '15:00:00', 'Carrera 40 #2-55, Apartamento 101', 5, 6, 3); -- Cliente: Sofia Torres, Tecnico: Andrés Vargas
INSERT INTO CitaTipoServicio (IdCita, IdTipoServicio) VALUES (11, 7);
INSERT INTO Diagnostico (Descripcion, Medidas, Materiales, FotoDiagnostico, IdCita) VALUES
('Modernización de sistema de iluminación', 'Cálculo de lúmenes, diseño de distribución', 'Luminarias LED, cableado', 'diag_modernizacion.jpg', 11);
INSERT INTO Cotizacion (CostoMateriales, CostoManoObra, PrecioTotal, Garantia, Observaciones, IdDiagnostico, IdEstado) VALUES
(250000.00, 150000.00, 400000.00, '1 año', 'Reemplazo de toda la iluminación a tecnología LED.', 11, 1);
INSERT INTO Servicio (Descripcion, FotosAntes, FotosDespues, HoraInicial, HoraFinal, Observaciones, IdCliente, IdTecnico, IdCotizacion, IdEstado) VALUES
('Modernización de iluminación', 'antes_iluminacion.jpg', 'despues_iluminacion.jpg', '15:00:00', '18:00:00', 'Ambiente más iluminado y eficiente.', 5, 6, 11, 4);
INSERT INTO ServicioTipoServicio (IdServicio, IdTipoServicio) VALUES (11, 7);

-- Servicio 8 (IdServicio 12) - EN PROCESO (faltan todas las fotos)
INSERT INTO CitaServicio (Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado) VALUES
('2024-08-12', '09:00:00', 'Avenida 10 #70-20, Consultorio 203', 7, 8, 3); -- Cliente: Pedro Diaz, Tecnico: Laura Perez
INSERT INTO CitaTipoServicio (IdCita, IdTipoServicio) VALUES (12, 8);
INSERT INTO Diagnostico (Descripcion, Medidas, Materiales, FotoDiagnostico, IdCita) VALUES
('Diseño y aprobación de nuevo punto eléctrico', 'Planos, cálculos de carga', 'Documentación, planos', 'diag_punto_electrico.jpg', 12);
INSERT INTO Cotizacion (CostoMateriales, CostoManoObra, PrecioTotal, Garantia, Observaciones, IdDiagnostico, IdEstado) VALUES
(30000.00, 70000.00, 100000.00, 'N/A', 'Trámite de diseño y aprobación ante entidad.', 12, 1);
INSERT INTO Servicio (Descripcion, FotosAntes, FotosDespues, HoraInicial, HoraFinal, Observaciones, IdCliente, IdTecnico, IdCotizacion, IdEstado) VALUES
('Trámite y diseño de punto eléctrico', NULL, NULL, '09:00:00', '11:00:00', 'Documentación en proceso, faltan fotos de evidencia.', 7, 8, 12, 3);
INSERT INTO ServicioTipoServicio (IdServicio, IdTipoServicio) VALUES (12, 8);

-- Servicios restantes simplificados con estados mixtos
-- Algunos finalizados, otros en proceso con diferentes campos faltantes

-- Servicio 9 (IdServicio 13) - FINALIZADO
INSERT INTO CitaServicio (Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado) VALUES
('2025-08-13', '10:30:00', 'Transversal 25 #3-01, Local B', 9, 10, 3);
INSERT INTO CitaTipoServicio (IdCita, IdTipoServicio) VALUES (13, 1), (13, 4);
INSERT INTO Diagnostico (Descripcion, Medidas, Materiales, FotoDiagnostico, IdCita) VALUES
('Aumento de carga para nuevos equipos', 'Cálculo de demanda, revisión de protecciones', 'Cableado de mayor calibre, breaker', 'diag_aumento_carga.jpg', 13);
INSERT INTO Cotizacion (CostoMateriales, CostoManoObra, PrecioTotal, Garantia, Observaciones, IdDiagnostico, IdEstado) VALUES
(160000.00, 90000.00, 250000.00, '6 meses', 'Adecuación para soportar mayor carga eléctrica.', 13, 1);
INSERT INTO Servicio (Descripcion, FotosAntes, FotosDespues, HoraInicial, HoraFinal, Observaciones, IdCliente, IdTecnico, IdCotizacion, IdEstado) VALUES
('Aumento de carga e instalación de tomas', 'antes_carga.jpg', 'despues_carga.jpg', '10:30:00', '14:00:00', 'Sistema eléctrico optimizado para nueva carga.', 9, 10, 13, 4);
INSERT INTO ServicioTipoServicio (IdServicio, IdTipoServicio) VALUES (13, 1), (13, 4);

-- Servicio 10 (IdServicio 14) - EN PROCESO (falta descripción y fotos antes)
INSERT INTO CitaServicio (Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado) VALUES
('2025-08-14', '08:45:00', 'Diagonal 30 #8-75, Apartamento 502', 11, 12, 3);
INSERT INTO CitaTipoServicio (IdCita, IdTipoServicio) VALUES (14, 2);
INSERT INTO Diagnostico (Descripcion, Medidas, Materiales, FotoDiagnostico, IdCita) VALUES
('Cambio de acometida por deterioro', 'Inspección visual y pruebas de aislamiento', 'Acometida nueva, conectores', 'diag_acometida_deterioro.jpg', 14);
INSERT INTO Cotizacion (CostoMateriales, CostoManoObra, PrecioTotal, Garantia, Observaciones, IdDiagnostico, IdEstado) VALUES
(140000.00, 80000.00, 220000.00, '1 año', 'Reemplazo total de la acometida.', 14, 1);
INSERT INTO Servicio (Descripcion, FotosAntes, FotosDespues, HoraInicial, HoraFinal, Observaciones, IdCliente, IdTecnico, IdCotizacion, IdEstado) VALUES
(NULL, NULL, 'despues_acometida_deterioro.jpg', '08:45:00', '11:30:00', 'Trabajo completado, faltan datos iniciales.', 11, 12, 14, 3);
INSERT INTO ServicioTipoServicio (IdServicio, IdTipoServicio) VALUES (14, 2);

-- Servicio 11 (IdServicio 15) - FINALIZADO
INSERT INTO CitaServicio (Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado) VALUES
('2024-08-15', '13:00:00', 'Calle 25 #10-15, Casa 3', 13, 14, 3);
INSERT INTO CitaTipoServicio (IdCita, IdTipoServicio) VALUES (15, 3);
INSERT INTO Diagnostico (Descripcion, Medidas, Materiales, FotoDiagnostico, IdCita) VALUES
('Independización de medidor para local comercial', 'Verificación de instalaciones existentes', 'Medidor, cableado, caja', 'diag_independizacion_medidor.jpg', 15);
INSERT INTO Cotizacion (CostoMateriales, CostoManoObra, PrecioTotal, Garantia, Observaciones, IdDiagnostico, IdEstado) VALUES
(220000.00, 130000.00, 350000.00, '1 año', 'Instalación de medidor independiente para local.', 15, 1);
INSERT INTO Servicio (Descripcion, FotosAntes, FotosDespues, HoraInicial, HoraFinal, Observaciones, IdCliente, IdTecnico, IdCotizacion, IdEstado) VALUES
('Independización de medidor', 'antes_medidor.jpg', 'despues_medidor.jpg', '13:00:00', '17:00:00', 'Medidor independiente instalado y operativo.', 13, 14, 15, 4);
INSERT INTO ServicioTipoServicio (IdServicio, IdTipoServicio) VALUES (15, 3);

-- Servicio 12 (IdServicio 16) - EN PROCESO (faltan horarios)
INSERT INTO CitaServicio (Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado) VALUES
('2024-08-16', '10:00:00', 'Carrera 30 #5-20, Oficina 10', 1, 8, 3);
INSERT INTO CitaTipoServicio (IdCita, IdTipoServicio) VALUES (16, 4), (16, 7);
INSERT INTO Diagnostico (Descripcion, Medidas, Materiales, FotoDiagnostico, IdCita) VALUES
('Instalación de luminarias y adecuación de cableado', 'Diseño de iluminación, revisión de circuitos', 'Luminarias, cableado, interruptores', 'diag_luminarias.jpg', 16);
INSERT INTO Cotizacion (CostoMateriales, CostoManoObra, PrecioTotal, Garantia, Observaciones, IdDiagnostico, IdEstado) VALUES
(170000.00, 100000.00, 270000.00, '6 meses', 'Instalación de 10 luminarias LED y adecuación de cableado.', 16, 1);
INSERT INTO Servicio (Descripcion, FotosAntes, FotosDespues, HoraInicial, HoraFinal, Observaciones, IdCliente, IdTecnico, IdCotizacion, IdEstado) VALUES
('Instalación y adecuación de iluminación', 'antes_iluminacion_oficina.jpg', 'despues_iluminacion_oficina.jpg', NULL, NULL, 'Trabajo completado, faltan registros de horarios.', 1, 8, 16, 3);
INSERT INTO ServicioTipoServicio (IdServicio, IdTipoServicio) VALUES (16, 4), (16, 7);