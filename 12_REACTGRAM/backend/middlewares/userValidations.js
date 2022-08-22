//---- VALIDA O CORPO DA REQUISIÇÃO DO BODY  --------------------------------------

//recebe o body da requisição e permite validar cada propriedade:
const { body } = require("express-validator");

//-------------------------------------------------------------------------------------
const userCreateValidation = () => {
    //validações por campo do body
    return [
        body("name")
            .isString()
            .withMessage("O nome é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("O nome precisa ter no mínimo 3 caracteres."),

        body("email")
            .isString()
            .withMessage("O e-mail é obrigatório.")
            .isEmail()
            .withMessage("Insira um e-mail válido"),

        body("password")
            .isString()
            .withMessage("A senha é obrigatória.")
            .isLength({ min: 5 })
            .withMessage("A senha precisa de no mínimo 5 caracteres."),

        body("confirmPassword")
            .isString()
            .withMessage("A confirmação de senha é obrigatória.")
            .custom((value, { req }) => {
                //Validação customizada: 
                if (value != req.body.password) {
                    //gera uma erro:
                    throw new Error("As senhas não são iguais.");
                }
                //Se der erro retonra true
                return true;
            }),
    ];
};

//-------------------------------------------------------------------------------------
const loginValidation = () => {
    //validar ao fazer login , e-mail e senha são obrigatorios para logar:
    return [
        body("email")
            .isString()
            .withMessage("O e-mail é obrigatório.")
            .isEmail()
            .withMessage("Insira um e-mail válido"),
        body("password").isString().withMessage("A senha é obrigatória."),
    ];
};


//Exporta como objeto:
module.exports = {
    userCreateValidation,
    loginValidation,
};
