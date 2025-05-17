const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho do banco de dados
const dbPath = path.resolve(__dirname, 'produtos.db');

// Função para criar as tabelas
function createTables(db) {
    // Primeiro adiciona as novas colunas
    const alterTable = [
        "PRAGMA foreign_keys=off;",
        "BEGIN TRANSACTION;",
        `ALTER TABLE vendas ADD COLUMN total_original DECIMAL(10,2) DEFAULT NULL;`,
        `ALTER TABLE vendas ADD COLUMN desconto DECIMAL(10,2) DEFAULT 0;`,
        "COMMIT;",
        "PRAGMA foreign_keys=on;"
    ];

    // Definição das tabelas
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
            total_original DECIMAL(10,2),
            desconto DECIMAL(10,2) DEFAULT 0,
            forma_pagamento TEXT NOT NULL,
            itens TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
    ];

    db.serialize(() => {
        // Tenta adicionar as novas colunas
        alterTable.forEach(sql => {
            db.run(sql, err => {
                if (err && !err.message.includes('duplicate column')) {
                    console.error('Erro ao alterar tabela:', err);
                }
            });
        });

        // Cria ou atualiza as tabelas
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
