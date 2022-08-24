// ---  ROTAS DELACIONADAS AS FOTOS  ----------------------------------------------------
const express = require("express");
const router = express.Router();

//  ----  CONTROLLERS --------------------------------------------------------------------
const { insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById, updatePhoto, likePhoto, commentPhoto, searchPhotos } = require("../controllers/PhotoController");

//  ----  MIDDLEWARES --------------------------------------------------------------------
// Middlewares, validações da requisição: resgata os erros gerados
const validate = require("../middlewares/handleValidation");
const { photoInsertValidation, photoUpdateValidation, commentValidation } = require("../middlewares/photoValidation");
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
//Buscar foto pelo titulo:
router.get("/search", authGuard, searchPhotos);
//busca a foto pelo id
router.get("/:id", authGuard, getPhotoById);
//alteração da foto:
router.put("/:id", authGuard, imageUpload.single("image"), photoUpdateValidation(), validate, updatePhoto);
//curtir a foto: pega o id do user logado e passa o id da foto na url
router.put("/like/:id", authGuard, likePhoto);
//cria o comentário da foto:
router.put("/comment/:id", authGuard, commentValidation(), validate, commentPhoto);


//Exporta as rotas criadas
module.exports = router;