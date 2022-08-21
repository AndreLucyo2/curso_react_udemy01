const User = require("../models/User");

//
const bcrypt = require("bcryptjs");
//
const jwt = require("jsonwebtoken");

//Senha de criptografia do token
const jwtSecret = process.env.JWT_SECRET;

//GERAR TOKEN DE ACESSO -----------------------------------------------------------------------------
// Generate user token, o token conten o Id do usuário, a senha JWT e o tempo que expira o token
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d",
    });
};

// Register user and sign in, registra e permite logar
const register = async (req, res) => {
    //resposta do chamado da rota:
    res.send("Registro!");
};

//Exporta as função:
module.exports = {
    register,
};
