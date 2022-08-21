// --- SERVA PARA TODAS AS VALIDAÇÕES -------------------

const { validationResult } = require("express-validator");

//Recebe a requisição, valida e decide se continua ou para ela 
const validate = (req, res, next) => {
    const errors = validationResult(req);

    //se nao tiver erro, continua
    if (errors.isEmpty()) {
        return next();
    }
    //erros extraidos da requisição 
    const extractedErrors = [];

    //Pega a lista de erros que forem identificados: 
    errors.array().map((err) => extractedErrors.push(err.msg));

    //usa o 422 para mostrar que a requisição não foi bem sucedida por algum motivo
    //retorna em forma objeto json, um array de objsetos com mensagens de erro
    return res.status(422).json({
        errors: extractedErrors,
    });
};

//Exporta a lista de erros:
module.exports = validate;