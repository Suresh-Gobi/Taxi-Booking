const express = require("express");
const router = express.Router();

const adminController = require("../Controllers/Admin.controller");

router.post("/adminsignup", adminController.signup);
router.post("/adminlogin", adminController.login);

//driver details 
router.get("/admindrget", adminController.getDriverDetails);
router.put("/admindrupdate/:id", adminController.updateDriverDetails);
router.delete("/admindrdelete/:id", adminController.deleteDriverDetails);

module.exports = router;
