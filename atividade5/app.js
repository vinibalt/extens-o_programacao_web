const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index', { error: null });
});

app.post('/dados', (req, res) => {
    const { nome, endereco, telefone, data } = req.body;


    if (!nome || !endereco || !telefone || !data) {
        return res.render('index', { error: 'Todos os campos devem ser preenchidos!' });
    }

    res.render('dados', { nome, endereco, telefone, data });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});