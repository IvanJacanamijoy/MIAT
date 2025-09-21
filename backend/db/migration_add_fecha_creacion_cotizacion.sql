-- Migración para agregar campo FechaCreacion a la tabla Cotizacion
-- Ejecutar este script para actualizar la base de datos existente

USE MIAT;

-- Agregar campo FechaCreacion a la tabla Cotizacion
ALTER TABLE Cotizacion 
ADD COLUMN FechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Actualizar registros existentes con fecha actual
UPDATE Cotizacion 
SET FechaCreacion = CURRENT_TIMESTAMP 
WHERE FechaCreacion IS NULL;

-- Agregar estado "Expirada" si no existe
INSERT INTO Estado (Descripcion) 
SELECT 'Expirada' 
WHERE NOT EXISTS (SELECT 1 FROM Estado WHERE Descripcion = 'Expirada');

-- Verificar que el campo se agregó correctamente
DESCRIBE Cotizacion;

-- Verificar estados disponibles
SELECT * FROM Estado;