const visitaTecnicaModel = require('../models/VisitaTecnicaModel'); // Importa tu modelo de citas

class VisitaTecnicaController {
    /**
     * Obtiene una cita específica por su ID.
     * GET /api/quotes/:id
     */
    async getVisitaTecnicaById(req, res) {
        try {
            const { id } = req.params;
            const quoteId = parseInt(id, 10); // Asegurarse de que el ID es un número

            if (isNaN(quoteId) || quoteId <= 0) {
                return res.status(400).json({ message: 'ID de cita inválido.' });
            }

            const quote = await visitaTecnicaModel.getById(quoteId);

            if (!quote) {
                return res.status(404).json({ message: 'Cita no encontrada.' });
            }

            // Lógica de autorización: el usuario solo puede ver sus propias citas o si es técnico/admin
            // req.userRole: 1 = Cliente, 2 = Técnico, 3 = Administrador
            // req.userId: ID del usuario autenticado
            if (req.userRole === 1 && req.userId !== quote.IdCliente) {
                return res.status(403).json({ message: 'Acceso denegado. No tiene permiso para ver esta cita.' });
            }
            if (req.userRole === 2 && req.userId !== quote.IdTecnico) {
                return res.status(403).json({ message: 'Acceso denegado. No tiene permiso para ver esta cita.' });
            }
            // Si es administrador (req.userRole === 3), tiene acceso completo

            res.status(200).json(quote);
        } catch (error) {
            console.error('Error al obtener la cita por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener la cita.' });
        }
    }

    /**
     * Obtiene una lista de citas de servicio, con filtros.
     * GET /api/quotes
     * Query params: clienteId, tecnicoId, estadoId, citaId, tipoServicioId, fecha, orderBy, orderDirection
     */
    async getAllVisitasTecnicas(req, res) {
        try {
        const filters = req.query; // Aquí se capturan los query params
        const options = {
            orderBy: req.query.orderBy,
            orderDirection: req.query.orderDirection,
            limit: req.query.limit ? parseInt(req.query.limit) : undefined,
            offset: req.query.offset ? parseInt(req.query.offset) : undefined,
        };

        const citas = await visitaTecnicaModel.getAll(filters, options);
        return res.status(200).json(citas);
    } catch (error) {
        console.error('Error al obtener citas de servicio:', error);
        return res.status(500).json({ message: 'Error interno del servidor al obtener citas de servicio', error: error.message });
    }
    }

    /**
     * Crea una nueva cita de servicio.
     * POST /api/quotes
     * Requiere un método `create` en el visitaTecnicaModel.
     * Solo accesible para Administradores o Clientes que solicitan una cita.
     */
    async createVisitaTecnica(req, res) {
        try {
            // Extraemos solo las propiedades que corresponden directamente a la tabla CitaServicio
            // Esto es crucial para evitar que campos como 'tipoServicioIds' se incluyan en el objeto de inserción principal.
            const { Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado } = req.body;
            
            // Extraemos tipoServicioIds por separado, ya que va a la tabla intermedia CitaTipoServicio
            const tipoServicioIds = req.body.tipoServicioIds;

            // Log para depuración: Ver qué se recibe en el body completo
            console.log('Request Body received:', req.body);

            // Validaciones básicas (puedes expandirlas con librerías como Joi o Express-validator)
            if (!Fecha || !Hora || !Direccion || !IdCliente || !IdEstado) {
                return res.status(400).json({ message: 'Faltan campos obligatorios (Fecha, Hora, Direccion, IdCliente, IdEstado) para crear la cita.' });
            }
            // IdTecnico puede ser null según tu esquema, así que no se valida como obligatorio aquí.

            // Construimos el objeto de datos para la tabla CitaServicio explícitamente.
            // Esto asegura que solo las columnas de CitaServicio estén presentes en el objeto que se insertará.
            const citaDataForInsert = {
                Fecha: Fecha,
                Hora: Hora,
                Direccion: Direccion,
                IdCliente: IdCliente,
                IdTecnico: IdTecnico, // Knex manejará 'null' si se envía, o 'undefined' si no se envía (y la columna es NULLABLE)
                IdEstado: IdEstado
            };

            // Log para depuración: Ver qué objeto se pasa al modelo para la inserción principal
            console.log('citaDataForInsert to CitaServicioModel.create:', citaDataForInsert);
            // Log para depuración: Ver qué array de IDs de tipos de servicio se pasa
            console.log('tipoServicioIds to CitaServicioModel.create (for CitaTipoServicio):', tipoServicioIds);

            const idCita = await visitaTecnicaModel.create(
                citaDataForInsert, // Pasamos el objeto construido explícitamente
                tipoServicioIds // Pasamos el array de IDs de tipos de servicio
            );

            res.status(201).json({ message: 'Cita de servicio creada exitosamente.', id: idCita });
        } catch (error) {
            console.error('Error en el controlador al crear cita:', error);
            // Incluimos el mensaje SQL del error para una depuración más detallada
            res.status(500).json({
                message: 'Error interno del servidor al crear cita.',
                error: error.message,
                sqlMessage: error.sqlMessage || 'No SQL message available' // Para mostrar el mensaje SQL si está disponible
            });
        }
    }

    /**
     * Actualiza una cita de servicio existente.
     * PUT /api/quotes/:id
     * Requiere un método `update` en el visitaTecnicaModel.
     * Solo accesible para Administradores, el Cliente de la cita o el Técnico asignado.
     */
    async updateVisitaTecnica(req, res) {
        try {
            const { id } = req.params;
            const quoteId = parseInt(id, 10);
            const updatedFields = req.body;

            if (isNaN(quoteId) || quoteId <= 0) {
                return res.status(400).json({ message: 'ID de cita inválido.' });
            }

            const existingQuote = await visitaTecnicaModel.getById(quoteId);
            if (!existingQuote) {
                return res.status(404).json({ message: 'Cita no encontrada para actualizar.' });
            }

            // Lógica de autorización para la actualización
            // Admin tiene acceso total
            // Cliente solo puede actualizar su propia cita
            // Técnico solo puede actualizar citas a las que está asignado
            if (req.userRole === 1 && req.userId !== existingQuote.IdCliente) {
                return res.status(403).json({ message: 'Acceso denegado. No tiene permiso para actualizar esta cita.' });
            }
            if (req.userRole === 2 && req.userId !== existingQuote.IdTecnico) {
                return res.status(403).json({ message: 'Acceso denegado. No tiene permiso para actualizar esta cita.' });
            }

            // Validación básica de entrada (sin Zod por ahora)
            if (Object.keys(updatedFields).length === 0) {
                return res.status(400).json({ message: 'No se proporcionaron campos para actualizar.' });
            }
            // Puedes añadir validaciones más específicas aquí para cada campo si es necesario
            if (updatedFields.Fecha && !/^\d{4}-\d{2}-\d{2}$/.test(updatedFields.Fecha)) {
                return res.status(400).json({ message: 'Formato de Fecha inválido (YYYY-MM-DD).' });
            }
            if (updatedFields.Hora && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(updatedFields.Hora)) {
                return res.status(400).json({ message: 'Formato de Hora inválido (HH:MM).' });
            }

            const result = await visitaTecnicaModel.update(quoteId, updatedFields); // Este método debe existir en visitaTecnicaModel
            if (result === 0) {
                return res.status(404).json({ message: 'Cita no encontrada o no se realizaron cambios.' });
            }
            res.status(200).json({ message: 'Cita actualizada exitosamente' });
        } catch (error) {
            console.error('Error al actualizar cita:', error);
            res.status(500).json({ message: 'Error interno del servidor al actualizar la cita.' });
        }
    }

    /**
     * Actualiza el estado de una cita.
     * PATCH /api/quotes/:id/status
     * Requiere un método `updateStatus` en el visitaTecnicaModel.
     * Solo accesible para Administradores o el Técnico asignado (para cambiar a estado completado, por ejemplo).
     * El cliente podría actualizar el estado a "cancelado" si es su cita.
     */
    async updateVisitaTecnicaStatus(req, res) {
        try {
            const { id } = req.params;
            const quoteId = parseInt(id, 10);
            const { IdEstado } = req.body;

            if (isNaN(quoteId) || quoteId <= 0 || !IdEstado) {
                return res.status(400).json({ message: 'ID de cita o nuevo estado inválido.' });
            }

            const existingQuote = await visitaTecnicaModel.getById(quoteId);
            if (!existingQuote) {
                return res.status(404).json({ message: 'Cita no encontrada para actualizar su estado.' });
            }

            // Lógica de autorización para actualizar el estado
            // Admin tiene acceso total
            // Técnico solo puede cambiar el estado de citas a las que está asignado
            // Cliente solo puede cambiar el estado de sus propias citas (ej. a cancelado)
            if (req.userRole === 1 && req.userId !== existingQuote.IdCliente) {
                return res.status(403).json({ message: 'Acceso denegado. No tiene permiso para cambiar el estado de esta cita.' });
            }
            if (req.userRole === 2 && req.userId !== existingQuote.IdTecnico) {
                return res.status(403).json({ message: 'Acceso denegado. No tiene permiso para cambiar el estado de esta cita.' });
            }

            const result = await visitaTecnicaModel.updateStatus(quoteId, IdEstado); // Este método debe existir en visitaTecnicaModel
            if (result === 0) {
                return res.status(404).json({ message: 'Cita no encontrada o no se realizaron cambios en el estado.' });
            }
            res.status(200).json({ message: 'Estado de la cita actualizado exitosamente' });
        } catch (error) {
            console.error('Error al actualizar estado de cita:', error);
            res.status(500).json({ message: 'Error interno del servidor al actualizar el estado de la cita.' });
        }
    }

    /**
     * Elimina una cita de servicio.
     * DELETE /api/quotes/:id
     * Requiere un método `delete` en el visitaTecnicaModel.
     * Solo accesible para Administradores. Opcionalmente para el cliente si la cita no ha sido aceptada/iniciada.
     */
    async deleteVisitaTecnica(req, res) {
        try {
            const { id } = req.params;
            const quoteId = parseInt(id, 10);

            if (isNaN(quoteId) || quoteId <= 0) {
                return res.status(400).json({ message: 'ID de cita inválido.' });
            }

            // Lógica de autorización para la eliminación
            // Solo Administradores pueden eliminar citas
            if (req.userRole !== 3) { // Si no es administrador
                // Opcional: Permitir al cliente cancelar/eliminar si la cita está en un estado específico (ej. pendiente)
                // const existingQuote = await visitaTecnicaModel.getById(quoteId);
                // if (!existingQuote || (req.userRole === 1 && req.userId === existingQuote.IdCliente && existingQuote.IdEstado === ESTADO_PENDIENTE)) {
                //     // Permite al cliente eliminar su propia cita si está pendiente
                // } else {
                //     return res.status(403).json({ message: 'Acceso denegado. Solo administradores pueden eliminar citas.' });
                // }
                return res.status(403).json({ message: 'Acceso denegado. Solo administradores pueden eliminar citas.' });
            }

            const result = await visitaTecnicaModel.delete(quoteId); // Este método debe existir en visitaTecnicaModel
            if (result === 0) {
                return res.status(404).json({ message: 'Cita no encontrada para eliminar.' });
            }
            res.status(204).send(); // 204 No Content para eliminación exitosa
        } catch (error) {
            console.error('Error al eliminar cita:', error);
            res.status(500).json({ message: 'Error interno del servidor al eliminar la cita.' });
        }
    }
}

module.exports = new VisitaTecnicaController();