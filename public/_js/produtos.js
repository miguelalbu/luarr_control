const form = document.getElementById('formProduto');
const tabela = document.getElementById('tabelaProdutos');

// Função para carregar os produtos da API (JSON Server)
async function carregarProdutos() {
    try {
        const response = await fetch('http://localhost:3001/produtos');
        if (response.ok) {
            const produtos = await response.json();
            atualizarTabela(produtos);
        } else {
            console.error('Erro ao carregar produtos:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

// Função para atualizar a tabela com os produtos
function atualizarTabela(produtos) {
    tabela.innerHTML = ''; // Limpa a tabela antes de adicionar os produtos
    produtos.forEach((p, index) => {
        tabela.innerHTML += `
        <tr>
            <td>${p.nome}</td>
            <td>${p.quantidade}</td>
            <td>R$ ${p.preco}</td>
            <td>R$ ${(p.quantidade * p.preco).toFixed(2)}</td>
            <td><button class="btn btn-sm btn-danger" onclick="removerProduto(${p.id})">Excluir</button></td>
        </tr>
        `;
    });
}

// Função para adicionar um novo produto
form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const preco = parseFloat(document.getElementById('preco').value);

    const produto = {
        nome,
        quantidade,
        preco: preco.toFixed(2),
    };

    try {
        const response = await fetch('http://localhost:3001/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produto),
        });

        if (response.ok) {
            carregarProdutos(); // Recarrega os produtos após adicionar um novo
            form.reset(); // Reseta o formulário
        } else {
            console.error('Erro ao adicionar produto:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição de adicionar produto:', error);
    }
});

// Função para remover um produto
async function removerProduto(id) {
    try {
        const response = await fetch(`http://localhost:3001/produtos/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            carregarProdutos(); // Recarrega os produtos após a remoção
        } else {
            console.error('Erro ao excluir produto:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição de excluir produto:', error);
    }
}

// Carregar os produtos ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    carregarProdutos();
});
