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
    //Pega os campos que chegam da requisição? 
    const { name, email, password } = req.body;

    //-----------------------------------------------------------------------------------------------------------
    // check if user exists: não permite e-mail duplicado (findOne é um metodo do mongoose)
    const user = await User.findOne({ email });
    //valida se o usuario ja existe no sistema:
    if (user) {
        //caso true: gera uma erro re retorna.
        res.status(422).json({ errors: ["Por favor, utilize outro e-mail."] });
        return;
    }

    //-----------------------------------------------------------------------------------------------------------
    // Generate password hash: senha poluida com um salt, gera uma senha hash
    const salt = await bcrypt.genSalt();
    //gera uma senha hash aleatória:
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user com campos obrigatórios: usando senha hash (create é um metodo do mongoose)
    const newUser = await User.create({
        name,
        email,
        password: passwordHash,
    });

    //-----------------------------------------------------------------------------------------------------------
    // If user was created sucessfully, return the token : user criado com sucesso , cria e gera o token
    //Checa se deu algum problema na criação
    if (!newUser) {
        //Erro genérico: validar pelo logs
        res.status(422).json({
            errors: ["Houve um erro, por favor tente novamente mais tarde."],
        });
        return;
    }

    //-----------------------------------------------------------------------------------------------------------
    //Se der sucesso retorna 201 OK , com o ID e o Token
    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
    });
};


//Exporta as função:
module.exports = {
    register,
};
