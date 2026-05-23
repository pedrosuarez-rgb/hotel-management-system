const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB (SIN las opciones obsoletas)
mongoose.connect('mongodb://localhost:27017/hotel_db')
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error de conexión:', err));

// Rutas
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/habitaciones', require('./routes/habitaciones'));
app.use('/api/reservas', require('./routes/reservas'));

// Ruta principal
app.get('/', (req, res) => {
  res.json({ 
    mensaje: 'API del Sistema de Gestión Hotelera',
    version: '1.0.0',
    endpoints: {
      clientes: '/api/clientes',
      habitaciones: '/api/habitaciones',
      reservas: '/api/reservas'
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});