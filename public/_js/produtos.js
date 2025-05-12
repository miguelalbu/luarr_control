document.addEventListener("DOMContentLoaded", function() {
  const formProduto = document.getElementById("formProduto");
  const tabelaProdutos = document.getElementById("tabelaProdutos");
  const produtoIdInput = document.getElementById("produtoId");

  // Função para listar os produtos na tabela
  function listarProdutos() {
    fetch('/api/produtos')
      .then(response => response.json())
      .then(produtos => {
        tabelaProdutos.innerHTML = '';
        produtos.forEach(produto => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.preco.toFixed(2)}</td>
            <td>R$ ${(produto.quantidade * produto.preco).toFixed(2)}</td>
            <td>
              <button class="btn btn-warning btn-sm" onclick="editarProduto(${produto.id})">Editar</button>
              <button class="btn btn-danger btn-sm" onclick="deletarProduto(${produto.id})">Deletar</button>
            </td>
          `;
          tabelaProdutos.appendChild(tr);
        });
      });
  }

  // Função para editar um produto
  window.editarProduto = function(id) {
    fetch(`/api/produtos/${id}`)
      .then(response => response.json())
      .then(produto => {
        produtoIdInput.value = produto.id;
        document.getElementById("nome").value = produto.nome;
        document.getElementById("quantidade").value = produto.quantidade;
        document.getElementById("preco").value = produto.preco;
        document.getElementById("btnSalvar").textContent = 'Atualizar Produto';
      });
  };

  // Função para deletar um produto
  window.deletarProduto = function(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      fetch(`/api/produtos/${id}`, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(() => {
        listarProdutos();
      })
      .catch(err => alert('Erro ao excluir produto'));
    }
  };

  // Ao submeter o formulário, salvar ou atualizar o produto
  formProduto.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = produtoIdInput.value;
    const nome = document.getElementById("nome").value;
    const quantidade = document.getElementById("quantidade").value;
    const preco = document.getElementById("preco").value;

    const data = { nome, quantidade, preco };

    if (id) {
      // Atualizando produto
      fetch(`/api/produtos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(() => {
        listarProdutos();
        formProduto.reset();
        produtoIdInput.value = '';
        document.getElementById("btnSalvar").textContent = 'Adicionar Produto';
      })
      .catch(err => alert('Erro ao atualizar produto'));
    } else {
      // Adicionando novo produto
      fetch('/api/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(() => {
        listarProdutos();
        formProduto.reset();
      })
      .catch(err => alert('Erro ao adicionar produto'));
    }
  });

  // Inicializa a listagem de produtos
  listarProdutos();
});
