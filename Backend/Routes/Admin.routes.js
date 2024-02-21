const express = require("express");
const router = express.Router();

const adminController = require("../Controllers/Admin.controller");

router.post("/adminsignup", adminController.signup);
router.post("/adminlogin", adminController.login);

module.exports = router;
