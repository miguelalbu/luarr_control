const db = require('../db');

module.exports = {
  listar(callback) {
    db.all('SELECT * FROM produtos', callback);
  },

  adicionar(produto, callback) {
    const { nome, quantidade, preco } = produto;
    db.run(
      'INSERT INTO produtos (nome, quantidade, preco) VALUES (?, ?, ?)',
      [nome, quantidade, preco],
      callback
    );
  },

  deletar(id, callback) {
    db.run('DELETE FROM produtos WHERE id = ?', [id], callback);
  }
};
