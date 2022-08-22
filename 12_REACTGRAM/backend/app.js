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

// Solve CORS : aponte para onde esta o frontend, depende de onde for colocado o frontend
// Default para estudo padrão react: http://localhost:3000
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Upload directory: onde ficam salvo os aquivos estaticos de imagens 
//nota o path : juntando o diretorio atual com a pasta, ai independente do servidor ele chega até a pasta uploads
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// db connection : dados da conexão com o banco de dados 
require("./config/db.js");

// Chama as rotas do arquivo routes
const router = require("./routes/Router.js");
app.use(router);

//iniciar a aplicação: 
app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});