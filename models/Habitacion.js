const mongoose = require('mongoose');

const habitacionSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: [true, 'El número de habitación es requerido'],
    unique: true
  },
  tipo: {
    type: String,
    required: [true, 'El tipo de habitación es requerido'],
    enum: ['Simple', 'Doble', 'Suite', 'Presidencial']
  },
  precio: {
    type: Number,
    required: [true, 'El precio es requerido']
  },
  capacidad: {
    type: Number,
    required: [true, 'La capacidad es requerida']
  },
  descripcion: {
    type: String
  },
  servicios: [{
    type: String
  }],
  estado: {
    type: String,
    enum: ['Disponible', 'Ocupada', 'Mantenimiento'],
    default: 'Disponible'
  },
  piso: {
    type: Number
  }
});

module.exports = mongoose.model('Habitacion', habitacionSchema);