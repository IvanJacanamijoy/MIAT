const knex = require('knex')(require('../config/knexfile').development);

class DiagnosticoModel {
    constructor() {
        this.tableName = 'Diagnostico';
    }

    async getAllDiagnosticos() {
        return await knex(this.tableName).select('*');
    }

    async getDiagnosticoById(id) {
        return await knex(this.tableName).where({ IdDiagnostico: id }).first();
    }

    async createDiagnostico(data) {
        const [id] = await knex(this.tableName).insert(data).returning('IdDiagnostico');
        return await this.getDiagnosticoById(id);
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