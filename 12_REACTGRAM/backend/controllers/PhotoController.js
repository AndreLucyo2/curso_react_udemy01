//Model
const Photo = require("../models/Photo");

//operações do banco de dados
const mongoose = require("mongoose");

// Insert a photo, with an user related to it  ----------------------------------------------
const insertPhoto = async (req, res) => {
    //passa o titulo:
    const { title } = req.body;
    //nome do arquivo vindo da requisição  mooter
    const image = req.file.filename;

    //debuger
    console.log(req.body);

    //pega os dados do user
    const reqUser = req.user;

    //obtem os dados do user pelo ID mais dados do user
    const user = await User.findById(reqUser._id);

    console.log(user.name);

    // Create photo : add a foto completa, pode por mais dados na foto
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name,
    });

    //valida se foi criada com sucesso
    // If user was photo sucessfully, return data
    if (!newPhoto) {
        //se der erro, ou vazia retorna erro
        res.status(422).json({
            errors: ["Houve um erro, por favor tente novamente mais tarde."],
        });
        return;
    }

    //Sucesso retorna 200
    res.status(201).json(newPhoto);
};


module.exports = {
    insertPhoto,
};

