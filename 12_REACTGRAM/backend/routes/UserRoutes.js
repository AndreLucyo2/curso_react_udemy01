// ---  ROTAS DELACIONADAS AO USUARIO ---------------------------------------
const express = require("express");
const router = express.Router();

// Controller, recebe o objeto e desestrutura cada função
const { register, } = require("../controllers/UserController");

// Middlewares, validações da requisição
const validate = require("../middlewares/handleValidations");

// Routes, separa cada rota 
router.post("/register", validate, register);

//Exporta as rotas criadas: usa lá no centralizador das rotas 
module.exports = router;