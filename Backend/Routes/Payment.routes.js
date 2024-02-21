const express = require("express");
const router = express.Router();
const paymentController = require("../Controllers/Payment.controller");

router.post("/pay", paymentController.createPayment);

module.exports = router;
