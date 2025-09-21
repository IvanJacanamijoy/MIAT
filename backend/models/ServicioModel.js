//importamos knex y pasamos la configuracion para la conexion a la base de datos
const knex = require('knex')(require('../config/knexfile').development);


class ServicioModel {
    /**
     * Obtiene un servicio por su ID, con detalles de la cotización, diagnóstico y usuarios.
     * @param {number} id - El ID del servicio.
     * @returns {object|null} El objeto de servicio o null si no se encuentra.
     */
    async getById(id) {
        const servicio = await knex('Servicio as S')
            .select(
                'S.*',
                'C.CostoMateriales', 'C.CostoManoObra', 'C.PrecioTotal', 'C.Garantia', 'C.Observaciones as CotizacionObservaciones',
                'D.Descripcion as DiagnosticoDescripcion', 'D.Medidas', 'D.Materiales as DiagnosticoMateriales', 'D.FotoDiagnostico',
                'CS.Fecha as CitaFecha', 'CS.Hora as CitaHora', 'CS.Direccion as CitaDireccion',
                'Cliente.Nombres as ClienteNombres', 'Cliente.Apellidos as ClienteApellidos', 'Cliente.Email as ClienteEmail',
                'Tecnico.Nombres as TecnicoNombres', 'Tecnico.Apellidos as TecnicoApellidos', 'Tecnico.Email as TecnicoEmail',
                'ES.Descripcion as EstadoServicioDescripcion',
                'EC.Descripcion as EstadoCotizacionDescripcion'
            )
            .join('Cotizacion as C', 'S.IdCotizacion', '=', 'C.IdCotizacion')
            .join('Diagnostico as D', 'C.IdDiagnostico', '=', 'D.IdDiagnostico')
            .join('VisitaTecnica as VT', 'D.IdVisita', '=', 'VT.IdVisita')
            .join('CitaServicio as CS', 'VT.IdCita', '=', 'CS.IdCita')
            .join('Usuario as Cliente', 'S.IdCliente', '=', 'Cliente.IdUsuario')
            .join('Usuario as Tecnico', 'S.IdTecnico', '=', 'Tecnico.IdUsuario')
            .join('Estado as ES', 'S.IdEstado', '=', 'ES.IdEstado')
            .join('Estado as EC', 'C.IdEstado', '=', 'EC.IdEstado')
            .where('S.IdServicio', id)
            .first(); // Usar .first() para obtener solo el primer resultado

        if (!servicio) return null;

        // Obtener los tipos de servicio asociados
        const tiposServicio = await knex('ServicioTipoServicio as STS')
            .select('TS.IdTipoServicio', 'TS.Descripcion')
            .join('TipoServicio as TS', 'STS.IdTipoServicio', '=', 'TS.IdTipoServicio')
            .where('STS.IdServicio', id);

        servicio.TiposServicio = tiposServicio;

        return servicio;
    }

    /**
     * Obtiene todos los servicios, con opciones de filtrado, paginación y unión de tablas.
     * @param {object} filters - Objeto con filtros (ej. { clienteId, tecnicoId, estadoId, tipoServicioId }).
     * @param {object} options - Opciones de paginación (ej. { limit, offset, orderBy, orderDirection }).
     * @returns {Array<object>} Array de objetos de servicio.
     */
    async getAll(filters = {}, options = {}) {
        const query = knex('Servicio as S')
            .select(
                'S.IdServicio',
                'S.Descripcion',
                'S.FotosAntes',
                'S.FotosDespues',
                'S.HoraInicial',
                'S.HoraFinal',
                'S.Observaciones',

                'S.IdCliente',
                'S.IdTecnico',
                'S.IdCotizacion',
                'S.IdEstado',

                'C.CostoMateriales',
                'C.CostoManoObra',
                'C.PrecioTotal',
                'C.Garantia',
                'C.Observaciones',

                'D.Descripcion as DiagnosticoDescripcion',
                'D.Materiales',
                'D.Medidas',

                'Cliente.Nombres as ClienteNombres',
                'Cliente.Apellidos as ClienteApellidos',
                'Cliente.Identificacion as ClienteIdentificacion',
                'Tecnico.Nombres as TecnicoNombres',
                'Tecnico.Apellidos as TecnicoApellidos',
                'ES.Descripcion as EstadoServicioDescripcion',

                'Cita.Fecha as FechaServicio',
                'Cita.Direccion as DireccionServicio',

                knex.raw('GROUP_CONCAT(DISTINCT TS.Descripcion SEPARATOR \', \') AS TiposServicio')
            )
            .join('Cotizacion as C', 'S.IdCotizacion', '=', 'C.IdCotizacion')
            .join('Diagnostico as D', 'C.IdDiagnostico', '=', 'D.IdDiagnostico')
            .join('CitaServicio as Cita', 'D.IdCita', '=', 'Cita.IdCita')
            .join('Usuario as Cliente', 'S.IdCliente', '=', 'Cliente.IdUsuario')
            .join('Usuario as Tecnico', 'S.IdTecnico', '=', 'Tecnico.IdUsuario')
            .join('Estado as ES', 'S.IdEstado', '=', 'ES.IdEstado')
            .leftJoin('ServicioTipoServicio as STS', 'S.IdServicio', '=', 'STS.IdServicio')
            .leftJoin('TipoServicio as TS', 'STS.IdTipoServicio', '=', 'TS.IdTipoServicio');

        // 🔍 Filtros dinámicos
        if (filters.fecha !== undefined && filters.fecha !== '') {
            query.where('Cita.Fecha', filters.fecha);
        }

        if (Array.isArray(filters.tipoServicioId) && filters.tipoServicioId.length > 0) {
            query.whereExists(function () {
                this.select('*')
                    .from('ServicioTipoServicio as STS2')
                    .whereRaw('STS2.IdServicio = S.IdServicio')
                    .whereIn('STS2.IdTipoServicio', filters.tipoServicioId);
            });
        }


        if (filters.clienteIdentificacion !== undefined && filters.clienteIdentificacion !== '') {
            query.where('Cliente.Identificacion', filters.clienteIdentificacion);
        }

        if (filters.tecnicoId !== undefined) {
            query.where('S.IdTecnico', filters.tecnicoId);
        }

        if (filters.clienteId !== undefined) {
            query.where('S.IdCliente', filters.clienteId);
        }

        if (filters.estadoId !== undefined) {
            query.where('S.IdEstado', filters.estadoId);
        }

        if (filters.cotizacionId !== undefined) {
            query.where('S.IdCotizacion', filters.cotizacionId);
        }

        query.groupBy('S.IdServicio');

        const orderBy = options.orderBy || 'S.IdServicio';
        const orderDirection = options.orderDirection || 'DESC';
        query.orderBy(orderBy, orderDirection);

        // console.log('SQL generada:', query.toString());

        const rows = await query;
        return rows;
    }
    // ServicioModel.js
    async createServicio(data) {
        const [id] = await knex('Servicio').insert(data);
        return await knex('Servicio').where('IdServicio', id).first();
    }

    async finalizarServicio(id, data) {
        // Primero obtenemos el servicio actual
        const servicioActual = await knex('Servicio').where('IdServicio', id).first();
        
        if (!servicioActual) {
            throw new Error('Servicio no encontrado');
        }

        // Validamos que todos los campos obligatorios estén completos
        const camposObligatorios = ['Descripcion', 'FotosAntes', 'FotosDespues', 'HoraInicial', 'HoraFinal'];
        const camposFaltantes = [];

        // Verificamos los campos actuales y los nuevos datos
        const datosCompletos = { ...servicioActual, ...data };
        
        camposObligatorios.forEach(campo => {
            if (!datosCompletos[campo] || datosCompletos[campo] === '' || datosCompletos[campo] === null) {
                camposFaltantes.push(campo);
            }
        });

        if (camposFaltantes.length > 0) {
            throw new Error(`No se puede finalizar el servicio. Faltan los siguientes datos: ${camposFaltantes.join(', ')}`);
        }

        // Si todos los datos están completos, actualizamos el servicio
        await knex('Servicio')
            .where('IdServicio', id)
            .update({
                ...data,
                IdEstado: 4, // Estado "Finalizado" (corregido de 3 a 4 según la base de datos)
            });
        return await knex('Servicio').where('IdServicio', id).first();
    }

    async updateServicio(id, data) {
        await knex('Servicio')
            .where('IdServicio', id)
            .update(data);
        return await knex('Servicio').where('IdServicio', id).first();
    }

    async validarDatosCompletos(id) {
        const servicio = await knex('Servicio').where('IdServicio', id).first();
        
        if (!servicio) {
            throw new Error('Servicio no encontrado');
        }

        const camposObligatorios = ['Descripcion', 'FotosAntes', 'FotosDespues', 'HoraInicial', 'HoraFinal'];
        const camposFaltantes = [];

        camposObligatorios.forEach(campo => {
            if (!servicio[campo] || servicio[campo] === '' || servicio[campo] === null) {
                camposFaltantes.push(campo);
            }
        });

        return {
            esCompleto: camposFaltantes.length === 0,
            camposFaltantes: camposFaltantes
        };
    }

    async updateServicePhotos(id, photoData) {
        await knex('Servicio')
            .where('IdServicio', id)
            .update(photoData);
        return await knex('Servicio').where('IdServicio', id).first();
    }


}

module.exports = new ServicioModel();