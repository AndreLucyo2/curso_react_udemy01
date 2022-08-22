//Bloqueia acessos em rotas que precisam estar autenticados

const User = require("../models/User");

const jwt = require("jsonwebtoken");

//Secret para gerar o token JWT
const jwtSecret = process.env.JWT_SECRET;

//vai validar 
const authGuard = async (req, res, next) => {
    //--- 1 - VALIDA SE O TOKEN VEN NA REQUISIÇÃO  ------------------------------------------------------
    //valida o header da requisição
    const authHeader = req.headers["authorization"];
    //valida se o authHeaderexiste:bearer asdasdasdasdasdasd
    //se nao tiver header e token ja da false
    const token = authHeader && authHeader.split(" ")[1];

    // Check if header has a token: se nao tem token bloqueia o acesso
    if (!token) return res.status(401).json({ errors: ["Acesso negado!"] });

    //--- 2 - VALIDA SE O TOKEN COMBINA COM O JWT SECRET  ------------------------------------------------
    // Check if token is valid, checa se o token é valido
    try {

        //--- 3 - CONFERE SE O TOKEN BATE COM A  jwtSecret  ----------------------------------------------
        //valida se o token é valido com a jwtSecret
        const verified = jwt.verify(token, jwtSecret);

        //--- 4 - TENTA ACHAR O USUÁRIO COM BASE NO RETORNO  ----------------------------------------------
        //Valida pelo ID e adiciona o objeto na requisição, evita get novamente: pode reaproveitar os dados do user
        // e remove o campo senha do retorno nao trafega a senha
        req.user = await User.findById(verified.id).select("-password");

        //prossegue a requisição
        next();

    } catch (err) {
        //tentou mascarar o token de alguma forma, nao bate a jwtSecret
        res.status(400).json({ errors: ["O Token é inválido!"] });
    }
};


//Exporta a função
module.exports = authGuard;