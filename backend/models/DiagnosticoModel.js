const knex = require('knex')(require('../config/knexfile').development);

class DiagnosticoModel {
    constructor() {
        this.tableName = 'Diagnostico';
    }

    async getAllDiagnosticos() {
        const diagnosticos = await knex(this.tableName)
            .select('*');
        
        // Para cada diagnóstico, obtener información adicional
        const diagnosticosCompletos = await Promise.all(diagnosticos.map(async (diagnostico) => {
            // Buscar si existe una cotización para este diagnóstico
            const cotizacion = await knex('Cotizacion')
                .where({ IdDiagnostico: diagnostico.IdDiagnostico })
                .first();
            
            // Obtener datos de la cita asociada
            const cita = await knex('CitaServicio')
                .where({ IdCita: diagnostico.IdCita })
                .first();
            
            // Obtener datos del cliente
            let cliente = null;
            if (cita && cita.IdCliente) {
                cliente = await knex('Usuario')
                    .where({ IdUsuario: cita.IdCliente })
                    .select('IdUsuario', 'Nombres', 'Apellidos', 'Email', 'Telefono')
                    .first();
            }
            
            // Obtener datos del técnico
            let tecnico = null;
            if (cita && cita.IdTecnico) {
                tecnico = await knex('Usuario')
                    .where({ IdUsuario: cita.IdTecnico })
                    .select('IdUsuario', 'Nombres', 'Apellidos', 'Email', 'Telefono')
                    .first();
            }
            
            // Añadir campos adicionales
            return {
                ...diagnostico,
                tieneCotizacion: cotizacion ? true : false,
                IdCliente: cita ? cita.IdCliente : null,
                IdTecnico: cita ? cita.IdTecnico : null,
                ClienteNombre: cliente ? `${cliente.Nombres} ${cliente.Apellidos}` : 'Cliente no disponible',
                ClienteEmail: cliente ? cliente.Email : '',
                ClienteTelefono: cliente ? cliente.Telefono : '',
                TecnicoNombre: tecnico ? `${tecnico.Nombres} ${tecnico.Apellidos}` : 'Técnico no asignado',
                TecnicoEmail: tecnico ? tecnico.Email : '',
                TecnicoTelefono: tecnico ? tecnico.Telefono : ''
            };
        }));
        
        return diagnosticosCompletos;
    }

    async getDiagnosticoById(id) {
        return await knex(this.tableName).where({ IdDiagnostico: id }).first();
    }

    async createDiagnostico(data) {
        // Validar que la cita existe
        const cita = await knex('CitaServicio').where({ IdCita: data.IdCita }).first();
        if (!cita) {
            throw new Error('La cita no existe');
        }

        // Validar que no haya diagnóstico duplicado
        const existente = await knex('Diagnostico').where({ IdCita: data.IdCita }).first();
        if (existente) {
            throw new Error('Ya existe un diagnóstico para esta cita');
        }

        // Serializar materiales
        const materialesJSON = JSON.stringify(data.Materiales || []);

        // Insertar diagnóstico
        const result = await knex('Diagnostico').insert({
            Descripcion: data.Descripcion,
            Medidas: data.Medidas,
            Materiales: materialesJSON,
            FotoDiagnostico: data.FotoDiagnostico || null,
            IdCita: data.IdCita // ✅ este campo es clave
        });

        const insertedId = result[0];
        return await this.getDiagnosticoById(insertedId);
    }



    async updateDiagnostico(id, data) {
        await knex(this.tableName).where({ IdDiagnostico: id }).update(data);
        return await this.getDiagnosticoById(id);
    }

    async deleteDiagnostico(id) {
        return await knex(this.tableName).where({ IdDiagnostico: id }).del();
    }
}

module.exports = new DiagnosticoModel();