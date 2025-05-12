const db = require('../db'); // Certifique-se de ter o acesso ao banco de dados

const Produto = {
  listar: function (callback) {
    db.all('SELECT * FROM produtos', (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, rows);
    });
  },

  // Método para buscar um produto pelo id
  listarPorId: function (id, callback) {
    db.get('SELECT * FROM produtos WHERE id = ?', [id], (err, row) => {
      if (err) {
        return callback(err, null); // Retorna erro se houver
      }
      callback(null, row); // Retorna o produto encontrado
    });
  },

  inserir: function (nome, quantidade, preco, callback) {
    db.run(
      'INSERT INTO produtos (nome, quantidade, preco) VALUES (?, ?, ?)',
      [nome, quantidade, preco],
      function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, this.lastID);
      }
    );
  },

  atualizar: function (id, nome, quantidade, preco) {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE produtos SET nome = ?, quantidade = ?, preco = ? WHERE id = ?',
        [nome, quantidade, preco, id],
        function (err) {
          if (err) {
            return reject(err);
          }
          resolve(this.changes); // Número de linhas afetadas
        }
      );
    });
  },

  deletar: function (id, callback) {
    db.run('DELETE FROM produtos WHERE id = ?', [id], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, this.changes); // Retorna o número de registros afetados
    });
  }
};

module.exports = Produto;
