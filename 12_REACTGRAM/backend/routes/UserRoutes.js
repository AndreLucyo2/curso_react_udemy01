// ---  ROTAS DELACIONADAS AO USUARIO ----------------------------------------------------
const express = require("express");
const router = express.Router();

//  ----  CONTROLLERS --------------------------------------------------------------------
// Controller, recebe o objeto e desestrutura cada função
const { register, login, getCurrentUser, update, getUserById } = require("../controllers/UserController");

//  ----  MIDDLEWARES --------------------------------------------------------------------
// Middlewares, validações da requisição: resgata os erros gerados
const validate = require("../middlewares/handleValidation");
//importa as validações do usuario: ele captura os erros gerados 
const { userCreateValidation, loginValidation, userUpdateValidation } = require("../middlewares/userValidations");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");


//  ----  ROUTES  ------------------------------------------------------------------------
router.post("/register", userCreateValidation(), validate, register);
//Rota para validar e fazer login
router.post("/login", loginValidation(), validate, login);
//Rota para pegar o perfil do usuário 
router.get("/profile", authGuard, getCurrentUser);
//Rota para alterar o perfil do usuário: executa os Middlewares na ordem e depois o verdo da requisição: 
router.put("/", authGuard, userUpdateValidation(), validate, imageUpload.single("profileImage"), update);
//Busca o usuário pelo ID, passa um id pela rota, e pega no controller, sem validação sem middleware, qualquer user pode ver qualquer user
router.get("/:id", getUserById);


//Exporta as rotas criadas: usa lá no centralizador das rotas 
module.exports = router;