const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  habitacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habitacion',
    required: true
  },
  fechaEntrada: {
    type: Date,
    required: [true, 'La fecha de entrada es requerida']
  },
  fechaSalida: {
    type: Date,
    required: [true, 'La fecha de salida es requerida']
  },
  numeroHuespedes: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    enum: ['Pendiente', 'Confirmada', 'Cancelada', 'Completada'],
    default: 'Pendiente'
  },
  precioTotal: {
    type: Number
  },
  notas: {
    type: String
  },
  fechaReserva: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reserva', reservaSchema);