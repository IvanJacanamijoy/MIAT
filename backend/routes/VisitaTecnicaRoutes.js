const express = require('express');
const router = express.Router();
const VisitaTecnicaController = require('../controller/VisitaTecnicaController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');


// Rutas para las citas de servicio
// Aplicamos el middleware `verifyToken` a todas las rutas que requieren un usuario autenticado.
// Luego, aplicamos el middleware `authorize` para restringir el acceso basado en roles específicos.

// GET /api/quotes - Obtener todas las citas (con filtros)
// Acceso: Todos los usuarios autenticados (la lógica de filters en el controlador manejará qué ven según su rol)
router.get(
    '/',
    authenticateToken,
    authorizeRoles([3]),
    VisitaTecnicaController.getAllVisitasTecnicas
);

// GET /api/quotes/:id - Obtener una cita por ID
// Acceso: Cliente (si es su cita), Técnico (si es su cita), Administrador
router.get(
    '/:id',
    authenticateToken,
    authorizeRoles([3]),
    VisitaTecnicaController.getVisitaTecnicaById
);

// POST /api/quotes - Crear una nueva cita
// Acceso: Administrador o Cliente (para sí mismo)
router.post(
    '/',
    authenticateToken, authorizeRoles([3]),
    authorizeRoles([3, 1]), // Un cliente puede crear una cita, pero el controlador valida que sea para sí mismo
    VisitaTecnicaController.createVisitaTecnica
);

// PUT /api/quotes/:id - Actualizar una cita
// Acceso: Administrador, Cliente (si es su cita), Técnico (si es su cita)
router.put(
    '/:id',
    authenticateToken, authorizeRoles([3]),
    authorizeRoles([3, 1, 2]),
    VisitaTecnicaController.updateVisitaTecnica
);

// PATCH /api/quotes/:id/status - Actualizar solo el estado de una cita
// Acceso: Administrador, Técnico (para sus citas), Cliente (para sus citas, ej. cancelar)
router.patch(
    '/:id/status',
    authenticateToken, authorizeRoles([3]),
    authorizeRoles([3, 2, 1]),
    VisitaTecnicaController.updateVisitaTecnicaStatus
);

// DELETE /api/quotes/:id - Eliminar una cita
// Acceso: Solo Administrador
router.delete(
    '/:id',
    authenticateToken, authorizeRoles([3]),
    authorizeRoles([3]),
    VisitaTecnicaController.deleteVisitaTecnica
);

module.exports = router;