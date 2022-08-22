//Model 
const User = require("../models/User");

//bcryptjs
const bcrypt = require("bcryptjs");
//jsonwebtoken
const jwt = require("jsonwebtoken");
//import mongoose
const { default: mongoose } = require("mongoose");

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


// Sign user in  --------------------------------------------------------
const login = async (req, res) => {
    //Recebe os dados da requisição:
    const { email, password } = req.body;

    //-------------------------------------------------------------------------------------------------------
    //valida se o usuario existe , pelo e-mail
    const user = await User.findOne({ email });

    // Check if user exists, retorna o 404 pois esta buscando recurso que nao existe
    if (!user) {
        res.status(404).json({ errors: ["Usuário não encontrado!"] });
        return;
    }

    //-------------------------------------------------------------------------------------------------------
    // Check if password matches, valida a senha se esta correta
    if (!(await bcrypt.compare(password, user.password))) {
        //se a senha é diferente
        res.status(422).json({ errors: ["Senha inválida!"] });
        return;
    }

    //-------------------------------------------------------------------------------------------------------
    // Return user with token, se der tudo certo, retonra id e token com a imagem para usar mais tarde
    res.status(200).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id),
    });
};

// Get logged in user ---------------------------------------------------------------------------------------
const getCurrentUser = async (req, res) => {

    //Recupera dados do perfil do usuário logado, pode reutilizar depois 
    const user = req.user;

    //retorna sucesso com os dados do usuario menos o campos senha 
    res.status(200).json(user);
};

// Update user   --------------------------------------------------------------------------------------------
//O campo email nunca será atualizado, pois deve ser unico.
const update = async (req, res) => {
    //Recebe os dados da requisição
    const { name, password, bio } = req.body;

    //valida se o arquivo chegou pela requisição
    let profileImage = null;
    if (req.file) {
        //pega o nome do arquivo da imagem:
        profileImage = req.file.filename;
    }

    //pega o usuario da requisição:
    const reqUser = req.user;
    //busca o usuario pelo ID, (conver o ID para poder comparar e sem a senha)
    const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select("-password");

    //Alterar pelo novo nome que chegou pela requisição
    if (name) {
        user.name = name;
    }

    //Monta a senha novamente para poder atualizar pela nova que recebeu pea requisição
    if (password) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        user.password = passwordHash;
    }

    //valida se vei a imagem:
    if (profileImage) {
        user.profileImage = profileImage;
    }

    //valida se recebeu algo na bio
    if (bio) {
        user.bio = bio;
    }

    //Espera fazer o update:
    await user.save();

    //Se der sucesso retorna 200 
    res.status(200).json(user);
};


// Get user by id ----------------------------------------------------------------------
const getUserById = async (req, res) => {
    //Pega o id da url, rota  /:id
    const { id } = req.params;

    //valida erros , e caso tiver ID inválido pela url
    try {
        //busca o user pelo id , e tira a senha 
        const user = await User.findById(mongoose.Types.ObjectId(id)).select("-password");


        // Check if user exists, alguem pode tentar acessar a pagina com um usuario que nao existe
        if (!user) {
            res.status(404).json({ errors: ["Usuário não encontrado!"] });
            return;
        }

        //retoran 200 ok sucesso
        res.status(200).json(user);

    } catch (error) {
        res.status(404).json({ errors: ["Usuário não encontrado!"] });
        return;
    }

};


//Exporta as função:
module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById,
};
