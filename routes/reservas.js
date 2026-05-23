const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

// GET /api/reservas
router.get('/', reservaController.getAllReservas);

// GET /api/reservas/:id
router.get('/:id', reservaController.getReservaById);

// POST /api/reservas
router.post('/', reservaController.createReserva);

// PUT /api/reservas/:id
router.put('/:id', reservaController.updateReserva);

// PUT /api/reservas/:id/cancelar
router.put('/:id/cancelar', reservaController.cancelReserva);

// DELETE /api/reservas/:id
router.delete('/:id', reservaController.deleteReserva);

module.exports = router;