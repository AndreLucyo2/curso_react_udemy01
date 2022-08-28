const mongoose = require("mongoose");
const { Schema } = mongoose;

//criar o Schema do objeto
const userSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        profileImage: String,
        bio: String,
    },
    {
        //cria os campos crateAt e updateAt, para registro de datas das aletarações
        timestamps: true,
    }
);

//Definir o model com o seu Schema: o mongo cria a coleção com os campos do model
User = mongoose.model("User", userSchema);

module.exports = User;