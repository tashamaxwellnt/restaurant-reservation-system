const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');
const authMiddleware = require('../middleware/auth.middleware'); 

router.post('/new', reservationController.createReservation);  
router.post('/cancel/:id', reservationController.cancelReservation);
router.get('/res/:restaurantId', authMiddleware, reservationController.getReservationsByRestaurant);
router.get('/active/:restaurantId', authMiddleware, reservationController.getActiveReservationsByRestaurant)
router.post('/done/:resId', authMiddleware, reservationController.markAsdone)

module.exports = router;
