const express = require('express');
const router = express.Router();
const QuoteController = require('../controller/QuoteController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
 
// GET /api/quotes - Obtener todas las cotizaciones (con filtros según rol)
// Acceso: Administrador, Técnico (sus diagnósticos), Cliente (sus cotizaciones)
router.get(
  '/',
  authenticateToken,
  authorizeRoles([1, 2, 3]),
  QuoteController.getAllQuotes
);

// GET /api/quotes/:id - Obtener cotización por ID
// Acceso: Administrador, Técnico (si la generó), Cliente (si es suya)
router.get(
  '/:id',
  authenticateToken,
  authorizeRoles([1, 2, 3]),
  QuoteController.getQuoteById
);

// POST /api/quotes - Crear una nueva cotización
// Acceso: Técnico (a partir de diagnóstico), Administrador (opcional)
router.post(
  '/',
  authenticateToken,
  authorizeRoles([2, 3]),
  QuoteController.createQuote
);

// PUT /api/quotes/:id - Actualizar una cotización (editar detalles)
// Acceso: Administrador, Técnico (si es el autor)
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles([2, 3]),
  QuoteController.updateQuote
);

// PATCH /api/quotes/:id/status - Actualizar estado de la cotización
// Acceso: Cliente (aceptar/rechazar), Administrador (aprobar/editar estado)
router.patch(
  '/:id/status',
  authenticateToken,
  authorizeRoles([1, 3]),
  QuoteController.updateQuoteStatus
);

// DELETE /api/quotes/:id - Eliminar una cotización
// Acceso: Solo Administrador
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles([3]),
  QuoteController.deleteQuote
);

module.exports = router;
