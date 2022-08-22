// ---  ROTAS DELACIONADAS AS FOTOS  ----------------------------------------------------
const express = require("express");
const router = express.Router();

//  ----  CONTROLLERS --------------------------------------------------------------------


//  ----  MIDDLEWARES --------------------------------------------------------------------
// Middlewares, validações da requisição: resgata os erros gerados
const validate = require("../middlewares/handleValidation");
const { photoInsertValidation } = require("../middlewares/photoValidation");
const authGuard = require("../middlewares/authGuard");


//  ----  ROUTES  ------------------------------------------------------------------------

//Exporta as rotas criadas
module.exports = router;