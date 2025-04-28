const express = require("express");
const session = require("express-session");
const sqlite3 = require("sqlite3");

const app = express();





const PORT = 8000;

app.use('/static', express.static(__dirname + '/static'))

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    console.log("GET /")
    //res.send("Neymar no Santos Futebol clube <br> <img src='./static/neymarsantos.webp' width='700px'/>"); 
    res.render("index");
});

app.get("/sobre", (req, res) => {
    console.log("GET /sobre")
    // res.send("Você está na pagina SOBRE.")
    res.render("pages/sobre");
});
app.get("/dashboard", (req, res) => {
    console.log("GET /dashboard")
    res.render("pages/dashboard")
});
app.get("/login", (req, res) => {
    console.log("GET /login")
    // res.send("Você está na pagina SOBRE.")
    res.render("pages/login");
});
app.get("/cadastro", (req, res) => {
    console.log("GET /cadastro")
    // res.send("Você está na pagina SOBRE.")
    res.render("pages/cadastro");
});

app.listen(PORT, () => {
    console.log(`Servidor sendo executado na porta ${PORT}`);
    console.log(__dirname + "\\static")
});