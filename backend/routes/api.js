const express = require('express');
const router = express.Router();


//MIDDLEWARE
const authMiddleware = require('../protected/middlewares/authenticated');

//IMPORTS
const authController = require("../controllers/auth.controller");


// ROUTES API


// Login
router.post("/login", authMiddleware.authenticated, authController.login);

module.exports = router;
