const express = require('express');
const router = express.Router();
const DiagnosticoController = require('../controller/DiagnosticoController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

// Obtener todos los diagnósticos
router.get('/',
    authenticateToken,
    authorizeRoles([1, 2, 3]),
    DiagnosticoController.getAllDiagnosticos.bind(DiagnosticoController));

// Obtener un diagnóstico por ID
router.get('/:id',
    authenticateToken,
    authorizeRoles([1, 2, 3]),
    DiagnosticoController.getDiagnosticoById.bind(DiagnosticoController));

// Crear un diagnóstico
router.post('/',
    authenticateToken,
    authorizeRoles([ 2, 3]),
    DiagnosticoController.createDiagnostico.bind(DiagnosticoController));

// Actualizar un diagnóstico
router.put('/:id',
    authenticateToken,
    authorizeRoles([ 2, 3]),
    DiagnosticoController.updateDiagnostico.bind(DiagnosticoController));

// Eliminar un diagnóstico
router.delete('/:id',
    authenticateToken,
    authorizeRoles([ 2, 3]),
    DiagnosticoController.deleteDiagnostico.bind(DiagnosticoController));

module.exports = router;