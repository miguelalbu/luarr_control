const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /relatorios
router.get("/", (req, res) => {
  const relatorio = {
    despesas: [],
    totalDespesas: 0,
    investimentoEstoque: 0,
    lucroEstimado: 0
  };

  db.all("SELECT * FROM despesas", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    relatorio.despesas = rows;
    relatorio.totalDespesas = rows.reduce((acc, d) => acc + d.valor, 0);

    db.all("SELECT preco, quantidade FROM produtos", [], (err2, produtos) => {
      if (err2) {
        console.error("Erro ao buscar produtos:", err2.message);
        return res.status(500).json({ error: err2.message });
      }

      relatorio.investimentoEstoque = produtos.reduce((acc, p) => acc + (p.preco * p.quantidade), 0);
      relatorio.lucroEstimado = relatorio.investimentoEstoque - relatorio.totalDespesas;

      res.json(relatorio);
    });
  });
});

module.exports = router;
