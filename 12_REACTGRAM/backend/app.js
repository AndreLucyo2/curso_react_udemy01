//Variaveis de ambiente
require("dotenv").config();

//carregando as dependencias 
const express = require("express");
const path = require("path");
const cors = require("cors");

//Seta a porta da aplicação:
const port = process.env.PORT;

//inicializar a aplicação
const app = express();

// recebe respostas em json e form data, aceita imagens e outros dados nas requisições
// Config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Chama as rotas do arquivo routes
const router = require("./routes/Router.js");
app.use(router);

//iniciar a aplicação: 
app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});