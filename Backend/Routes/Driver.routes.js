const express = require('express');
const router = express.Router();
const driverController = require('../Controllers/Driver.controller');

router.post('/driversignup', driverController.signupDriver);
router.post('/driverlocation/:id', driverController.updateDriverLocation);
router.post('/driverlogin', driverController.loginDriver);
router.get('/driverget', driverController.getAllAvailableDrivers);
router.get('/driverdetails', driverController.getDriverDetails);
router.put('/updatedetails', driverController.updateDriverDetails);

module.exports = router;