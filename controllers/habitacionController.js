const Habitacion = require('../models/Habitacion');

exports.getAllHabitaciones = async (req, res) => {
  try {
    const habitaciones = await Habitacion.find();
    res.json(habitaciones);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener habitaciones', error: error.message });
  }
};

exports.getHabitacionesDisponibles = async (req, res) => {
  try {
    const habitaciones = await Habitacion.find({ estado: 'Disponible' });
    res.json(habitaciones);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener habitaciones', error: error.message });
  }
};

exports.getHabitacionById = async (req, res) => {
  try {
    const habitacion = await Habitacion.findById(req.params.id);
    if (!habitacion) {
      return res.status(404).json({ mensaje: 'Habitación no encontrada' });
    }
    res.json(habitacion);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener habitación', error: error.message });
  }
};

exports.createHabitacion = async (req, res) => {
  try {
    const nuevaHabitacion = new Habitacion(req.body);
    const habitacionGuardada = await nuevaHabitacion.save();
    res.status(201).json(habitacionGuardada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear habitación', error: error.message });
  }
};

exports.updateHabitacion = async (req, res) => {
  try {
    const habitacionActualizada = await Habitacion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!habitacionActualizada) {
      return res.status(404).json({ mensaje: 'Habitación no encontrada' });
    }
    res.json(habitacionActualizada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar habitación', error: error.message });
  }
};

exports.deleteHabitacion = async (req, res) => {
  try {
    const habitacionEliminada = await Habitacion.findByIdAndDelete(req.params.id);
    if (!habitacionEliminada) {
      return res.status(404).json({ mensaje: 'Habitación no encontrada' });
    }
    res.json({ mensaje: 'Habitación eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar habitación', error: error.message });
  }
};