const mongoose = require("mongoose");
const { Schema } = mongoose;

/*
Aqui no modelo define como sera salvo os dados da foto:
- No banco de dados salvamos apenas o caminho do arquivo
- salvamos o titulo
- salvamos os likes/curtidas, coração cheios ou vazios e a quantidade
- comentarios: uma lista de comentarios
- userId : id do usuario no padrao do mongoose (todo o objeto tem um id), pode montar a url para acessar o userário
- nome do usuario, ver quem postou 
*/
const photoSchema = new Schema(
    {
        image: String,
        title: String,
        likes: Array,
        comments: Array,
        userId: mongoose.ObjectId,
        userName: String,
    },
    {
        //cria os campos crateAt e updateAt, para registro de datas das aletarações
        timestamps: true,
    }
);

Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;
