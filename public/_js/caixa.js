function inicializarData() {
    const hoje = new Date();
    const inputData = document.getElementById('dataCaixa');
    inputData.value = hoje.toISOString().split('T')[0];
    atualizarCaixa();
}

// Atualizar dados do caixa
async function atualizarCaixa() {
    const dataSelecionada = document.getElementById('dataCaixa').value;

    try {
        const response = await fetch(`http://localhost:3000/api/vendas/caixa?data=${dataSelecionada}`);
        if (!response.ok) throw new Error('Erro ao carregar dados do caixa');

        const dados = await response.json();

        // Atualizar totais
        document.getElementById('totalDia').textContent =
            `R$ ${dados.totais.total.toFixed(2)}`;
        document.getElementById('totalDinheiro').textContent =
            `R$ ${dados.totais.dinheiro.toFixed(2)}`;
        document.getElementById('totalCartao').textContent =
            `R$ ${dados.totais.cartao.toFixed(2)}`;
        document.getElementById('totalPix').textContent =
            `R$ ${dados.totais.pix.toFixed(2)}`;

        // Atualizar tabela de movimentações
        const tbody = document.getElementById('movimentacoesDia');
        tbody.innerHTML = '';

        dados.movimentacoes.forEach(movimento => {
            tbody.innerHTML += `
                <tr>
                    <td>${new Date(movimento.data).toLocaleTimeString('pt-BR')}</td>
                    <td>${formatarDescricao(movimento)}</td>
                    <td>${formatarFormaPagamento(movimento.forma_pagamento)}</td>
                    <td>R$ ${Number(movimento.total).toFixed(2)}</td>
                </tr>
            `;
        });

    } catch (error) {
        console.error('Erro ao atualizar caixa:', error);
        alert('Erro ao atualizar dados do caixa. Tente novamente.');
    }
}

// Formatar descrição da movimentação
function formatarDescricao(movimento) {
    let itens;
    try {
        // Verifica se já é um objeto
        itens = typeof movimento.itens === 'string' ?
            JSON.parse(movimento.itens) :
            movimento.itens;

        return itens.map(item =>
            `${item.produto.nome} (${item.quantidade}x)`
        ).join(', ');
    } catch (error) {
        console.error('Erro ao processar itens:', error);
        return 'Erro ao processar itens';
    }
}

// Formatar forma de pagamento
function formatarFormaPagamento(forma) {
    const formatos = {
        'dinheiro': '💵 Dinheiro',
        'cartao': '💳 Cartão',
        'pix': '📱 PIX'
    };
    return formatos[forma] || forma;
}

// Inicializar página
document.addEventListener('DOMContentLoaded', inicializarData);
