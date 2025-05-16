async function carregarRelatorio() {
  try {
    const res = await fetch("/api/relatorios");
    const dados = await res.json();

    // Atualiza os totais
    document.getElementById("totalDespesas").innerText = `R$ ${dados.totalDespesas.toFixed(2)}`;
    document.getElementById("totalEstoque").innerText = `R$ ${dados.investimentoEstoque.toFixed(2)}`;
    document.getElementById("lucroEstimado").innerText = `R$ ${dados.lucroEstimado.toFixed(2)}`;

    // Preenche a tabela
    const tabela = document.getElementById("tabelaRelatorio");
    tabela.innerHTML = "";
    dados.despesas.forEach(d => {
      tabela.innerHTML += `
        <tr>
          <td>${d.descricao}</td>
          <td>R$ ${d.valor.toFixed(2)}</td>
          <td>${d.categoria}</td>
          <td>${d.data}</td>
        </tr>
      `;
    });

  } catch (err) {
    console.error("Erro ao carregar relatório:", err);
    alert("Erro ao carregar relatório. Veja o console.");
  }
}

document.addEventListener("DOMContentLoaded", carregarRelatorio);
