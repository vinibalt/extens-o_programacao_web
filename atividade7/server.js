const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Configurações
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Banco de dados temporário
let users = [];
let mensagens = [];
let currentUser = null;

// Rotas
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/cadastro", (req, res) => {
    res.render("cadastro");
});

app.post("/cadastro", (req, res) => {
    const { username, password } = req.body;
    users.push({ username, password });
    res.redirect("/login");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = username;
        res.redirect("/mural");
    } else {
        res.render("login", { error: "Usuário ou senha inválidos!" });
    }
});

app.get("/mural", (req, res) => {
    if (!currentUser) return res.redirect("/login");
    res.render("mural", { mensagens });
});

app.post("/mural", (req, res) => {
    const { titulo, conteudo } = req.body;
    mensagens.push({ titulo, conteudo, autor: currentUser });
    res.redirect("/mural");
});

app.get("/mensagem/:id", (req, res) => {
    if (!currentUser) return res.redirect("/login");
    const mensagem = mensagens[req.params.id];
    if (mensagem) res.render("mensagem", { mensagem });
    else res.status(404).send("Mensagem não encontrada!");
});

// Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});