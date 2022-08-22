// ---  ROTAS DELACIONADAS AO USUARIO ---------------------------------------
const express = require("express");
const router = express.Router();

// Controller, recebe o objeto e desestrutura cada função
const { register, login } = require("../controllers/UserController");

// Middlewares, validações da requisição: resgata os erros gerados
const validate = require("../middlewares/handleValidation");

//importa as validações do usuario: ele captura os erros gerados 
const { userCreateValidation , loginValidation} = require("../middlewares/userValidations");

// Routes, separa cada rota 
router.post("/register",userCreateValidation(), validate, register);
//Rota para validar e fazer login
router.post("/login", loginValidation(), validate, login);



//Exporta as rotas criadas: usa lá no centralizador das rotas 
module.exports = router;