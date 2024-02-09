const express = require('express');
const router = express.Router();
const passengerController = require('../Controllers/Passenger.controller');

router.post('/usercreate', passengerController.passengerSignup);

module.exports = router;