const knex = require('knex')(require('../config/knexfile').development);

class CotizacionModel {
    constructor() {
        this.tableName = 'Cotizacion';
    }

    async getAllCotizaciones(filters = {}, options = {}) {
        // Primero, actualizar cotizaciones expiradas
        await this.updateExpiredQuotes();

        const query = knex('Cotizacion as C')
            .select(
                // Cotización
                'C.IdCotizacion',
                'C.CostoMateriales',
                'C.CostoManoObra',
                'C.PrecioTotal',
                'C.Garantia',
                'C.Observaciones',
                'C.IdEstado',
                'C.FechaCreacion',
                'E.Descripcion as EstadoDescripcion',

                // Diagnóstico
                'D.IdDiagnostico',
                'D.Descripcion as DiagnosticoDescripcion',
                'D.Medidas',
                'D.Materiales',
                'D.FotoDiagnostico',
                'D.IdCita',

                // Cita
                'CS.Fecha',
                'CS.Hora',
                'CS.Direccion',

                // Cliente
                'Cliente.IdUsuario as ClienteId',
                'Cliente.Nombres as ClienteNombres',
                'Cliente.Apellidos as ClienteApellidos',
                'Cliente.Email as ClienteEmail',
                'Cliente.Telefono as ClienteTelefono',
                'Cliente.Identificacion as ClienteIdentificacion',

                // Técnico
                'Tecnico.IdUsuario as TecnicoId',
                'Tecnico.Nombres as TecnicoNombres',
                'Tecnico.Apellidos as TecnicoApellidos',
                'Tecnico.Email as TecnicoEmail',
                'Tecnico.Telefono as TecnicoTelefono',

                // Tipos de servicio
                knex.raw('GROUP_CONCAT(TS.Descripcion SEPARATOR ", ") AS TiposServicioCita')
            )
            .join('Diagnostico as D', 'C.IdDiagnostico', '=', 'D.IdDiagnostico')
            .join('Estado as E', 'C.IdEstado', '=', 'E.IdEstado')
            .join('CitaServicio as CS', 'D.IdCita', '=', 'CS.IdCita')
            .join('Usuario as Cliente', 'CS.IdCliente', '=', 'Cliente.IdUsuario')
            .leftJoin('Usuario as Tecnico', 'CS.IdTecnico', '=', 'Tecnico.IdUsuario')
            .leftJoin('CitaTipoServicio as CTS', 'CS.IdCita', '=', 'CTS.IdCita')
            .leftJoin('TipoServicio as TS', 'CTS.IdTipoServicio', '=', 'TS.IdTipoServicio');

        // 🔍 Filtros dinámicos
        if (filters.IdCotizacion) {
            query.where('C.IdCotizacion', filters.IdCotizacion);
        }

        if (filters.IdDiagnostico) {
            query.where('C.IdDiagnostico', filters.IdDiagnostico);
        }

        if (filters.IdEstado) {
            query.where('C.IdEstado', filters.IdEstado);
        }

        if (filters.IdCita) {
            query.where('D.IdCita', filters.IdCita);
        }

        // ✅ Filtro por técnico
        const tecnicoId = filters.IdTecnico ?? filters.idTecnico ?? filters.tecnicoId;
        if (tecnicoId && tecnicoId !== '') {
            query.where('CS.IdTecnico', tecnicoId);
        }


        // ✅ Filtro por cliente
        const clienteId = filters.IdCliente ?? filters.clienteId;
        if (clienteId !== undefined && clienteId !== '') {
            query.where('CS.IdCliente', clienteId);
            // console.log('Filtro clienteId aplicado:', clienteId);
        }

        // ✅ Filtro por fecha
        if (filters.fecha && filters.fecha !== '') {
            query.where('CS.Fecha', filters.fecha);
        }

        // ✅ Filtro por tipo de servicio
        let tipoServicioIds = filters.tipoServicioId;

        // Si llega como string (ej. '[1]'), conviértelo a array
        if (typeof tipoServicioIds === 'string') {
            try {
                tipoServicioIds = JSON.parse(tipoServicioIds);
            } catch (err) {
                console.warn('tipoServicioId no es un JSON válido:', tipoServicioIds);
                tipoServicioIds = [];
            }
        }

        // Aplica el filtro si es un array válido
        if (Array.isArray(tipoServicioIds) && tipoServicioIds.length > 0) {
            query.whereExists(function () {
                this.select('*')
                    .from('CitaTipoServicio as CTS2')
                    .whereRaw('CTS2.IdCita = CS.IdCita')
                    .whereIn('CTS2.IdTipoServicio', tipoServicioIds);
            });
        }




        // ✅ Filtro por identificación del cliente
        const clienteIdentificacion = filters.ClienteIdentificacion ?? filters.clienteIdentificacion;
        if (clienteIdentificacion && clienteIdentificacion !== '') {
            query.whereRaw('LOWER(Cliente.Identificacion) LIKE ?', [`%${clienteIdentificacion.toLowerCase()}%`]);
        }

        console.log('Filters applied in query:', filters);
        // 🧮 Agrupación para GROUP_CONCAT
        query.groupBy(
            'C.IdCotizacion',
            'C.CostoMateriales',
            'C.CostoManoObra',
            'C.PrecioTotal',
            'C.Garantia',
            'C.Observaciones',
            'C.IdEstado',
            'E.Descripcion',
            'D.IdDiagnostico',
            'D.Descripcion',
            'D.Medidas',
            'D.Materiales',
            'D.FotoDiagnostico',
            'D.IdCita',
            'CS.Fecha',
            'CS.Hora',
            'CS.Direccion',
            'Cliente.IdUsuario',
            'Cliente.Nombres',
            'Cliente.Apellidos',
            'Cliente.Email',
            'Cliente.Telefono',
            'Cliente.Identificacion',
            'Tecnico.IdUsuario',
            'Tecnico.Nombres',
            'Tecnico.Apellidos',
            'Tecnico.Email',
            'Tecnico.Telefono'
        );

        // 📄 Ordenamiento
        const orderBy = options.orderBy || 'CS.Fecha';
        const orderDirection = options.orderDirection || 'DESC';
        query.orderBy(orderBy, orderDirection);
        if (orderBy === 'CS.Fecha') {
            query.orderBy('CS.Hora', orderDirection);
        }

        // 📦 Paginación
        if (options.limit) {
            query.limit(options.limit);
        }
        if (options.offset) {
            query.offset(options.offset);
        }

        try {
            // console.log('Consulta SQL generada:', query.toString());
            const rows = await query;
            return rows;
        } catch (error) {
            console.error('Error al obtener cotizaciones:', error);
            throw error;
        }
    }



    async getCotizacionById(id) {
        return await knex('Cotizacion as C')
            .select(
                'C.*',
                'CS.IdCliente',
                'CS.IdTecnico'
            )
            .join('Diagnostico as D', 'C.IdDiagnostico', '=', 'D.IdDiagnostico')
            .join('CitaServicio as CS', 'D.IdCita', '=', 'CS.IdCita')
            .where('C.IdCotizacion', id)
            .first();
    }

    async createCotizacion(data) {
        const [id] = await knex(this.tableName).insert(data).returning('IdCotizacion');
        return await this.getCotizacionById(id);
    }

    async updateCotizacion(id, data) {
        await knex(this.tableName).where({ IdCotizacion: id }).update(data);
        return await this.getCotizacionById(id);
    }

    async deleteCotizacion(id) {
        return await knex(this.tableName).where({ IdCotizacion: id }).del();
    }

    // Método para actualizar cotizaciones expiradas (más de 1 semana)
    async updateExpiredQuotes() {
        try {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

            // Buscar el ID del estado "Expirada"
            const expiredState = await knex('Estado')
                .where('Descripcion', 'Expirada')
                .first();

            if (!expiredState) {
                console.warn('Estado "Expirada" no encontrado en la base de datos');
                return 0;
            }

            // Actualizar cotizaciones pendientes (IdEstado = 5) que tienen más de 1 semana
            const updatedCount = await knex(this.tableName)
                .where('IdEstado', 5) // Estado pendiente
                .where('FechaCreacion', '<', oneWeekAgo)
                .update({ IdEstado: expiredState.IdEstado });

            if (updatedCount > 0) {
                console.log(`Se marcaron ${updatedCount} cotizaciones como expiradas`);
            }

            return updatedCount;
        } catch (error) {
            console.error('Error al actualizar cotizaciones expiradas:', error);
            throw error;
        }
    }

    // Método para obtener cotizaciones que están por expirar (próximas 24 horas)
    async getQuotesAboutToExpire() {
        try {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

            return await knex(this.tableName)
                .where('IdEstado', 5) // Estado pendiente
                .where('FechaCreacion', '<', tomorrow)
                .where('FechaCreacion', '>=', oneWeekAgo);
        } catch (error) {
            console.error('Error al obtener cotizaciones por expirar:', error);
            throw error;
        }
    }
}

module.exports = new CotizacionModel();