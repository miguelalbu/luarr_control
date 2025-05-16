const express = require('express');
const router = express.Router();
const db = require('../db');

// Listar produtos disponíveis para venda
router.get('/produtos', (req, res) => {
    db.all('SELECT * FROM produtos WHERE quantidade > 0', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Registrar nova venda
router.post('/', (req, res) => {
    const { total, forma_pagamento, itens } = req.body;

    db.serialize(() => {
        db.run('BEGIN TRANSACTION');

        try {
            db.run(
                'INSERT INTO vendas (total, forma_pagamento, itens) VALUES (?, ?, ?)',
                [total, forma_pagamento, JSON.stringify(itens)],
                function(err) {
                    if (err) {
                        db.run('ROLLBACK');
                        res.status(500).json({ error: err.message });
                        return;
                    }

                    const vendaId = this.lastID;
                    let processedItems = 0;

                    itens.forEach(item => {
                        db.run(
                            'UPDATE produtos SET quantidade = quantidade - ? WHERE id = ?',
                            [item.quantidade, item.produto.id],
                            (err) => {
                                if (err) {
                                    db.run('ROLLBACK');
                                    res.status(500).json({ error: err.message });
                                    return;
                                }

                                processedItems++;
                                if (processedItems === itens.length) {
                                    db.run('COMMIT');
                                    res.json({ success: true, vendaId });
                                }
                            }
                        );
                    });
                }
            );
        } catch (error) {
            db.run('ROLLBACK');
            res.status(500).json({ error: error.message });
        }
    });
});

router.get('/listar', (req, res) => {
    const{ dataInicial, dataFinal, formaPagamento} = req.query;

    let sql = 'SELECT * FROM vendas';
    const params = [];
    const conditions = [];

    if (dataInicial) {
        conditions.push('date(data) >= date(?)');
        params.push(dataInicial);
    }

    if (dataFinal) {
        conditions.push('date(data) <= date(?)');
        params.push(dataFinal);
    }

    if (formaPagamento) {
        conditions.push('forma_pagamento = ?');
        params.push(formaPagamento);
    }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY data DESC';

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    })
})

router.get('/:id', (req, res) => {
    db.get('SELECT * FROM vendas WHERE id = ?', [req.params.id], (err, venda) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!venda) {
            res.status(404).json({ error: 'Venda não encontrada' });
            return;
        }
        res.json(venda);
    });
});

module.exports = router;