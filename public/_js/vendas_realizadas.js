// Carregar vendas
async function carregarVendas(filtros = {}) {
    try {
        let url = 'http://localhost:3000/api/vendas/listar';
        if (Object.keys(filtros).length > 0) {
            url += '?' + new URLSearchParams(filtros);
        }
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erro ao carregar vendas');
        
        const vendas = await response.json();
        const tbody = document.getElementById('listaVendas');
        tbody.innerHTML = '';
        
        vendas.forEach(venda => {
            const itens = JSON.parse(venda.itens);
            const produtosTexto = itens.map(item => 
                `${item.produto.nome} (${item.quantidade})`
            ).join(', ');

            tbody.innerHTML += `
                <tr>
                    <td>${new Date(venda.data).toLocaleDateString('pt-BR')}</td>
                    <td>${produtosTexto}</td>
                    <td>R$ ${Number(venda.total).toFixed(2)}</td>
                    <td>${formatarFormaPagamento(venda.forma_pagamento)}</td>
                    <td>
                        <button class="btn btn-sm btn-info" onclick="verDetalhes(${venda.id})">
                            👁️ Ver Detalhes
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error('Erro ao carregar vendas:', error);
        alert('Erro ao carregar vendas. Tente novamente.');
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

// Filtrar vendas
function filtrarVendas() {
    const filtros = {
        dataInicial: document.getElementById('dataInicial').value,
        dataFinal: document.getElementById('dataFinal').value,
        formaPagamento: document.getElementById('formaPagamento').value
    };

    // Remove filtros vazios
    Object.keys(filtros).forEach(key => {
        if (!filtros[key]) delete filtros[key];
    });

    carregarVendas(filtros);
}

// Ver detalhes da venda
async function verDetalhes(vendaId) {
    try {
        const response = await fetch(`http://localhost:3000/api/vendas/${vendaId}`);
        if (!response.ok) throw new Error('Erro ao carregar detalhes');
        
        const venda = await response.json();
        const itens = JSON.parse(venda.itens);
        
        const modalBody = document.getElementById('detalhesVendaBody');
        modalBody.innerHTML = `
            <div class="mb-3">
                <strong>Data:</strong> ${new Date(venda.data).toLocaleDateString('pt-BR')}
            </div>
            <div class="mb-3">
                <strong>Forma de Pagamento:</strong> ${formatarFormaPagamento(venda.forma_pagamento)}
            </div>
            <div class="mb-3">
                <strong>Itens:</strong>
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Preço Unit.</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itens.map(item => `
                            <tr>
                                <td>${item.produto.nome}</td>
                                <td>${item.quantidade}</td>
                                <td>R$ ${item.produto.preco.toFixed(2)}</td>
                                <td>R$ ${item.subtotal.toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" class="text-end"><strong>Total:</strong></td>
                            <td><strong>R$ ${Number(venda.total).toFixed(2)}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        `;

        new bootstrap.Modal(document.getElementById('detalhesVendaModal')).show();
    } catch (error) {
        console.error('Erro ao carregar detalhes:', error);
        alert('Erro ao carregar detalhes da venda. Tente novamente.');
    }
}

// Carregar vendas ao iniciar
document.addEventListener('DOMContentLoaded', () => carregarVendas());
