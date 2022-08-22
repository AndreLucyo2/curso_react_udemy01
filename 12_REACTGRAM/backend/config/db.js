const mongoose = require("mongoose");

//connection :
//Pega os dados de conexão das variaveis de ambiente: .env 
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

//monta uma função que retorna a conexão com o banco de dados mogodbAtlas
const conn = async () => {

    try {
        const dbConn = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.garic5c.mongodb.net/?retryWrites=true&w=majority`
        );

        //Debug:
        console.log("Conectou no banco!")

        //Retorna a conexão:
        return dbConn;

    } catch (error) {
        //printa o erro:
        console.log(error);
    }
};

//Tenta conetar
conn();

//Exporta a conexão:
module.exports = conn;
