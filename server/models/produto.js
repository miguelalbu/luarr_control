const form = document.getElementById('formProduto');

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const quantidade = parseInt(document.getElementById('quantidade').value);

    const novoProduto = { nome, preco, quantidade };

    try {
        const response = await fetch('http://localhost:3001/produtos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoProduto)
        });

        if (response.ok) {
            form.reset();
            carregarProdutos();
        } else {
            alert("Erro ao adicionar produto");
        }
    } catch (erro) {
        console.error("Erro ao conectar com o servidor:", erro);
        alert("Não foi possível conectar com o servidor.");
    }
});

async function carregarProdutos() {
    try {
        const resposta = await fetch('http://localhost:3001/produtos');
        const produtos = await resposta.json();

        const tabela = document.getElementById('tabelaProdutos');
        tabela.innerHTML = '';

        produtos.forEach(produto => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${produto.nome}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.preco.toFixed(2)}</td>
                <td>R$ ${(produto.preco * produto.quantidade).toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="excluirProduto(${produto.id})">Excluir</button>
                </td>
            `;
            tabela.appendChild(linha);
        });
    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
    }
}

async function excluirProduto(id) {
    const confirmado = confirm("Deseja realmente excluir este produto?");
    if (!confirmado) return;

    try {
        const resposta = await fetch(`http://localhost:3001/produtos/${id}`, {
            method: 'DELETE'
        });

        if (resposta.ok) {
            carregarProdutos();
        } else {
            alert("Erro ao excluir produto");
        }
    } catch (erro) {
        console.error("Erro ao tentar excluir:", erro);
        alert("Erro na exclusão do produto.");
    }
}

// Carregar a tabela assim que a página for aberta
document.addEventListener('DOMContentLoaded', carregarProdutos);
