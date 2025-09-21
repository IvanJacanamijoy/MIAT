const CitaServicioModel = require('../models/CitaServicioModel');

const CitaServicioController = {
  async createCita(req, res) {
    try {
      const { Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado, TipoServicioIds } = req.body;

      // Validación mínima
      if (!Fecha || !Hora || !Direccion || !IdCliente || !IdEstado) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' });
      }

      const nuevaCita = await CitaServicioModel.createCita(
        { Fecha, Hora, Direccion, IdCliente, IdTecnico, IdEstado },
        TipoServicioIds || []
      );

      res.status(201).json(nuevaCita);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la cita', error: error.message });
    }
  }
};

module.exports = CitaServicioController;
