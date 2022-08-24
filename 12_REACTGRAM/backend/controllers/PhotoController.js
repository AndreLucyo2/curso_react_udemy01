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

// Remove a photo from the DB
const deletePhoto = async (req, res) => {
    //pega o id da requisição
    const { id } = req.params;

    //pega os dados do usuário pela requisição
    const reqUser = req.user;

    try {
        //Pega a foto do model pelo ID
        const photo = await Photo.findById(mongoose.Types.ObjectId(id));

        // Check if photo exists, --------------------------------------------------------------
        if (!photo) {
            res.status(404).json({ errors: ["Foto não encontrada!"] });
            return;
        }

        // Check if photo belongs to user -----------------------------------------------------
        //Valida se a foto pertence ao mesmo usuário
        if (!photo.userId.equals(reqUser._id)) {
            res.status(422)
                .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
            return;
        };

        //deleta a foto da pasta
        await Photo.findByIdAndDelete(photo._id);

        //retorna o ID da foto para ser utilizado em outras funções e retorna a msg para o front
        res.status(200).json({ id: photo._id, message: "Foto excluída com sucesso." });

    } catch (error) {
        res.status(404).json({ errors: ["Foto não encontrada!"] });
        return;
    }
};


// Get all photos, busca todas as fotos e ordena por data de criação
const getAllPhotos = async (req, res) => {

    //mais nova sempre no topo
    const photos = await Photo.find({})
        .sort([["createdAt", -1]])
        .exec();//Executa a consulta

    return res.status(200).json(photos);
};

// Get user photos
const getUserPhotos = async (req, res) => {
    //obtem o id de user nos parametros da url
    const { id } = req.params;

    //busca as fotos pelo id do usuaário: ordena pela mais nova
    const photos = await Photo.find({ userId: id })
        .sort([["createdAt", -1]])
        .exec();

    //retorna sucesso com as fotos
    return res.status(200).json(photos);
};

// Get photo by id, obtem a foto pelo id dela
const getPhotoById = async (req, res) => {
    //recebe o id pela url
    const { id } = req.params;

    //faz a busca:
    const photo = await Photo.findById(mongoose.Types.ObjectId(id));

    // Check if photo exists
    if (!photo) {
        res.status(404).json({ errors: ["Foto não encontrada!"] });
        return;
    }

    res.status(200).json(photo);
};

// Update a photo
const updatePhoto = async (req, res) => {
    //pega o id da url
    const { id } = req.params;
    //obtem o tirulo pelo body, atualiza somente o título e nao a foto
    const { title } = req.body;
    try {

        let image;

        if (req.file) {
            image = req.file.filename;
        };

        const reqUser = req.user;

        //obtem a foto pelo id dela: 
        const photo = await Photo.findById(id);

        // Check if photo exists
        if (!photo) {
            res.status(404).json({ errors: ["Foto não encontrada!"] });
            return;
        };

        // Check if photo belongs to user, valida se é do usuario da requisição
        if (!photo.userId.equals(reqUser._id)) {
            res
                .status(422)
                .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
            return;
        };

        //altera o tidulo
        if (title) {
            photo.title = title;
        };

        //altera a foto
        if (image) {
            photo.image = image;
        };

        //salva o registro
        await photo.save();

        //resposta
        res.status(200).json({ photo, message: "Foto atualizada com sucesso!" });

    } catch (error) {
        res.status(404).json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
        return;
    }
};


// Like functionality, contabilizar as curtidas na foto
const likePhoto = async (req, res) => {
    const { id } = req.params;

    const reqUser = req.user;

    try {
        const photo = await Photo.findById(id);

        // Check if photo exists
        if (!photo) {
            res.status(404).json({ errors: ["Foto não encontrada!"] });
            return;
        }

        // Check if user already liked the photo, um só pode dar um like
        if (photo.likes.includes(reqUser._id)) {
            res.status(422).json({ errors: ["Você já curtiu esta foto."] });
            return;
        }

        // Put user id in array of likes: adiciona o id do user no array de likes
        photo.likes.push(reqUser._id);

        //atualiza a foto
        await photo.save();

        //resposta: 
        res.status(200)
            .json({ photoId: id, userId: reqUser._id, message: "A foto foi curtida!" });

    } catch (error) {
        res.status(404).json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
        return;
    }
};

// Comment functionality
const commentPhoto = async (req, res) => {
    //pega id da foto pela url
    const { id } = req.params;
    //pega o comentario pela requisição
    const { comment } = req.body;
    //obtem o usuario da requisição
    const reqUser = req.user;

    try {
        //encontra o usuario pelo id
        const user = await User.findById(reqUser._id);
        //encontra a foto pelo id
        const photo = await Photo.findById(id);

        // Check if photo exists
        if (!photo) {
            res.status(404).json({ errors: ["Foto não encontrada!"] });
            return;
        }

        // Put comment in the array of comments,cria o objeto com os dados do comentário
        const userComment = {
            comment,
            userName: user.name,
            userImage: user.profileImage,
            userId: user._id,
        };

        //Insere o comentario no array de comentarios
        photo.comments.push(userComment);

        //salva a foto
        await photo.save();

        //retorna o resultado para o front
        res.status(200).json({
            comment: userComment,
            message: "Comentário adicionado com sucesso!",
        });

    } catch (error) {
        res.status(404).json({ errors: ["Foto não encontrada!"] });
        return;
    };

};

// Search a photo by title, buscar fotos pelo titulo: q é o valor para buscar
//Exemplo: */api/photos/search?q=y  -> busque todas as fotos que no titulo contenha  y
const searchPhotos = async (req, res) => {
    //recebe a query string q da url
    const { q } = req.query;

    //pega o array de fotos: filtrando pelo titulo usando expressão regular: que contenha a string recebida no q
    const photos = await Photo.find({ title: new RegExp(q, "i") }).exec();

    //ver como validar em caso de retorno de  buscas vazias
    // if (photos == []) {
    //     res.status(200).json({ errors: ["Nenhuma foto corresponde a busca!"] });
    //     return;
    // }

    //retorna o array para o front
    res.status(200).json(photos);

};


module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    searchPhotos,
};

