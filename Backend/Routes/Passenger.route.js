const express = require('express');
const router = express.Router();
const passengerController = require('../Controllers/Passenger.controller');

router.post('/usercreate', passengerController.passengerSignup);
router.post('/userlogin', passengerController.passengerLogin);
router.get('/passengerdetails', passengerController.getAllPassengers);

router.delete('/passengerdelete/:id', passengerController.deletePassenger);
router.put('/passengerupdate/:id', passengerController.updatePassenger);

module.exports = router;