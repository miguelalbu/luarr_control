const express = require('express');
const Despesas = require('../models/despesas');
const router = express.Router();

router.get('/', (req, res) => {
    Despesas.listar((err, despesas) => {
        if(err) {
            return res.status(500).json({erro: 'Erro ao buscar despesas'})
        }
        res.json(despesas);
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Despesas.listarPorId(id, (err, despesas) => {
        if(err) {
            return res.status(500).json({ erro: 'Erro ao buscar despesas'});
        }
        if(!despesas) {
            return res.status(404).json({ erro: 'Despesa não encontrada' })
        }
        res.json(despesas);
    })
})

router.post('/', (req, res) => {
    const { descricao, valor, categoria, data } = req.body;

    if (!descricao || !valor || !categoria || !data) {
        return res.status(400).json({ erro: 'Preencha todos os campos' });
    }

    Despesas.inserir(descricao, valor, categoria, data, (err, id) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao adicionar despesa' });
        }
        res.status(201).json({ id, mensagem: 'Despesa adicionada com sucesso' });
    });
});


router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Despesas.deletar(id, (err) => {
        if(err) {
            return res.status(500).json({ erro: 'Erro ao excluir despesas' });
        }
        res.status(200).json({ mensagem: 'Despesa deletada com sucesso' })
    });
});

// Atualizando
router.put('/:id', (req, res) => {
    const { descricao, valor, categoria, data } = req.body;
    const id = req.params.id;

    Despesas.atualizar(id, descricao, valor, categoria, data, (err) => {
        if (err) return res.status(500).json({ erro: "Erro ao atualizar despesa" });
        res.json({ mensagem: "Despesa atualizada com sucesso!" });
    });
});




module.exports = router;