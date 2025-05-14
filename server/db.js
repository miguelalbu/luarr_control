const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, 'produtos.db'), (err) => {
  if (err) console.error('Erro ao conectar ao banco:', err);
  else console.log('Banco de dados conectado');
});

// Criação da tabela se não existir
db.run(`
  CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    quantidade INTEGER NOT NULL,
    preco REAL NOT NULL
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS despesas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    descricao TEXT NOT NULL,
    valor INTEGER NOT NULL,
    categoria TEXT NOT NULL,
    data TEXT
  )
`);

module.exports = db;
