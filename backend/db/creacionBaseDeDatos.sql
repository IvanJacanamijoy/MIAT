CREATE DATABASE MIAT;

USE MIAT;

CREATE TABLE Rol (
    IdRol INT PRIMARY KEY AUTO_INCREMENT,
    Descripcion VARCHAR(50) NOT NULL
);

CREATE TABLE Persona (
    IdPersona INT PRIMARY KEY AUTO_INCREMENT,
    Nombres VARCHAR(100) NOT NULL,
    Apellidos VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE,
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
    FOREIGN KEY (IdCliente) REFERENCES Persona(IdPersona),
    FOREIGN KEY (IdTecnico) REFERENCES Persona(IdPersona),
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
    FOREIGN KEY (IdTecnico) REFERENCES Persona(IdPersona)
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
    FOREIGN KEY (IdCliente) REFERENCES Persona(IdPersona),
    FOREIGN KEY (IdTecnico) REFERENCES Persona(IdPersona),
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

