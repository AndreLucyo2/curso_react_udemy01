//---- VALIDA O CORPO DA REQUISIÇÃO DO BODY dados da foto --------------------------------------

//recebe o body da requisição e permite validar cada propriedade:
const { body } = require("express-validator");

const photoInsertValidation = () => {
    //valida cada campo do body da requisição
    return [
        body("title")
            .not()
            .equals("undefined")
            .withMessage("O título é obrigatório")
            .isString()
            .withMessage("O título é obrigatório")
            .isLength({ min: 3 })
            .withMessage("O nome precisa ter no mínimo 3 caracteres."),

        body("image").custom((value, { req }) => {
            if (!req.file) {
                throw new Error("A imagem é obrigatória");
            }
            return true;
        }),
    ];
};

//validações ao alterar a foto:
const photoUpdateValidation = () => {
    return [
        body("image")
            .optional()
            .custom((value, { req }) => {
                if (!req.file) {
                    throw new Error("A imagem é obrigatória");
                }
                return true;
            }),

        body("title")
            .optional()
            .isString()
            .withMessage("O título é obrigatório")
            .isLength({ min: 3 })
            .withMessage("O título precisa ter no mínimo 3 caracteres."),
    ];
};



module.exports = {
    photoInsertValidation,
    photoUpdateValidation,
};
