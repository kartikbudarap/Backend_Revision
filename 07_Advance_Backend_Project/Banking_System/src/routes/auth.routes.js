const express = require("express");
const authController = require("../controllers/auth.controller")
const router = express.Router();

//POST 
router.post("register",authController.registerUser);

module.exports = router;
