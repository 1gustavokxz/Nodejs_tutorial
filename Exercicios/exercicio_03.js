const express = require("express");

const app = express();

app.get("/", (req, res) =>{
    res.send("Alo Senai Sumaré!!");
})
app.get("/sobre", (req, res) =>{
    res.send("Voce está na pagina sobre");
})
app.listen(3000, () => {
    console.log(`Servidor NODEjs ativo na porta 3000`);
})

