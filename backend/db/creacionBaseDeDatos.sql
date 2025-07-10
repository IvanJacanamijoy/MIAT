CREATE DATABASE MIAT;

USE MIAT;

CREATE TABLE Rol (
    IdRol INT PRIMARY KEY AUTO_INCREMENT,
    Descripcion VARCHAR(50) NOT NULL
);

CREATE TABLE Estado (
    IdEstado INT PRIMARY KEY AUTO_INCREMENT,
    Descripcion VARCHAR(50) NOT NULL
);

INSERT INTO Estado (Descripcion) VALUES
('Activo'),         -- IdEstado = 1
('Inactivo'),         -- IdEstado = 2
('En proceso'),         -- IdEstado = 3
('Finalizado');         -- IdEstado = 4

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
    FOREIGN KEY (IdRol) REFERENCES Rol(IdRol),
    FOREIGN KEY (IdEstado) REFERENCES Estado(IdEstado)
);

CREATE TABLE TipoServicio (
    IdTipoServicio INT PRIMARY KEY AUTO_INCREMENT,
    Descripcion VARCHAR(100) NOT NULL
);

INSERT INTO TipoServicio (Descripcion) VALUES
('Mantenimiento Eléctrico'),
('Instalaciones Eléctricas'),
('Adecuaciones Eléctricas'),
('Trámites Legales Eléctricos');

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

CREATE TABLE CitaTipoServicio (
    IdCita INT,
    IdTipoServicio INT,
    PRIMARY KEY (IdCita, IdTipoServicio),
    FOREIGN KEY (IdCita) REFERENCES CitaServicio(IdCita),
    FOREIGN KEY (IdTipoServicio) REFERENCES TipoServicio(IdTipoServicio)
);


CREATE TABLE Diagnostico (
    IdDiagnostico INT PRIMARY KEY AUTO_INCREMENT,
    Descripcion TEXT NOT NULL,
    Medidas TEXT,
    Materiales TEXT,
    FotoDiagnostico VARCHAR(255),
    IdCita INT UNIQUE NOT NULL,
    FOREIGN KEY (IdCita) REFERENCES CitaTipoServicio(IdCita)
);

CREATE TABLE Cotizacion (
    IdCotizacion INT PRIMARY KEY AUTO_INCREMENT,
    CostoMateriales DECIMAL(10,2) NOT NULL,
    CostoManoObra DECIMAL(10,2) NOT NULL,
    PrecioTotal DECIMAL(10,2) NOT NULL,
    Garantia TEXT,
    Observaciones TEXT,
    IdDiagnostico INT UNIQUE NOT NULL,
    IdEstado INT NOT NULL,
    FOREIGN KEY (IdDiagnostico) REFERENCES Diagnostico(IdDiagnostico),
    FOREIGN KEY (IdEstado) REFERENCES Estado(IdEstado)
);

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

CREATE TABLE ServicioTipoServicio (
    IdServicio INT,
    IdTipoServicio INT,
    PRIMARY KEY (IdServicio, IdTipoServicio),
    FOREIGN KEY (IdServicio) REFERENCES Servicio(IdServicio),
    FOREIGN KEY (IdTipoServicio) REFERENCES TipoServicio(IdTipoServicio)
);

-- Insertar datos ficticios en la tabla Rol
INSERT INTO Rol (Descripcion) VALUES
('Usuario'),         -- IdRol = 1
('Técnico'),         -- IdRol = 2
('Administrador');   -- IdRol = 3

-- Insertar datos ficticios en la tabla Usuario

INSERT INTO usuario (Nombres, Apellidos, Email, Identificacion, Contraseña, Direccion, Telefono, IdRol, IdEstado) VALUES
('Juan', 'Perez Gomez', 'admin@admin.com', '1010101010', '$2b$10$gIGIJUxPIF113akSMaxALuWRTGOSoKrKB8MPHXhiDJRU31dEATPeS', 'Calle Falsa 123, Ciudad', '3001112233', 3, 1), -- Administrador
('Maria', 'Lopez Rodriguez', 'usuario@usuario.com', '2020202020', '$2b$10$m8UDA.AAbfcpRH9NfJcdxuunfTSsXwWo9AE4Y1X7YdNFPluh2qZxO', 'Avenida Siempre Viva 456, Pueblo', '3104445566', 1, 1), -- Usuario
('Carlos', 'Garcia Fernandez', 'tecnico@tecnico.com', '3030303030', '$2b$10$Vo.rYFkLqtzJqJJOyyr0SOslC6GlP92UYwgkaT4U2VXu4bcFEbBca', 'Carrera Inventada 789, Villa', '3207778899', 2, 1), -- Tecnico
('Ana', 'Martinez Sanchez', 'ana.martinez@example.com', '4040404040', 'hashed_password_4', 'Transversal Imaginaria 101, Sector', '3010001122', 1, 1), -- Usuario
('Pedro', 'Ramirez Torres', 'pedro.ramirez@example.com', '5050505050', 'hashed_password_5', 'Diagonal Creada 202, Barrio', '3113334455', 2, 1), -- Técnico
('Sofia', 'Diaz Castro', 'sofia.diaz@example.com', '6060606060', 'hashed_password_6', 'Callejón Ficticio 303, Zona', '3216667788', 3, 2), -- Administrador
('Luis', 'Hernandez Vargas', 'luis.hernandez@example.com', '7070707070', 'hashed_password_7', 'Bulevar Soñado 404, Urbanización', '3029990011', 1, 2), -- Usuario
('Elena', 'Jimenez Ruiz', 'elena.jimenez@example.com', '8080808080', 'hashed_password_8', 'Pasaje Abstracto 505, Conjunto', '3122223344', 2, 2), -- Técnico
('Miguel', 'Moreno Gil', 'miguel.moreno@example.com', '9090909090', 'hashed_password_9', 'Ronda Imaginaria 606, Vereda', '3225556677', 1, 1), -- Usuario
('Laura', 'Alvarez Perez', 'laura.alvarez@example.com', '1111111111', 'hashed_password_10', 'Camino Inexistente 707, Finca', '3038889900', 1, 2); -- Usuario


-- Servicio 1
INSERT INTO CitaServicio (Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado) VALUES
('2024-07-01', '09:00:00', 'Calle Principal 101, Barrio Centro', 2, 3, 1); -- Cliente: Maria (2), Tecnico: Carlos (3), Estado: Activo (1)
SET @last_cita_id = LAST_INSERT_ID();
INSERT INTO CitaTipoServicio (IdCita, IdTipoServicio) VALUES (@last_cita_id, 1); -- Mantenimiento Eléctrico

INSERT INTO Diagnostico (Descripcion, Medidas, Materiales, FotoDiagnostico, IdCita) VALUES
('Revisión y ajuste de cableado principal.', 'Inspección visual y termográfica, ajuste de conexiones.', 'Cinta aislante, bridas.', 'http://example.com/diagnostico_srv01.jpg', @last_cita_id);
SET @last_diagnostico_id = LAST_INSERT_ID();

INSERT INTO Cotizacion (CostoMateriales, CostoManoObra, PrecioTotal, Garantia, Observaciones, IdDiagnostico, IdEstado) VALUES
(15.00, 80.00, 95.00, '3 meses por el servicio.', 'Recomendación de mantenimiento anual.', @last_diagnostico_id, 1); -- Estado: Activo (1)
SET @last_cotizacion_id = LAST_INSERT_ID();

INSERT INTO Servicio (Descripcion, FotosAntes, FotosDespues, HoraInicial, HoraFinal, Observaciones, IdCliente, IdTecnico, IdCotizacion, IdEstado) VALUES
('Servicio de mantenimiento preventivo de sistema eléctrico.', 'http://example.com/srv01_antes.jpg', 'http://example.com/srv01_despues.jpg', '09:30:00', '11:00:00', 'Se verificó el correcto funcionamiento de los circuitos.', 2, 3, @last_cotizacion_id, 4); -- Cliente: Maria (2), Tecnico: Carlos (3), Estado: Finalizado (4)
SET @last_servicio_id = LAST_INSERT_ID();
INSERT INTO ServicioTipoServicio (IdServicio, IdTipoServicio) VALUES (@last_servicio_id, 1); -- Mantenimiento Eléctrico

-- Servicio 2
INSERT INTO CitaServicio (Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado) VALUES
('2024-07-02', '10:30:00', 'Avenida del Sol 202, Colonia Jardín', 4, 5, 3); -- Cliente: Ana (4), Tecnico: Pedro (5), Estado: En proceso (3)
SET @last_cita_id = LAST_INSERT_ID();
INSERT INTO CitaTipoServicio (IdCita, IdTipoServicio) VALUES (@last_cita_id, 2); -- Instalaciones Eléctricas

INSERT INTO Diagnostico (Descripcion, Medidas, Materiales, FotoDiagnostico, IdCita) VALUES
('Instalación de nuevos puntos de luz en la cocina.', 'Cableado de circuito adicional, instalación de interruptores y tomas.', 'Cable AWG 12, interruptores, tomas, cajas de registro.', 'http://example.com/diagnostico_srv02.jpg', @last_cita_id);
SET @last_diagnostico_id = LAST_INSERT_ID();

INSERT INTO Cotizacion (CostoMateriales, CostoManoObra, PrecioTotal, Garantia, Observaciones, IdDiagnostico, IdEstado) VALUES
(60.00, 150.00, 210.00, '1 año en la instalación.', 'Pendiente de compra de materiales por el cliente.', @last_diagnostico_id, 3); -- Estado: En proceso (3)
SET @last_cotizacion_id = LAST_INSERT_ID();

INSERT INTO Servicio (Descripcion, FotosAntes, FotosDespues, HoraInicial, HoraFinal, Observaciones, IdCliente, IdTecnico, IdCotizacion, IdEstado) VALUES
('Servicio de instalación de puntos eléctricos en cocina.', 'http://example.com/srv02_antes.jpg', 'http://example.com/srv02_despues.jpg', '11:00:00', '12:30:00', 'Falta segunda cita para finalización.', 4, 5, @last_cotizacion_id, 3); -- Cliente: Ana (4), Tecnico: Pedro (5), Estado: En proceso (3)
SET @last_servicio_id = LAST_INSERT_ID();
INSERT INTO ServicioTipoServicio (IdServicio, IdTipoServicio) VALUES (@last_servicio_id, 2); -- Instalaciones Eléctricas

-- Servicio 3
INSERT INTO CitaServicio (Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado) VALUES
('2024-07-03', '11:00:00', 'Callejon Los Olivos 303, Zona Residencial', 7, 8, 1); -- Cliente: Luis (7), Tecnico: Elena (8), Estado: Activo (1)
SET @last_cita_id = LAST_INSERT_ID();
INSERT INTO CitaTipoServicio (IdCita, IdTipoServicio) VALUES (@last_cita_id, 3); -- Adecuaciones Eléctricas

INSERT INTO Diagnostico (Descripcion, Medidas, Materiales, FotoDiagnostico, IdCita) VALUES
('Adecuación de carga eléctrica para aire acondicionado.', 'Refuerzo de circuito, instalación de breaker dedicado.', 'Cable AWG 10, breaker de 20A, caja de breaker.', 'http://example.com/diagnostico_srv03.jpg', @last_cita_id);
SET @last_diagnostico_id = LAST_INSERT_ID();

INSERT INTO Cotizacion (CostoMateriales, CostoManoObra, PrecioTotal, Garantia, Observaciones, IdDiagnostico, IdEstado) VALUES
(80.00, 200.00, 280.00, '1 año en la adecuación.', 'Servicio completado satisfactoriamente.', @last_diagnostico_id, 4); -- Estado: Finalizado (4)
SET @last_cotizacion_id = LAST_INSERT_ID();

INSERT INTO Servicio (Descripcion, FotosAntes, FotosDespues, HoraInicial, HoraFinal, Observaciones, IdCliente, IdTecnico, IdCotizacion, IdEstado) VALUES
('Servicio de adecuación eléctrica para equipo de alto consumo.', 'http://example.com/srv03_antes.jpg', 'http://example.com/srv03_despues.jpg', '11:30:00', '13:30:00', 'Cliente verificó el correcto funcionamiento.', 7, 8, @last_cotizacion_id, 4); -- Cliente: Luis (7), Tecnico: Elena (8), Estado: Finalizado (4)
SET @last_servicio_id = LAST_INSERT_ID();
INSERT INTO ServicioTipoServicio (IdServicio, IdTipoServicio) VALUES (@last_servicio_id, 3); -- Adecuaciones Eléctricas

-- Servicio 4
INSERT INTO CitaServicio (Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado) VALUES
('2024-07-04', '14:00:00', 'Bulevar Comercial 404, Zona de Negocios', 9, 3, 2); -- Cliente: Miguel (9), Tecnico: Carlos (3), Estado: Inactivo (2)
SET @last_cita_id = LAST_INSERT_ID();
INSERT INTO CitaTipoServicio (IdCita, IdTipoServicio) VALUES (@last_cita_id, 4); -- Trámites Legales Eléctricos

INSERT INTO Diagnostico (Descripcion, Medidas, Materiales, FotoDiagnostico, IdCita) VALUES
('Revisión de planos eléctricos para certificación.', 'Inspección de instalación, elaboración de informe técnico.', 'Ninguno.', 'http://example.com/diagnostico_srv04.jpg', @last_cita_id);
SET @last_diagnostico_id = LAST_INSERT_ID();

INSERT INTO Cotizacion (CostoMateriales, CostoManoObra, PrecioTotal, Garantia, Observaciones, IdDiagnostico, IdEstado) VALUES
(0.00, 350.00, 350.00, 'Sin garantía por ser trámite.', 'Documentación en preparación.', @last_diagnostico_id, 2); -- Estado: Inactivo (2)
SET @last_cotizacion_id = LAST_INSERT_ID();

INSERT INTO Servicio (Descripcion, FotosAntes, FotosDespues, HoraInicial, HoraFinal, Observaciones, IdCliente, IdTecnico, IdCotizacion, IdEstado) VALUES
('Servicio de asesoría y gestión para certificación eléctrica.', 'http://example.com/srv04_antes.jpg', 'http://example.com/srv04_despues.jpg', '14:30:00', '17:30:00', 'Cliente interesado en la agilización de la gestión.', 9, 3, @last_cotizacion_id, 2); -- Cliente: Miguel (9), Tecnico: Carlos (3), Estado: Inactivo (2)
SET @last_servicio_id = LAST_INSERT_ID();
INSERT INTO ServicioTipoServicio (IdServicio, IdTipoServicio) VALUES (@last_servicio_id, 4); -- Trámites Legales Eléctricos

-- Servicio 5
INSERT INTO CitaServicio (Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado) VALUES
('2024-07-05', '08:00:00', 'Edificio Empresarial 505, Piso 10', 10, 5, 1); -- Cliente: Laura (10), Tecnico: Pedro (5), Estado: Activo (1)
SET @last_cita_id = LAST_INSERT_ID();
INSERT INTO CitaTipoServicio (IdCita, IdTipoServicio) VALUES (@last_cita_id, 1); -- Mantenimiento Eléctrico

INSERT INTO Diagnostico (Descripcion, Medidas, Materiales, FotoDiagnostico, IdCita) VALUES
('Fallo intermitente en iluminación. Revisión de cableado.', 'Ajuste de conexiones en luminarias y cajas.', 'Conectores, cinta aislante.', 'http://example.com/diagnostico_srv05.jpg', @last_cita_id);
SET @last_diagnostico_id = LAST_INSERT_ID();

INSERT INTO Cotizacion (CostoMateriales, CostoManoObra, PrecioTotal, Garantia, Observaciones, IdDiagnostico, IdEstado) VALUES
(10.00, 70.00, 80.00, '1 mes por el servicio.', 'Iluminación estable después del ajuste.', @last_diagnostico_id, 4); -- Estado: Finalizado (4)
SET @last_cotizacion_id = LAST_INSERT_ID();

INSERT INTO Servicio (Descripcion, FotosAntes, FotosDespues, HoraInicial, HoraFinal, Observaciones, IdCliente, IdTecnico, IdCotizacion, IdEstado) VALUES
('Servicio de mantenimiento correctivo de iluminación.', 'http://example.com/srv05_antes.jpg', 'http://example.com/srv05_despues.jpg', '08:15:00', '09:00:00', 'Problema de flickering resuelto.', 10, 5, @last_cotizacion_id, 4); -- Cliente: Laura (10), Tecnico: Pedro (5), Estado: Finalizado (4)
SET @last_servicio_id = LAST_INSERT_ID();
INSERT INTO ServicioTipoServicio (IdServicio, IdTipoServicio) VALUES (@last_servicio_id, 1); -- Mantenimiento Eléctrico

-- Servicio 6
INSERT INTO CitaServicio (Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado) VALUES
('2024-07-06', '13:00:00', 'Zona Industrial Sur 606, Nave 3', 2, 8, 3); -- Cliente: Maria (2), Tecnico: Elena (8), Estado: En proceso (3)
SET @last_cita_id = LAST_INSERT_ID();
INSERT INTO CitaTipoServicio (IdCita, IdTipoServicio) VALUES (@last_cita_id, 2); -- Instalaciones Eléctricas

INSERT INTO Diagnostico (Descripcion, Medidas, Materiales, FotoDiagnostico, IdCita) VALUES
('Instalación de tomacorrientes industriales en taller.', 'Cableado de circuito industrial, instalación de tomas 220V.', 'Cable THHN, tomas industriales, caja metálica.', 'http://example.com/diagnostico_srv06.jpg', @last_cita_id);
SET @last_diagnostico_id = LAST_INSERT_ID();

INSERT INTO Cotizacion (CostoMateriales, CostoManoObra, PrecioTotal, Garantia, Observaciones, IdDiagnostico, IdEstado) VALUES
(120.00, 250.00, 370.00, '1 año en la instalación.', 'Pendiente de inspección final del cliente.', @last_diagnostico_id, 3); -- Estado: En proceso (3)
SET @last_cotizacion_id = LAST_INSERT_ID();

INSERT INTO Servicio (Descripcion, FotosAntes, FotosDespues, HoraInicial, HoraFinal, Observaciones, IdCliente, IdTecnico, IdCotizacion, IdEstado) VALUES
('Servicio de instalación de circuitos para maquinaria industrial.', 'http://example.com/srv06_antes.jpg', 'http://example.com/srv06_despues.jpg', '13:30:00', '15:10:00', 'Se requiere verificar carga de los equipos.', 2, 8, @last_cotizacion_id, 3); -- Cliente: Maria (2), Tecnico: Elena (8), Estado: En proceso (3)
SET @last_servicio_id = LAST_INSERT_ID();
INSERT INTO ServicioTipoServicio (IdServicio, IdTipoServicio) VALUES (@last_servicio_id, 2); -- Instalaciones Eléctricas

-- Servicio 7
INSERT INTO CitaServicio (Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado) VALUES
('2024-07-07', '09:00:00', 'Urbanización Vista Hermosa 707, Casa 5', 7, 3, 1); -- Cliente: Luis (7), Tecnico: Carlos (3), Estado: Activo (1)
SET @last_cita_id = LAST_INSERT_ID();
INSERT INTO CitaTipoServicio (IdCita, IdTipoServicio) VALUES (@last_cita_id, 3); -- Adecuaciones Eléctricas

INSERT INTO Diagnostico (Descripcion, Medidas, Materiales, FotoDiagnostico, IdCita) VALUES
('Adecuación de tablero eléctrico principal. Sobrecarga.', 'Reorganización de breakers, balanceo de fases.', 'Breakers adicionales, terminales, etiquetas.', 'http://example.com/diagnostico_srv07.jpg', @last_cita_id);
SET @last_diagnostico_id = LAST_INSERT_ID();

INSERT INTO Cotizacion (CostoMateriales, CostoManoObra, PrecioTotal, Garantia, Observaciones, IdDiagnostico, IdEstado) VALUES
(30.00, 150.00, 180.00, '6 meses en la adecuación.', 'Necesario un nuevo panel si la carga aumenta.', @last_diagnostico_id, 3); -- Estado: En proceso (3)
SET @last_cotizacion_id = LAST_INSERT_ID();

INSERT INTO Servicio (Descripcion, FotosAntes, FotosDespues, HoraInicial, HoraFinal, Observaciones, IdCliente, IdTecnico, IdCotizacion, IdEstado) VALUES
('Servicio de adecuación y balanceo de carga en tablero eléctrico.', 'http://example.com/srv07_antes.jpg', 'http://example.com/srv07_despues.jpg', '09:15:00', '10:30:00', 'Cliente satisfecho con la estabilidad eléctrica.', 7, 3, @last_cotizacion_id, 4); -- Cliente: Luis (7), Tecnico: Carlos (3), Estado: Finalizado (4)
SET @last_servicio_id = LAST_INSERT_ID();
INSERT INTO ServicioTipoServicio (IdServicio, IdTipoServicio) VALUES (@last_servicio_id, 3); -- Adecuaciones Eléctricas

-- Servicio 8
INSERT INTO CitaServicio (Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado) VALUES
('2024-07-08', '16:00:00', 'Calle de la Luna 808, Distrito Tecnológico', 9, 5, 2); -- Cliente: Miguel (9), Tecnico: Pedro (5), Estado: Inactivo (2)
SET @last_cita_id = LAST_INSERT_ID();
INSERT INTO CitaTipoServicio (IdCita, IdTipoServicio) VALUES (@last_cita_id, 4); -- Trámites Legales Eléctricos

INSERT INTO Diagnostico (Descripcion, Medidas, Materiales, FotoDiagnostico, IdCita) VALUES
('Asesoría para regularización de instalación eléctrica antigua.', 'Verificación de normativas, elaboración de documentación.', 'Formularios, sellos profesionales.', 'http://example.com/diagnostico_srv08.jpg', @last_cita_id);
SET @last_diagnostico_id = LAST_INSERT_ID();

INSERT INTO Cotizacion (CostoMateriales, CostoManoObra, PrecioTotal, Garantia, Observaciones, IdDiagnostico, IdEstado) VALUES
(0.00, 400.00, 400.00, 'Sin garantía por ser trámite.', 'Documentos presentados en la entidad reguladora.', @last_diagnostico_id, 2); -- Estado: Inactivo (2)
SET @last_cotizacion_id = LAST_INSERT_ID();

INSERT INTO Servicio (Descripcion, FotosAntes, FotosDespues, HoraInicial, HoraFinal, Observaciones, IdCliente, IdTecnico, IdCotizacion, IdEstado) VALUES
('Servicio de gestión de trámites para licencias eléctricas.', 'http://example.com/srv08_antes.jpg', 'http://example.com/srv08_despues.jpg', '16:30:00', '19:00:00', 'Pendiente de resolución final de la entidad.', 9, 5, @last_cotizacion_id, 2); -- Cliente: Miguel (9), Tecnico: Pedro (5), Estado: Inactivo (2)
SET @last_servicio_id = LAST_INSERT_ID();
INSERT INTO ServicioTipoServicio (IdServicio, IdTipoServicio) VALUES (@last_servicio_id, 4); -- Trámites Legales Eléctricos

-- Servicio 9
INSERT INTO CitaServicio (Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado) VALUES
('2024-07-09', '10:00:00', 'Calle Las Flores 909, Pueblo Nuevo', 10, 8, 1); -- Cliente: Laura (10), Tecnico: Elena (8), Estado: Activo (1)
SET @last_cita_id = LAST_INSERT_ID();
INSERT INTO CitaTipoServicio (IdCita, IdTipoServicio) VALUES (@last_cita_id, 1); -- Mantenimiento Eléctrico

INSERT INTO Diagnostico (Descripcion, Medidas, Materiales, FotoDiagnostico, IdCita) VALUES
('Problema de cortocircuito en circuito de alumbrado.', 'Detección de falla, reemplazo de cableado afectado.', 'Cable AWG 14, breaker, conectores.', 'http://example.com/diagnostico_srv09.jpg', @last_cita_id);
SET @last_diagnostico_id = LAST_INSERT_ID();

INSERT INTO Cotizacion (CostoMateriales, CostoManoObra, PrecioTotal, Garantia, Observaciones, IdDiagnostico, IdEstado) VALUES
(25.00, 180.00, 205.00, '3 meses por reparación.', 'Circuito de alumbrado funcionando sin problemas.', @last_diagnostico_id, 4); -- Estado: Finalizado (4)
SET @last_cotizacion_id = LAST_INSERT_ID();

INSERT INTO Servicio (Descripcion, FotosAntes, FotosDespues, HoraInicial, HoraFinal, Observaciones, IdCliente, IdTecnico, IdCotizacion, IdEstado) VALUES
('Servicio de reparación de cortocircuito en sistema de alumbrado.', 'http://example.com/srv09_antes.jpg', 'http://example.com/srv09_despues.jpg', '10:30:00', '12:30:00', 'Falla eléctrica resuelta y probada.', 10, 8, @last_cotizacion_id, 4); -- Cliente: Laura (10), Tecnico: Elena (8), Estado: Finalizado (4)
SET @last_servicio_id = LAST_INSERT_ID();
INSERT INTO ServicioTipoServicio (IdServicio, IdTipoServicio) VALUES (@last_servicio_id, 1); -- Mantenimiento Eléctrico

-- Servicio 10
INSERT INTO CitaServicio (Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado) VALUES
('2024-07-10', '11:00:00', 'Avenida de la Tecnología 10, Edificio Principal', 2, 3, 1); -- Cliente: Maria (2), Tecnico: Carlos (3), Estado: Activo (1)
SET @last_cita_id = LAST_INSERT_ID();
INSERT INTO CitaTipoServicio (IdCita, IdTipoServicio) VALUES (@last_cita_id, 2); -- Instalaciones Eléctricas

INSERT INTO Diagnostico (Descripcion, Medidas, Materiales, FotoDiagnostico, IdCita) VALUES
('Instalación de ventilador de techo. Conexión eléctrica.', 'Cableado al punto de techo, montaje de ventilador.', 'Ventilador de techo, conectores, tornillos.', 'http://example.com/diagnostico_srv10.jpg', @last_cita_id);
SET @last_diagnostico_id = LAST_INSERT_ID();

INSERT INTO Cotizacion (CostoMateriales, CostoManoObra, PrecioTotal, Garantia, Observaciones, IdDiagnostico, IdEstado) VALUES
(40.00, 100.00, 140.00, '6 meses en la instalación.', 'Funcionamiento del ventilador verificado.', @last_diagnostico_id, 4); -- Estado: Finalizado (4)
SET @last_cotizacion_id = LAST_INSERT_ID();

INSERT INTO Servicio (Descripcion, FotosAntes, FotosDespues, HoraInicial, HoraFinal, Observaciones, IdCliente, IdTecnico, IdCotizacion, IdEstado) VALUES
('Servicio de instalación de ventilador de techo con conexión eléctrica.', 'http://example.com/srv10_antes.jpg', 'http://example.com/srv10_despues.jpg', '11:30:00', '12:30:00', 'Cliente satisfecho con la instalación.', 2, 3, @last_cotizacion_id, 4); -- Cliente: Maria (2), Tecnico: Carlos (3), Estado: Finalizado (4)
SET @last_servicio_id = LAST_INSERT_ID();
INSERT INTO ServicioTipoServicio (IdServicio, IdTipoServicio) VALUES (@last_servicio_id, 2); -- Instalaciones Eléctricas