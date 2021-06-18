const express = require('express');
const router = express.Router();

const Roles = require('../helpers/role');


//MIDDLEWARE
const authMiddleware = require('../protected/middlewares/authenticated');

//IMPORTS
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");


// ROUTES API

// INICIAR SESIÓN (ADMIN & USER)
router.post("/login", authController.login);

//LISTAR USUARIOS
router.post("/user/list", authMiddleware([Roles.Admin]), userController.list);

//CREAR USUARIO
router.post("/user/create", authMiddleware([Roles.Admin]), userController.create);

//ACTUALIZAR USUARIO
router.post("/user/update", authMiddleware([Roles.Admin]), userController.update);

//ELIMINAR USUARIO
router.post("/user/delete", authMiddleware([Roles.Admin]), userController.delete);

//CAMBIAR ESTADO USUARIO
router.post("/user/changeStatus", authMiddleware([Roles.Admin]), userController.changeStatus);

module.exports = router;
