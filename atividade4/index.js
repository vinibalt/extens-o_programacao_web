const express = require('express');
const app = express();

let estoque = [];

app.get('/adicionar/:id/:nome/:qtd', (req, res) => {
    const { id, nome, qtd } = req.params;
    const produto = { id: Number(id), nome: nome, qtd: Number(qtd) };
    const produtoExistente = estoque.find(item => item.id === produto.id);

    if (produtoExistente) {
        res.send('Produto com este ID já existe.');
    } else {
        estoque.push(produto);
        res.send('Produto adicionado com sucesso!');
    }
});

app.get('/listar', (req, res) => {
    res.json(estoque);
});

app.get('/remover/:id', (req, res) => {
    const { id } = req.params;
    const novoEstoque = estoque.filter(produto => produto.id !== Number(id));

    if (novoEstoque.length === estoque.length) {
        res.send('Produto não encontrado.');
    } else {
        estoque = novoEstoque;
        res.send('Produto removido com sucesso!');
    }
});

app.get('/editar/:id/:qtd', (req, res) => {
    const { id, qtd } = req.params;
    const produto = estoque.find(produto => produto.id === Number(id));

    if (produto) {
        produto.qtd = Number(qtd);
        res.send(`Quantidade do produto ${produto.nome} atualizada para ${produto.qtd}`);
    } else {
        res.send('Produto não encontrado.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});