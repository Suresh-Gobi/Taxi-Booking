const express = require("express");
const router = express.Router();
const rateController = require("../Controllers/Rating.controller");

router.post("/rate", rateController.createRating);

module.exports = router;
