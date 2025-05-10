const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Conectar ao MongoDB (substitua pela sua URL de conexão)
mongoose.connect('mongodb://localhost:27017/luar_cosmeticos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Definição do modelo de Produto
const produtoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    quantidade: { type: Number, required: true },
    preco: { type: Number, required: true },
});

const Produto = mongoose.model('Produto', produtoSchema);

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Rota para pegar produtos
app.get('/api/produtos', async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.json(produtos);
    } catch (error) {
        res.status(500).send("Erro ao buscar produtos");
    }
});

// Rota para adicionar um novo produto
app.post('/api/produtos', async (req, res) => {
    const { nome, quantidade, preco } = req.body;

    const novoProduto = new Produto({
        nome,
        quantidade,
        preco
    });

    try {
        const produtoSalvo = await novoProduto.save();
        res.status(201).json(produtoSalvo);
    } catch (error) {
        res.status(500).send("Erro ao adicionar produto");
    }
});

// Rota para excluir um produto
app.delete('/api/produtos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const produtoDeletado = await Produto.findByIdAndDelete(id);
        if (!produtoDeletado) {
            return res.status(404).send("Produto não encontrado");
        }
        res.status(200).send("Produto excluído com sucesso");
    } catch (error) {
        res.status(500).send("Erro ao excluir produto");
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});