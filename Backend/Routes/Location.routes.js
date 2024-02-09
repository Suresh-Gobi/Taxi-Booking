const express = require('express');
const router = express.Router();
const locationController = require('../Controllers/Location.controller');

router.post('/create', locationController.createLocation);
router.put('/update', locationController.updateLocation);

module.exports = router;