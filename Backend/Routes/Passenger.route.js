const express = require('express');
const router = express.Router();
const passengerController = require('../Controllers/Passenger.controller');

router.post('/usercreate', passengerController.passengerSignup);
router.post('/userlogin', passengerController.passengerLogin);

module.exports = router;