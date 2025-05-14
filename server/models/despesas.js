const db = require('../db');

const Despesas = {
    listar: function (callback) {
        db.all('SELECT * FROM despesas', (err, rows) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, rows);
        });
    },

    listarPorId: function (id, callback) {
        db.get('SELECT * FROM despesas WHERE id = ?', [id], (err, row) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, row);
        });
    },

    inserir: function (descricao, valor, categoria, data, callback) {
        db.run(
            'INSERT INTO despesas (descricao, valor, categoria, data) VALUES (?, ?, ?, ?)',
            [descricao, valor, categoria, data],
            function (err) {
                if (err) {
                    return callback(err);
                }
                callback(null, this.lastID);
            }
        );
    },

    deletar: function (id, callback) {
        db.run('DELETE FROM despesas WHERE id = ?', [id], function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, this.changes);
        });
    },
    atualizar: function (id, descricao, valor, categoria, data, callback) {
        db.run(
            'UPDATE despesas SET descricao = ?, valor = ?, categoria = ?, data = ? WHERE id = ?',
            [descricao, valor, categoria, data, id],
            function (err) {
                if (err) return callback(err);
                callback(null);
            }
        );
    }

};

module.exports = Despesas;
