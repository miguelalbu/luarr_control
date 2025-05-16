const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho do banco de dados
const dbPath = path.resolve(__dirname, 'produtos.db');

// Função para criar as tabelas
function createTables(db) {
    const tables = [
        `CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            quantidade INTEGER NOT NULL,
            preco REAL NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
        
        `CREATE TABLE IF NOT EXISTS despesas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            descricao TEXT NOT NULL,
            valor DECIMAL(10,2) NOT NULL,
            categoria TEXT NOT NULL,
            data DATE NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
        
        `CREATE TABLE IF NOT EXISTS vendas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data DATETIME DEFAULT CURRENT_TIMESTAMP,
            total DECIMAL(10,2) NOT NULL,
            forma_pagamento TEXT NOT NULL,
            itens TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
    ];

    db.serialize(() => {
        tables.forEach(sql => {
            db.run(sql, err => {
                if (err) {
                    console.error('Erro ao criar tabela:', err);
                }
            });
        });
    });
}

// Conexão com o banco de dados
const db = new sqlite3.Database(dbPath, err => {
    if (err) {
        console.error('Erro ao conectar ao banco:', err);
        return;
    }
    console.log('Banco de dados conectado com sucesso');
    createTables(db);
});

// Tratamento de erros de processo
process.on('SIGINT', () => {
    db.close(err => {
        if (err) {
            console.error('Erro ao fechar banco de dados:', err);
        } else {
            console.log('Conexão com banco de dados fechada');
        }
        process.exit(0);
    });
});

module.exports = db;
