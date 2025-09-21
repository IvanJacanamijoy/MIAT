const DiagnosticoModel = require('../models/DiagnosticoModel');

class DiagnosticoController {
    async getAllDiagnosticos(req, res) {
        try {
            const diagnosticos = await DiagnosticoModel.getAllDiagnosticos();
            res.json(diagnosticos);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener diagnósticos', error });
        }
    }

    async getDiagnosticoById(req, res) {
        try {
            const diagnostico = await DiagnosticoModel.getDiagnosticoById(req.params.id);
            if (!diagnostico) {
                return res.status(404).json({ message: 'Diagnóstico no encontrado' });
            }
            res.json(diagnostico);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener diagnóstico', error });
        }
    }

    async createDiagnostico(req, res) {
        try {
            const data = req.body;
            const nuevoDiagnostico = await DiagnosticoModel.createDiagnostico(data);
            res.status(201).json(nuevoDiagnostico);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }



    async updateDiagnostico(req, res) {
        try {
            const diagnosticoActualizado = await DiagnosticoModel.updateDiagnostico(req.params.id, req.body);
            res.json(diagnosticoActualizado);
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar diagnóstico', error });
        }
    }

    async deleteDiagnostico(req, res) {
        try {
            await DiagnosticoModel.deleteDiagnostico(req.params.id);
            res.json({ message: 'Diagnóstico eliminado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar diagnóstico', error });
        }
    }
}

module.exports = new DiagnosticoController();