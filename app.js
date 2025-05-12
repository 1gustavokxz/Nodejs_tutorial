const express = require("express");
const session = require("express-session");
const sqlite3 = require("sqlite3");
//const bodyparser = require("body-parser");

const app = express();

const PORT = 8000;

//conexão com o banco de dados
const db = new sqlite3.Database("users.db");

db.serialize( ()=> {
    db.run(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)"
    )
})

app.use('/static', express.static(__dirname + '/static'))

// Confiuração do express para processar requisições POST com BODY PARAMETERS
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    console.log("GET /")
    //res.send("Neymar no Santos Futebol clube <br> <img src='./static/neymarsantos.webp' width='700px'/>"); 
    res.render("pages/index");

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
app.post("/login", (req, res) => {
    console.log("POST /login")
    console.log(JSON.stringify(req.body));
    const {username, password} = req.body
    //res.render("pages/sobre");
    const query ="SELECT * FROM users WHERE username=? AND password=?"
    db.get(query, [username, password], (err,row) => {
        if (err) throw err;
        console.log(JSON.stringify(row));
        if(row){
            res.redirect("/dashoboard")
        } else {
            res.send("Usuário Inválido")
        }
       
    })

});
app.get("/cadastro", (req, res) => {
    console.log("GET /cadastro")
    // res.send("Você está na pagina SOBRE.")
    res.render("pages/cadastro");
});
app.post("/cadastro", (req, res) => {
    console.log("POST /cadastro")
    console.log(JSON.stringify(req.body));
    const {username, password} = req.body
    const query ="SELECT * FROM users WHERE username=?"
    db.get(query, [username], (err,row) => {
        if (err) throw err;
        console.log("Query SELECT do cadastro:",JSON.stringify(row));
        if(row){
            console.log(`Usuário: ${username} ja cadastrado`);
            res.send("Usuário ja cadastrado");
        } else {
            const insert = "INSERT INTO users (username, password) VALUES (?,?)"
            db.get(insert, [username, password], (err, row) => {
                if(err) throw err;

                console.log(`Usúario: ${username} cadastrado com sucesso.`)
                res.redirect("/login");
            })
        }
});


app.listen(PORT, () => {
    console.log(`Servidor sendo executado na porta ${PORT}`);
    console.log(__dirname + "\\static")
})
});