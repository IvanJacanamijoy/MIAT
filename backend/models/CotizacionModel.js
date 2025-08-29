const knex = require('knex')(require('../config/knexfile').development);

class CotizacionModel {
    constructor() {
        this.tableName = 'Cotizacion';
    }

    async getAllCotizaciones(filters = {}, options = {}) {
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

        // 🔍 Filtros
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
        if (filters.IdCliente) {
            query.where('CS.IdCliente', filters.IdCliente);
        }
        if (filters.IdTecnico) {
            query.where('CS.IdTecnico', filters.IdTecnico);
        }
        if (filters.Materiales) {
            query.where('D.Materiales', 'like', `%${filters.Materiales}%`);
        }
        if (filters.fecha) {
            query.where('CS.Fecha', filters.fecha);
        }
        if (Array.isArray(filters.tipoServicioId) && filters.tipoServicioId.length > 0) {
            query.whereIn('CS.IdCita', function () {
                this.select('CTS.IdCita')
                    .from('CitaTipoServicio as CTS')
                    .whereIn('CTS.IdTipoServicio', filters.tipoServicioId);
            });
        }
        if (filters.ClienteIdentificacion) {
            query.whereRaw('LOWER(Cliente.Identificacion) LIKE ?', [`%${filters.ClienteIdentificacion.toLowerCase()}%`]);
        }

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
            console.log('Consulta SQL generada:', query.toString());
            const rows = await query;
            return rows;
        } catch (error) {
            console.error('Error al obtener cotizaciones:', error);
            throw error;
        }
    }



    async getCotizacionById(id) {
        return await knex(this.tableName).where({ IdCotizacion: id }).first();
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
}

module.exports = new CotizacionModel();