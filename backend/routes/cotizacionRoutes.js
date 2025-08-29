const express = require('express');
const router = express.Router();
const CotizacionController = require('../controller/CotizacionController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

// 🧾 GET /api/cotizaciones - Obtener todas las cotizaciones
// Acceso: Cliente, Técnico, Administrador
router.get(
  '/',
  authenticateToken,
  authorizeRoles([1, 2, 3]),
  CotizacionController.getAllCotizaciones
);

// 📄 GET /api/cotizaciones/:id - Obtener cotización por ID
// Acceso: Cliente (si es suya), Técnico (si la generó), Administrador
router.get(
  '/:id',
  authenticateToken,
  authorizeRoles([1, 2, 3]),
  CotizacionController.getCotizacionById
);

// 📝 POST /api/cotizaciones - Crear una nueva cotización
// Acceso: Técnico, Administrador
router.post(
  '/',
  authenticateToken,
  authorizeRoles([2, 3]),
  CotizacionController.createCotizacion
);

// ✏️ PUT /api/cotizaciones/:id - Actualizar una cotización
// Acceso: Técnico (si es el autor), Administrador
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles([2, 3]),
  CotizacionController.updateCotizacion
);

// ❌ DELETE /api/cotizaciones/:id - Eliminar una cotización
// Acceso: Solo Administrador
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles([3]),
  CotizacionController.deleteCotizacion
);

module.exports = router;
