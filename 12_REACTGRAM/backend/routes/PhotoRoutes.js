// ---  ROTAS DELACIONADAS AS FOTOS  ----------------------------------------------------
const express = require("express");
const router = express.Router();

//  ----  CONTROLLERS --------------------------------------------------------------------
const { insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById, updatePhoto, likePhoto } = require("../controllers/PhotoController");

//  ----  MIDDLEWARES --------------------------------------------------------------------
// Middlewares, validações da requisição: resgata os erros gerados
const validate = require("../middlewares/handleValidation");
const { photoInsertValidation, photoUpdateValidation } = require("../middlewares/photoValidation");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");


//  ----  ROUTES EXPRESS - A ORDEM IMPORTA E DEVE TER UM ORDEM LÓGICA  ------------------------------------------------------------
//post single : permite apenas um foto por vez
router.post("/", authGuard, imageUpload.single("image"), photoInsertValidation(), validate, insertPhoto);
//deletar a foto validando se o usuario é o dono dela
router.delete("/:id", authGuard, deletePhoto);
//busca todas as fotos
router.get("/", getAllPhotos);
//Busca as fotos por usuário
router.get("/user/:id", getUserPhotos);
//busca a foto pelo id
router.get("/:id", authGuard, getPhotoById);
//alteração da foto:
router.put("/:id", authGuard, imageUpload.single("image"), photoUpdateValidation(), validate, updatePhoto);
//curtir a foto: pega o id do user logado e passa o id da foto na url
router.put("/like/:id", authGuard, likePhoto);


//Exporta as rotas criadas
module.exports = router;