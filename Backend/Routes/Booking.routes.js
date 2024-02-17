const express = require('express');
const router = express.Router();
const bookingController = require('../Controllers/Booking.controller');

router.post('/book', bookingController.createBooking);
router.get('/dbooking', bookingController.showBooking);
router.put('/updatebooking', bookingController.acceptBooking);
router.put('/completebooking', bookingController.completeBooking);

module.exports = router;