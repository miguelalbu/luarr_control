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

// Buscar dados do caixa por data
router.get('/caixa', (req, res) => {
    const data = req.query.data || new Date().toISOString().split('T')[0];
    
    db.serialize(() => {
        // Buscar totais por forma de pagamento
        db.all(`
            SELECT 
                forma_pagamento,
                COUNT(*) as quantidade_vendas,
                SUM(total) as total 
            FROM vendas 
            WHERE date(data) = date(?)
            GROUP BY forma_pagamento
        `, [data], (err, totaisPorForma) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }

            const totais = {
                total: 0,
                dinheiro: 0,
                cartao: 0,
                pix: 0,
                quantidade_vendas: 0
            };

            totaisPorForma.forEach(item => {
                totais[item.forma_pagamento] = Number(item.total);
                totais.total += Number(item.total);
                totais.quantidade_vendas += Number(item.quantidade_vendas);
            });

            // Buscar movimentações do dia
            db.all(`
                SELECT 
                    id,
                    datetime(data) as data,
                    total,
                    forma_pagamento,
                    itens
                FROM vendas 
                WHERE date(data) = date(?)
                ORDER BY data DESC
            `, [data], (err, movimentacoes) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }

                res.json({
                    data,
                    totais,
                    movimentacoes: movimentacoes.map(mov => ({
                        ...mov,
                        itens: JSON.parse(mov.itens)
                    }))
                });
            });
        });
    });
});

// Atualizar a rota POST de vendas
router.post('/', (req, res) => {
    const { total, total_original, desconto, forma_pagamento, itens } = req.body;

    // Validações
    if (!total || !forma_pagamento || !itens || !Array.isArray(itens) || itens.length === 0) {
        res.status(400).json({ error: 'Dados inválidos para a venda' });
        return;
    }

    db.serialize(() => {
        db.run('BEGIN TRANSACTION');

        try {
            const sql = `
                INSERT INTO vendas (
                    total, 
                    total_original, 
                    desconto, 
                    forma_pagamento, 
                    itens
                ) VALUES (?, ?, ?, ?, ?)
            `;

            db.run(
                sql,
                [
                    total,
                    total_original || total,
                    desconto || 0,
                    forma_pagamento,
                    JSON.stringify(itens)
                ],
                function(err) {
                    if (err) {
                        console.error('Erro ao inserir venda:', err);
                        db.run('ROLLBACK');
                        res.status(500).json({ error: err.message });
                        return;
                    }

                    const vendaId = this.lastID;
                    let processedItems = 0;
                    let hasError = false;

                    itens.forEach(item => {
                        db.run(
                            'UPDATE produtos SET quantidade = quantidade - ? WHERE id = ?',
                            [item.quantidade, item.produto.id],
                            (err) => {
                                if (err && !hasError) {
                                    hasError = true;
                                    console.error('Erro ao atualizar estoque:', err);
                                    db.run('ROLLBACK');
                                    res.status(500).json({ error: err.message });
                                    return;
                                }

                                processedItems++;
                                if (processedItems === itens.length && !hasError) {
                                    db.run('COMMIT');
                                    res.json({ 
                                        success: true, 
                                        vendaId,
                                        message: 'Venda registrada com sucesso!'
                                    });
                                }
                            }
                        );
                    });
                }
            );
        } catch (error) {
            console.error('Erro na transação:', error);
            db.run('ROLLBACK');
            res.status(500).json({ error: error.message });
        }
    });
});

// Listar vendas com filtros
router.get('/listar', (req, res) => {
    const { dataInicial, dataFinal, formaPagamento } = req.query;

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
    });
});

// Buscar venda específica
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