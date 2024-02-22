const express = require("express");
const router = express.Router();
const paymentController = require("../Controllers/Payment.controller");

router.post("/pay", paymentController.createPayment);
router.get("/getpay", paymentController.getAllPayments);

module.exports = router;
