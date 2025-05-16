document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/dashboard')
    .then(res => res.json())
    .then(data => {
      document.getElementById('totalProdutos').textContent = data.totalProdutos;

      document.getElementById('despesasMes').textContent = 
        `R$ ${parseFloat(data.despesasMes).toFixed(2).replace('.', ',')}`;

      document.getElementById('estoqueEstimado').textContent = 
        `R$ ${parseFloat(data.estoqueEstimado).toFixed(2).replace('.', ',')}`;
    })
    .catch(err => {
      console.error('Erro ao carregar dados do dashboard:', err);
    });
});
