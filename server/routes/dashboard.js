const express = require('express');
const router = express.Router();
const db = require('../db'); // ajuste o caminho conforme seu projeto

router.get('/', (req, res) => {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // mês atual

  const inicioMes = `${ano}-${mes}-01`;
  const fimMes = `${ano}-${mes}-31`;

  const sqlProdutos = `SELECT COUNT(*) AS totalProdutos, SUM(preco * quantidade) AS estoqueEstimado FROM produtos`;
  const sqlDespesas = `SELECT SUM(valor) AS despesasMes FROM despesas WHERE data BETWEEN ? AND ?`;

  db.get(sqlProdutos, [], (err, rowProdutos) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar produtos.' });

    db.get(sqlDespesas, [inicioMes, fimMes], (err, rowDespesas) => {
      if (err) return res.status(500).json({ erro: 'Erro ao buscar despesas.' });

      res.json({
        totalProdutos: rowProdutos.totalProdutos || 0,
        estoqueEstimado: rowProdutos.estoqueEstimado || 0,
        despesasMes: rowDespesas.despesasMes || 0
      });
    });
  });
});

module.exports = router;
