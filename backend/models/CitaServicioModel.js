const knex = require('knex')(require('../config/knexfile').development);

const CitaServicioModel = {
  async createCita(data, tipoServicioIds = []) {
    // Insertar la cita
    const [idCita] = await knex('CitaServicio').insert({
      Fecha: data.Fecha,
      Hora: data.Hora,
      Direccion: data.Direccion,
      IdCliente: data.IdCliente,
      IdTecnico: data.IdTecnico || null,
      IdEstado: data.IdEstado
    });

    // Insertar tipos de servicio si se proporcionan
    if (tipoServicioIds.length > 0) {
      const relaciones = tipoServicioIds.map(idTipo => ({
        IdCita: idCita,
        IdTipoServicio: idTipo
      }));
      await knex('CitaTipoServicio').insert(relaciones);
    }

    return await this.getCitaById(idCita);
  },

  async getCitaById(id) {
    return await knex('CitaServicio').where({ IdCita: id }).first();
  }
};

module.exports = CitaServicioModel;
