const Reserva = require('../models/Reserva');
const Habitacion = require('../models/Habitacion');

// Obtener todas las reservas
exports.getAllReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find()
      .populate('cliente', 'nombre apellido email')
      .populate('habitacion', 'numero tipo precio');
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener reservas', error: error.message });
  }
};

// Obtener una reserva por ID
exports.getReservaById = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id)
      .populate('cliente', 'nombre apellido email')
      .populate('habitacion', 'numero tipo precio');
    if (!reserva) {
      return res.status(404).json({ mensaje: 'Reserva no encontrada' });
    }
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener reserva', error: error.message });
  }
};

// Crear una nueva reserva
exports.createReserva = async (req, res) => {
  try {
    const nuevaReserva = new Reserva(req.body);
    
    // Calcular precio total
    const habitacion = await Habitacion.findById(req.body.habitacion);
    if (!habitacion) {
      return res.status(404).json({ mensaje: 'Habitación no encontrada' });
    }
    
    const fechaEntrada = new Date(req.body.fechaEntrada);
    const fechaSalida = new Date(req.body.fechaSalida);
    const dias = Math.ceil((fechaSalida - fechaEntrada) / (1000 * 60 * 60 * 24));
    
    nuevaReserva.precioTotal = habitacion.precio * dias;
    
    const reservaGuardada = await nuevaReserva.save();
    
    // Actualizar estado de la habitación
    await Habitacion.findByIdAndUpdate(req.body.habitacion, { 
      estado: 'Ocupada' 
    });
    
    res.status(201).json(reservaGuardada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear reserva', error: error.message });
  }
};

// Actualizar una reserva
exports.updateReserva = async (req, res) => {
  try {
    const reservaActualizada = await Reserva.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!reservaActualizada) {
      return res.status(404).json({ mensaje: 'Reserva no encontrada' });
    }
    res.json(reservaActualizada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar reserva', error: error.message });
  }
};

// Cancelar una reserva
exports.cancelReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndUpdate(
      req.params.id,
      { estado: 'Cancelada' },
      { new: true }
    );
    
    if (!reserva) {
      return res.status(404).json({ mensaje: 'Reserva no encontrada' });
    }
    
    // Liberar la habitación
    await Habitacion.findByIdAndUpdate(reserva.habitacion, { 
      estado: 'Disponible' 
    });
    
    res.json({ mensaje: 'Reserva cancelada exitosamente', reserva });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al cancelar reserva', error: error.message });
  }
};

// Eliminar una reserva
exports.deleteReserva = async (req, res) => {
  try {
    const reservaEliminada = await Reserva.findByIdAndDelete(req.params.id);
    if (!reservaEliminada) {
      return res.status(404).json({ mensaje: 'Reserva no encontrada' });
    }
    res.json({ mensaje: 'Reserva eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar reserva', error: error.message });
  }
};