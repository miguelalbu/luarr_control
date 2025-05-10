const form = document.getElementById('formDespesa');
const tabela = document.getElementById('tabelaDespesas');
const despesas = [];

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value).toFixed(2);
    const categoria = document.getElementById('categoria').value;
    const data = document.getElementById('data').value;

    const despesa = { descricao, valor, categoria, data };
    despesas.push(despesa);
    atualizarTabela();

    form.reset();
});

function atualizarTabela() {
    tabela.innerHTML = '';
    despesas.forEach((d, index) => {
    tabela.innerHTML += `
    <tr>
    <td>${d.descricao}</td>
    <td>R$ ${d.valor}</td>
    <td>${d.categoria}</td>
    <td>${d.data}</td>
    <td><button class="btn btn-sm btn-danger" onclick="removerDespesa(${index})">Excluir</button></td>
    </tr>
    `;
});
}

function removerDespesa(index) {
    despesas.splice(index, 1);
    atualizarTabela();
}