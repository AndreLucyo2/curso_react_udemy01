//----  ESTE ARQUIVO É UM CENTRALIZADOR DE ROTAS   -----------------------------------------------

const express = require("express");
const router = express();

//importa a rota relacionada ao usuario:
router.use("/api/users", require("./UserRoutes"));

//teste de rotas express: fazer um GET na url http://localhost:5000/
router.get("/", (req, res) => {
    res.send("API Funcionando!")
})

module.exports = router;