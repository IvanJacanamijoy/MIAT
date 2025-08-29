const express = require('express');
const router = express.Router();
const DiagnosticoController = require('../controller/DiagnosticoController');

// Obtener todos los diagnósticos
router.get('/', DiagnosticoController.getAllDiagnosticos.bind(DiagnosticoController));

// Obtener un diagnóstico por ID
router.get('/:id', DiagnosticoController.getDiagnosticoById.bind(DiagnosticoController));

// Crear un diagnóstico
router.post('/', DiagnosticoController.createDiagnostico.bind(DiagnosticoController));

// Actualizar un diagnóstico
router.put('/:id', DiagnosticoController.updateDiagnostico.bind(DiagnosticoController));

// Eliminar un diagnóstico
router.delete('/:id', DiagnosticoController.deleteDiagnostico.bind(DiagnosticoController));

module.exports = router;