const express = require('express');
const Produto = require('../models/produtos'); // Importando o modelo Produto
const router = express.Router();

// Rota para listar todos os produtos
router.get('/', (req, res) => {
  Produto.listar((err, produtos) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar produtos' });
    }
    res.json(produtos);
  });
});

// Rota para pegar um produto pelo id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Produto.listarPorId(id, (err, produto) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar produto' });
    }
    if (!produto) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.json(produto); // Retorna o produto encontrado
  });
});

// Rota para adicionar um novo produto
router.post('/', (req, res) => {
  const { nome, quantidade, preco } = req.body;
  Produto.inserir(nome, quantidade, preco, (err, id) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao adicionar produto' });
    }
    res.status(201).json({ id, nome, quantidade, preco });
  });
});

// Rota para atualizar um produto existente
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { nome, quantidade, preco } = req.body;

  Produto.atualizar(id, nome, quantidade, preco)
    .then(() => res.status(200).json({ mensagem: 'Produto atualizado com sucesso' }))
    .catch(err => res.status(500).json({ erro: 'Erro ao atualizar produto' }));
});

// Rota para deletar um produto
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Produto.deletar(id, (err) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao excluir produto' });
    }
    res.status(200).json({ mensagem: 'Produto deletado com sucesso' });
  });
});

module.exports = router;
