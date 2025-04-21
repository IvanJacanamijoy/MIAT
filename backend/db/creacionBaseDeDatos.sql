USE MIAT;
CREATE TABLE citas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fecha DATETIME NOT NULL,
  tecnico VARCHAR(50) NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  estado ENUM('pendiente', 'confirmada', 'cancelada') DEFAULT 'pendiente',
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO citas (fecha, tecnico, direccion, estado) VALUES
('2023-11-15 10:00:00', 'Juan Pérez', 'Calle Principal 123, Ciudad A', 'confirmada'),
('2023-11-16 14:30:00', 'María Gómez', 'Avenida Central 456, Ciudad B', 'pendiente'),
('2023-11-17 09:15:00', 'Carlos Rodríguez', 'Boulevard Norte 789, Ciudad C', 'confirmada'),
('2023-11-18 16:45:00', 'Ana López', 'Calle Sur 321, Ciudad D', 'cancelada'),
('2023-11-19 11:30:00', 'Pedro Martínez', 'Avenida Este 654, Ciudad E', 'pendiente');