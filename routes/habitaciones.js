const express = require('express');
const router = express.Router();
const habitacionController = require('../controllers/habitacionController');

// GET /api/habitaciones/disponibles
router.get('/disponibles', habitacionController.getHabitacionesDisponibles);

// GET /api/habitaciones
router.get('/', habitacionController.getAllHabitaciones);

// GET /api/habitaciones/:id
router.get('/:id', habitacionController.getHabitacionById);

// POST /api/habitaciones
router.post('/', habitacionController.createHabitacion);

// PUT /api/habitaciones/:id
router.put('/:id', habitacionController.updateHabitacion);

// DELETE /api/habitaciones/:id
router.delete('/:id', habitacionController.deleteHabitacion);

module.exports = router;