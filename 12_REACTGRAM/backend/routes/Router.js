const express = require("express");
const router = express();

//teste de rotas express: fazer um GET na url http://localhost:5000/
router.get("/",(req,res) =>{
    res.send("API Funcionando!")
})

module.exports = router;