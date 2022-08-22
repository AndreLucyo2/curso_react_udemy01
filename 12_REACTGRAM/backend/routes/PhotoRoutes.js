// ---  ROTAS DELACIONADAS AS FOTOS  ----------------------------------------------------
const express = require("express");
const router = express.Router();

//  ----  CONTROLLERS --------------------------------------------------------------------
const { insertPhoto } = require("../controllers/PhotoController");

//  ----  MIDDLEWARES --------------------------------------------------------------------
// Middlewares, validações da requisição: resgata os erros gerados
const validate = require("../middlewares/handleValidation");
const { photoInsertValidation } = require("../middlewares/photoValidation");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");


//  ----  ROUTES  ------------------------------------------------------------------------
//single permite apenas um foto por vez
router.post("/", authGuard, imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto);



//Exporta as rotas criadas
module.exports = router;