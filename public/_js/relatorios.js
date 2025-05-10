const despesas = [
    { descricao: "Compra de embalagens", valor: 150.00, categoria: "Embalagens", data: "2024-07-10" },
    { descricao: "Transporte de mercadoria", valor: 200.00, categoria: "Transporte", data: "2024-07-12" },
    { descricao: "Compra de matéria-prima", valor: 500.00, categoria: "Matéria-prima", data: "2024-07-14" }
];

const estoqueEstimado = 2500.00;

function carregarRelatorio() {
    let totalDespesas = 0;
    const tabela = document.getElementById("tabelaRelatorio");
    tabela.innerHTML = "";  // Limpar a tabela antes de adicionar as linhas

    despesas.forEach(d => {
        totalDespesas += d.valor;
        tabela.innerHTML += `
        <tr>
            <td>${d.descricao}</td>
            <td>R$ ${d.valor.toFixed(2)}</td>
            <td>${d.categoria}</td>
            <td>${d.data}</td> <!-- Corrigido aqui -->
        </tr>
        `;
    });

    // Atualizando os totais
    document.getElementById("totalDespesas").innerText = `R$ ${totalDespesas.toFixed(2)}`;
    document.getElementById("totalEstoque").innerText = `R$ ${estoqueEstimado.toFixed(2)}`;
    document.getElementById("lucroEstimado").innerText = `R$ ${(estoqueEstimado - totalDespesas).toFixed(2)}`;
}

function exportarExcel() {
    alert("📦 Exportação para Excel será implementada com backend futuramente!");
}

// Chama a função para carregar o relatório assim que a página for carregada
document.addEventListener("DOMContentLoaded", function () {
    carregarRelatorio();
});
