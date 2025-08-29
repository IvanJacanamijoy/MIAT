const knex = require('knex')(require('../config/knexfile').development);

class CotizacionModel {
    constructor() {
        this.tableName = 'Cotizacion';
    }

    async getAllCotizaciones() {
        return await knex(this.tableName).select('*');
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