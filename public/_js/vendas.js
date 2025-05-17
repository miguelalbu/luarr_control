let produtosDisponiveis = [];
let itensVenda = [];
let totalVenda = 0;
let descontoAplicado = 0;
let totalComDesconto = 0;

// Adicionar produto à venda
function adicionarProduto() {
    const produtoSelect = document.getElementById('produto');
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const produtoId = parseInt(produtoSelect.value);

    if (!produtoId || quantidade < 1) {
        alert('Selecione um produto e quantidade válida');
        return;
    }

    const produto = produtosDisponiveis.find(p => p.id === produtoId);
    
    if (!produto) {
        alert('Produto não encontrado');
        return;
    }

    if (quantidade > produto.quantidade) {
        alert('Quantidade indisponível em estoque');
        return;
    }

    const itemExistente = itensVenda.find(item => item.produto.id === produto.id);
    
    if (itemExistente) {
        if (itemExistente.quantidade + quantidade > produto.quantidade) {
            alert('Quantidade total excede o estoque disponível');
            return;
        }
        itemExistente.quantidade += quantidade;
        itemExistente.subtotal = itemExistente.quantidade * produto.preco;
    } else {
        itensVenda.push({
            produto: produto,
            quantidade: quantidade,
            subtotal: quantidade * produto.preco
        });
    }

    atualizarTabelaItens();
    calcularTotal();
    
    // Limpar campos
    document.getElementById('quantidade').value = 1;
    produtoSelect.value = '';
}

// Atualizar tabela de itens
function atualizarTabelaItens() {
    const tbody = document.getElementById('itensVenda');
    tbody.innerHTML = '';

    itensVenda.forEach((item, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${item.produto.nome}</td>
                <td>${item.quantidade}</td>
                <td>R$ ${item.produto.preco.toFixed(2)}</td>
                <td>R$ ${item.subtotal.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="removerItem(${index})">
                        🗑️ Remover
                    </button>
                </td>
            </tr>
        `;
    });
}

// Calcular total da venda
function calcularTotal() {
    totalVenda = itensVenda.reduce((total, item) => total + item.subtotal, 0);
    aplicarDesconto();
}

// Nova função para aplicar desconto
function aplicarDesconto() {
    const inputDesconto = document.getElementById('desconto');
    descontoAplicado = parseFloat(inputDesconto.value) || 0;

    // Validar se desconto não é maior que o total
    if (descontoAplicado > totalVenda) {
        alert('Desconto não pode ser maior que o valor total');
        inputDesconto.value = 0;
        descontoAplicado = 0;
    }

    totalComDesconto = totalVenda - descontoAplicado;
    
    // Atualizar exibição dos valores
    document.getElementById('totalVenda').innerHTML = `
        ${descontoAplicado > 0 ? `<del class="text-muted">R$ ${totalVenda.toFixed(2)}</del><br>` : ''}
        <strong>R$ ${totalComDesconto.toFixed(2)}</strong>
    `;
}

// Remover item da venda
function removerItem(index) {
    itensVenda.splice(index, 1);
    atualizarTabelaItens();
    calcularTotal();
}

// Carregar produtos disponíveis
async function carregarProdutos() {
    try {
        const response = await fetch('http://localhost:3000/api/vendas/produtos');
        if (!response.ok) throw new Error('Erro ao carregar produtos');
        
        const produtos = await response.json();
        produtosDisponiveis = produtos;
        
        const select = document.getElementById('produto');
        select.innerHTML = '<option value="">Selecione um produto...</option>';
        
        produtos.forEach(produto => {
            select.innerHTML += `
                <option value="${produto.id}">
                    ${produto.nome} (Disponível: ${produto.quantidade})
                </option>
            `;
        });
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        alert('Erro ao carregar produtos. Tente novamente.');
    }
}

// Atualizar função finalizarVenda
async function finalizarVenda() {
    if (itensVenda.length === 0) {
        alert('Adicione produtos à venda');
        return;
    }

    try {
        const formaPagamento = document.getElementById('formaPagamento').value;
        const venda = {
            total: totalComDesconto,
            total_original: totalVenda,
            desconto: descontoAplicado,
            forma_pagamento: formaPagamento,
            itens: itensVenda
        };

        console.log('Dados da venda:', venda); // Debug

        const response = await fetch('http://localhost:3000/api/vendas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(venda)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Erro ao finalizar venda');
        }

        const result = await response.json();
        alert(result.message || 'Venda registrada com sucesso!');
        
        // Limpar formulário
        itensVenda = [];
        totalVenda = 0;
        descontoAplicado = 0;
        totalComDesconto = 0;
        
        document.getElementById('desconto').value = '0';
        document.getElementById('produto').value = '';
        document.getElementById('quantidade').value = '1';
        
        atualizarTabelaItens();
        calcularTotal();
        
    } catch (error) {
        console.error('Erro ao finalizar venda:', error);
        alert('Erro ao finalizar venda: ' + error.message);
    }
}

// Carregar produtos ao iniciar a página
document.addEventListener('DOMContentLoaded', carregarProdutos);
