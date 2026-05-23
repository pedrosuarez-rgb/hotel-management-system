const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido']
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es requerido']
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true
  },
  telefono: {
    type: String,
    required: [true, 'El teléfono es requerido']
  },
  documento: {
    type: String,
    required: [true, 'El documento es requerido'],
    unique: true
  },
  direccion: {
    type: String
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Cliente', clienteSchema);