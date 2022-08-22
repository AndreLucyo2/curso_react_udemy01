//--  MIDDLEWARE PARA TRATAR DE VALDIAR UPLOADS DE UMAGENS ------------------------------------------------~

const multer = require("multer");
const path = require("path");

// Destination to store image: valida a monta o destino para salvar o arquivo conforme a url
const imageStorage = multer.diskStorage({
    //monta a pasta destino e manipula o nome do arquivo
    destination: function (req, file, fnCallBack) {
        //PASTA:
        let folder = "";
        //valida pela URL se trata de imagem do user ou é uma foto
        if (req.baseUrl.includes("users")) {
            //caso user, salva na pasta users
            folder = "users";

        } else if (req.baseUrl.includes("photos")) {
            //caso NÃO for user, salva na pasta photos
            folder = "photos";
        };

        //Callback de retorno: caminho completo da pasta conforme validado pelo url
        fnCallBack(null, `uploads/${folder}/`);
    },
    filename: (req, file, fnCallBack) => {
        //monta o nome do arquivo, usa a data concatenada com a extensão do aquivo
        fnCallBack(null, Date.now() + path.extname(file.originalname));
    },
});

//Faz uma validação da imagem e define onde vai ser salva
const imageUpload = multer({

    storage: imageStorage,
    fileFilter(req, file, fnCallBack) {
        //valida o tipo de umagem aceito
        if (!file.originalname.match(/\.(png|jpg)$/)) {

            // upload only png and jpg format : aceita apenas os formatos válidos 
            return fnCallBack(new Error("Por favor, envie apenas png ou jpg!"));
        }

        //retorna um true e continua a função
        fnCallBack(undefined, true);
    },
});

//exporta a função
module.exports = { imageUpload };
