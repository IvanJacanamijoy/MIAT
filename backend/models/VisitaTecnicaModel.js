const knex = require('knex')(require('../config/knexfile').development);

class VisitaTecnicaModel {
    /**
 * Obtiene todas las citas de servicio con filtros y opciones de ordenamiento.
 * @param {object} filters - Objeto con los filtros a aplicar (e.g., { clienteId: 1, tecnicoId: 2, estadoId: 1, citaId: 5 }).
 * @param {object} options - Objeto con opciones de ordenamiento (e.g., { orderBy: 'Fecha', orderDirection: 'ASC' }).
 * @returns {Promise<Array>} - Una promesa que resuelve con un array de objetos de citas de servicio.
 */
    async getAll(filters = {}, options = {}) {
        const query = knex(`CitaServicio as CS`)
            .select(
                'CS.IdCita',
                'CS.Fecha',
                'CS.Hora',
                'CS.Direccion',
                'CS.IdCliente',
                'CS.IdTecnico',
                'CS.IdEstado',
                'Cliente.Identificacion as ClienteIdentificacion',
                'Cliente.Nombres as ClienteNombres',
                'Cliente.Apellidos as ClienteApellidos',
                'Cliente.Email as ClienteEmail',
                'Cliente.Telefono as ClienteTelefono',
                'Tecnico.Nombres as TecnicoNombres',
                'Tecnico.Apellidos as TecnicoApellidos',
                'Tecnico.Email as TecnicoEmail',
                'Tecnico.Telefono as TecnicoTelefono',
                'EstadoCita.Descripcion as EstadoCitaDescripcion',
                knex.raw('GROUP_CONCAT(TS.Descripcion SEPARATOR \', \') AS TiposServicioCita')
            )
            .join('Usuario as Cliente', 'CS.IdCliente', '=', 'Cliente.IdUsuario')
            // CAMBIO CLAVE AQUÍ: De INNER JOIN a LEFT JOIN para incluir citas sin técnico asignado
            .leftJoin('Usuario as Tecnico', 'CS.IdTecnico', '=', 'Tecnico.IdUsuario')
            .join('Estado as EstadoCita', 'CS.IdEstado', '=', 'EstadoCita.IdEstado')
            .leftJoin('CitaTipoServicio as CTS', 'CS.IdCita', '=', 'CTS.IdCita')
            .leftJoin('TipoServicio as TS', 'CTS.IdTipoServicio', '=', 'TS.IdTipoServicio');

        // Aplicar filtros

        if (Array.isArray(filters.tipoServicioId) && filters.tipoServicioId.length > 0) {
            query.whereIn('CS.IdCita', function () {
                this.select('CTS.IdCita')
                    .from('CitaTipoServicio as CTS')
                    .whereIn('CTS.IdTipoServicio', filters.tipoServicioId);
            });
        }
        if (filters.fecha) {
            query.where('CS.Fecha', filters.fecha);
        }
        if (filters.direccion) {
            query.where('CS.Direccion', 'like', `%${filters.direccion}%`);
        }
        if (filters.clienteIdentificacion && typeof filters.clienteIdentificacion === 'string') {
            query.whereRaw('LOWER(Cliente.Identificacion) LIKE ?', [`%${filters.clienteIdentificacion.toLowerCase()}%`]);
        }





        // Agrupar por todas las columnas seleccionadas que no son agregaciones
        query.groupBy(
            'CS.IdCita',
            'CS.Fecha',
            'CS.Hora',
            'CS.Direccion',
            'CS.IdCliente',
            'CS.IdTecnico',
            'CS.IdEstado',
            'Cliente.Nombres',
            'Cliente.Apellidos',
            'Cliente.Email',
            'Cliente.Telefono',
            'Tecnico.Nombres',
            'Tecnico.Apellidos',
            'Tecnico.Email',
            'Tecnico.Telefono',
            'EstadoCita.Descripcion',
            'Cliente.Identificacion'
        );

        // Ordenamiento
        const orderBy = options.orderBy || 'CS.Fecha';
        const orderDirection = options.orderDirection || 'DESC';
        query.orderBy(orderBy, orderDirection);
        if (orderBy === 'CS.Fecha') {
            query.orderBy('CS.Hora', orderDirection);
        }

        // Paginación
        if (options.limit) {
            query.limit(options.limit);
        }
        if (options.offset) {
            query.offset(options.offset);
        }

        try {
            // console.log('Generated SQL Query (getAll):', query.toString()); // Log de la consulta SQL generada
            console.log('Consulta SQL generada:', query.toString());

            const rows = await query;
            return rows;
        } catch (error) {
            console.error('Error al obtener citas de servicio:', error);
            throw error;
        }
    }
    /**
     * Obtiene una cita de servicio por su ID.
     * @param {number} id - El ID de la cita.
     * @returns {Promise<object|null>} - La cita encontrada o null si no existe.
     */
    async getById(id) {
        // Reutilizamos la lógica de getAll pero con un filtro específico por IdCita
        const results = await this.getAll({ citaId: id });
        return results.length > 0 ? results[0] : null;
    }

    /**
         * Crea una nueva cita de servicio.
         * @param {object} citaData - Los datos de la cita (Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado).
         * @param {array} tipoServicioIds - Array de IDs de los tipos de servicio asociados a la cita.
         * @returns {Promise<number>} - El ID de la nueva cita creada.
         */
    async create(citaData, tipoServicioIds = []) {
        try {
            const [idCita] = await knex('CitaServicio').insert(citaData);

            if (tipoServicioIds && tipoServicioIds.length > 0) {
                const citaTipoServicioRecords = tipoServicioIds.map(idTipoServicio => ({
                    IdCita: idCita,
                    IdTipoServicio: idTipoServicio
                }));
                await knex('CitaTipoServicio').insert(citaTipoServicioRecords);
            }

            return idCita;
        } catch (error) {
            console.error('Error al crear cita de servicio:', error);
            throw error;
        }
    }

    /**
     * Actualiza una cita de servicio existente.
     * @param {number} id - El ID de la cita a actualizar.
     * @param {object} citaData - Los datos a actualizar.
     * @param {array} tipoServicioIds - Array de IDs de los tipos de servicio para actualizar. Si es null o undefined, no se actualizan. Si es un array vacío, se eliminan todos.
     * @returns {Promise<number>} - La cantidad de filas afectadas.
     */
    async update(id, citaData, tipoServicioIds) {
        try {
            // Actualizar los datos principales de la cita
            const updatedRows = await knex(this.tableName)
                .where('IdCita', id)
                .update(citaData);

            // Actualizar la tabla intermedia CitaTipoServicio
            if (tipoServicioIds !== undefined && tipoServicioIds !== null) {
                // 1. Eliminar entradas existentes para esta cita
                await knex('CitaTipoServicio')
                    .where('IdCita', id)
                    .del();

                // 2. Insertar las nuevas entradas si hay tipos de servicio
                if (tipoServicioIds.length > 0) {
                    const citaTipoServicioRecords = tipoServicioIds.map(idTipoServicio => ({
                        IdCita: id,
                        IdTipoServicio: idTipoServicio
                    }));
                    await knex('CitaTipoServicio').insert(citaTipoServicioRecords);
                }
            }

            return updatedRows;
        } catch (error) {
            console.error('Error al actualizar cita de servicio:', error);
            throw error;
        }
    }

    /**
     * Elimina una cita de servicio por su ID.
     * @param {number} id - El ID de la cita a eliminar.
     * @returns {Promise<number>} - La cantidad de filas eliminadas.
     */
    async delete(id) {
        try {
            // Primero, eliminar registros relacionados en CitaTipoServicio (si existen)
            await knex('CitaTipoServicio').where('IdCita', id).del();

            // Luego, eliminar el diagnóstico relacionado (si existe, ya que tiene IdCita UNIQUE)
            // Es importante notar que tu tabla Diagnostico tiene IdCita UNIQUE NOT NULL.
            // Esto significa que si eliminas la cita, debes manejar el diagnóstico.
            // Aquí se asume que el diagnóstico debe ser eliminado.
            // Si el diagnóstico también tiene una relación con Cotizacion que es UNIQUE,
            // y luego Servicio depende de Cotizacion UNIQUE, la eliminación puede ser compleja.
            // Asegúrate de que el orden de eliminación respete las restricciones de clave foránea.
            // En tu esquema, Diagnostico depende de CitaServicio.
            // Cotizacion depende de Diagnostico.
            // Servicio depende de Cotizacion.
            // Por lo tanto, el orden de eliminación debe ser: Servicio -> Cotizacion -> Diagnostico -> CitaTipoServicio -> CitaServicio.

            // Para simplificar aquí, solo se considera Diagnostico directamente.
            // Si hay Cotizacion asociada al Diagnostico y Servicio a la Cotizacion,
            // tendrás que eliminar en cascada o manejar esas dependencias explícitamente.

            // Verifica si hay un Diagnostico asociado y elimínalo
            const diagnosticoCount = await knex('Diagnostico').where('IdCita', id).count('IdDiagnostico as count');
            if (diagnosticoCount[0].count > 0) {
                // Si existe un Diagnostico, verifica si tiene una Cotizacion y elimínala primero
                const cotizacionCount = await knex('Cotizacion')
                    .whereIn('IdDiagnostico', knex('Diagnostico').select('IdDiagnostico').where('IdCita', id))
                    .count('IdCotizacion as count');
                if (cotizacionCount[0].count > 0) {
                    // Si existe una Cotizacion, verifica si tiene un Servicio y elimínalo primero
                    const servicioCount = await knex('Servicio')
                        .whereIn('IdCotizacion', knex('Cotizacion').select('IdCotizacion')
                            .whereIn('IdDiagnostico', knex('Diagnostico').select('IdDiagnostico').where('IdCita', id)))
                        .count('IdServicio as count');
                    if (servicioCount[0].count > 0) {
                        await knex('Servicio')
                            .whereIn('IdCotizacion', knex('Cotizacion').select('IdCotizacion')
                                .whereIn('IdDiagnostico', knex('Diagnostico').select('IdDiagnostico').where('IdCita', id)))
                            .del();
                    }
                    await knex('Cotizacion')
                        .whereIn('IdDiagnostico', knex('Diagnostico').select('IdDiagnostico').where('IdCita', id))
                        .del();
                }
                await knex('Diagnostico').where('IdCita', id).del();
            }

            // Finalmente, eliminar la cita
            const deletedRows = await knex(this.tableName)
                .where('IdCita', id)
                .del();

            return deletedRows;
        } catch (error) {
            console.error('Error al eliminar cita de servicio:', error);
            throw error;
        }
    }

}
module.exports = new VisitaTecnicaModel();