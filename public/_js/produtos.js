const form = document.getElementById('formProduto');
const tabela = document.getElementById('tabelaProdutos');

// Carrega produtos do localStorage
function carregarProdutos() {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    atualizarTabela(produtos);
}

// Atualiza a tabela com os produtos
function atualizarTabela(produtos) {
    tabela.innerHTML = ''; // Limpa a tabela

    produtos.forEach((p, index) => {
        tabela.innerHTML += `
        <tr>
            <td>${p.nome}</td>
            <td>${p.quantidade}</td>
            <td>R$ ${parseFloat(p.preco).toFixed(2)}</td>
            <td>R$ ${(p.quantidade * p.preco).toFixed(2)}</td>
            <td><button class="btn btn-sm btn-danger" onclick="removerProduto(${index})">Excluir</button></td>
        </tr>
        `;
    });
}

// Adiciona um novo produto
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const preco = parseFloat(document.getElementById('preco').value);

    if (!nome || isNaN(quantidade) || isNaN(preco)) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    const produto = { nome, quantidade, preco: preco.toFixed(2) };

    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.push(produto);
    localStorage.setItem('produtos', JSON.stringify(produtos));

    carregarProdutos(); // Atualiza a tabela
    form.reset();       // Limpa o formulário
});

// Remove produto pelo índice
function removerProduto(index) {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.splice(index, 1);
    localStorage.setItem('produtos', JSON.stringify(produtos));
    carregarProdutos();
}

// Carrega os produtos ao iniciar a página
document.addEventListener("DOMContentLoaded", carregarProdutos);
