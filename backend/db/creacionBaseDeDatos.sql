CREATE DATABASE MIAT;

USE MIAT;

CREATE TABLE Rol (
    IdRol INT PRIMARY KEY AUTO_INCREMENT,
    Descripcion VARCHAR(50) NOT NULL
);

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
    FOREIGN KEY (IdRol) REFERENCES Rol(IdRol)
);

CREATE TABLE Estado (
    IdEstado INT PRIMARY KEY AUTO_INCREMENT,
    Descripcion VARCHAR(50) NOT NULL
);

CREATE TABLE TipoServicio (
    IdTipoServicio INT PRIMARY KEY AUTO_INCREMENT,
    Descripcion VARCHAR(100) NOT NULL
);

CREATE TABLE CitaServicio (
    IdCita INT PRIMARY KEY AUTO_INCREMENT,
    Fecha DATE NOT NULL,
    Hora TIME NOT NULL,
    Direccion TEXT NOT NULL,
    IdCliente INT NOT NULL,
    IdTecnico INT NOT NULL,
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

CREATE TABLE VisitaTecnica (
    IdVisita INT PRIMARY KEY AUTO_INCREMENT,
    TiempoEstimado INT, -- en minutos
    IdCita INT UNIQUE NOT NULL,
    IdTecnico INT NOT NULL,
    FOREIGN KEY (IdCita) REFERENCES CitaServicio(IdCita),
    FOREIGN KEY (IdTecnico) REFERENCES Usuario(IdUsuario)
);

CREATE TABLE Diagnostico (
    IdDiagnostico INT PRIMARY KEY AUTO_INCREMENT,
    Descripcion TEXT NOT NULL,
    Medidas TEXT,
    Materiales TEXT,
    FotoDiagnostico VARCHAR(255),
    IdVisita INT UNIQUE NOT NULL,
    FOREIGN KEY (IdVisita) REFERENCES VisitaTecnica(IdVisita)
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

INSERT INTO usuario (Nombres, Apellidos, Email, Identificacion, Contraseña, Direccion, Telefono, IdRol) VALUES
('Juan', 'Perez Gomez', 'admin@admin.com', '1010101010', '$2b$10$gIGIJUxPIF113akSMaxALuWRTGOSoKrKB8MPHXhiDJRU31dEATPeS', 'Calle Falsa 123, Ciudad', '3001112233', 3), -- Administrador
('Maria', 'Lopez Rodriguez', 'usuario@usuario.com', '2020202020', '$2b$10$m8UDA.AAbfcpRH9NfJcdxuunfTSsXwWo9AE4Y1X7YdNFPluh2qZxO', 'Avenida Siempre Viva 456, Pueblo', '3104445566', 1), -- Usuario
('Carlos', 'Garcia Fernandez', 'tecnico@tecnico.com', '3030303030', '$2b$10$Vo.rYFkLqtzJqJJOyyr0SOslC6GlP92UYwgkaT4U2VXu4bcFEbBca', 'Carrera Inventada 789, Villa', '3207778899', 2), -- Tecnico
('Ana', 'Martinez Sanchez', 'ana.martinez@example.com', '4040404040', 'hashed_password_4', 'Transversal Imaginaria 101, Sector', '3010001122', 1), -- Usuario
('Pedro', 'Ramirez Torres', 'pedro.ramirez@example.com', '5050505050', 'hashed_password_5', 'Diagonal Creada 202, Barrio', '3113334455', 2), -- Técnico
('Sofia', 'Diaz Castro', 'sofia.diaz@example.com', '6060606060', 'hashed_password_6', 'Callejón Ficticio 303, Zona', '3216667788', 3), -- Administrador
('Luis', 'Hernandez Vargas', 'luis.hernandez@example.com', '7070707070', 'hashed_password_7', 'Bulevar Soñado 404, Urbanización', '3029990011', 1), -- Usuario
('Elena', 'Jimenez Ruiz', 'elena.jimenez@example.com', '8080808080', 'hashed_password_8', 'Pasaje Abstracto 505, Conjunto', '3122223344', 2), -- Técnico
('Miguel', 'Moreno Gil', 'miguel.moreno@example.com', '9090909090', 'hashed_password_9', 'Ronda Imaginaria 606, Vereda', '3225556677', 1), -- Usuario
('Laura', 'Alvarez Perez', 'laura.alvarez@example.com', '1111111111', 'hashed_password_10', 'Camino Inexistente 707, Finca', '3038889900', 1); -- Usuario