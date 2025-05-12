const express = require('express');
const router = express.Router();
const Produto = require('../models/produtos');

// GET /produtos
router.get('/', (req, res) => {
  Produto.listar((err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

// POST /produtos
router.post('/', (req, res) => {
  Produto.adicionar(req.body, function (err) {
    if (err) return res.status(500).json({ erro: err.message });
    res.status(201).json({ id: this.lastID });
  });
});

// DELETE /produtos/:id
router.delete('/:id', (req, res) => {
  Produto.deletar(req.params.id, function (err) {
    if (err) return res.status(500).json({ erro: err.message });
    res.status(204).end();
  });
});

module.exports = router;
