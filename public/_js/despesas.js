const form = document.getElementById('formDespesa');
const tabelaDespesas = document.getElementById('tabelaDespesas');
let despesaEditandoId = null;

// Carregar despesas ao entrar na página
document.addEventListener('DOMContentLoaded', listarDespesas);

// Submissão do formulário (adicionar ou editar)
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value).toFixed(2);
    const categoria = document.getElementById('categoria').value;
    const data = document.getElementById('data').value;

    const despesa = { descricao, valor, categoria, data };

    if (despesaEditandoId) {
        // Atualizar despesa
        fetch(`/api/despesas/${despesaEditandoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(despesa)
        })
        .then(res => res.json())
        .then(data => {
            despesaEditandoId = null;
            form.reset();
            // Mudar o texto do botão de volta para "Adicionar"
            document.getElementById('adicionar').textContent = 'Adicionar';
            listarDespesas();
        })
        .catch(err => {
            console.error("Erro ao editar despesa:", err);
            alert("Erro ao editar despesa.");
        });
    } else {
        // Inserir nova despesa
        fetch('/api/despesas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(despesa)
        })
        .then(res => res.json())
        .then(data => {
            form.reset();
            listarDespesas();
        })
        .catch(err => {
            console.error("Erro ao adicionar despesa:", err);
            alert("Erro ao adicionar despesa.");
        });
    }
});

// Listar todas as despesas
function listarDespesas() {
    fetch('/api/despesas')
    .then(response => response.json())
    .then(despesas => {
        tabelaDespesas.innerHTML = '';
        despesas.forEach(d => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${d.descricao}</td>
                <td>R$ ${parseFloat(d.valor).toFixed(2)}</td>
                <td>${d.categoria}</td>
                <td>${d.data}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarDespesas(${d.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deletarDespesas(${d.id})">Excluir</button>
                </td>
            `;
            tabelaDespesas.appendChild(tr);
        });
    })
    .catch(err => {
        console.error("Erro ao listar despesas:", err);
    });
}

// Deletar despesa
function deletarDespesas(id) {
    if (!confirm("Deseja realmente excluir esta despesa?")) return;

    fetch(`/api/despesas/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        listarDespesas();
    })
    .catch(err => {
        console.error("Erro ao deletar:", err);
        alert("Erro ao deletar despesa.");
    });
}

// Editar despesa
function editarDespesas(id) {
    fetch(`/api/despesas/${id}`)
    .then(res => res.json())
    .then(d => {
        
        document.getElementById('descricao').value = d.descricao;
        document.getElementById('valor').value = d.valor;
        document.getElementById('categoria').value = d.categoria;
        document.getElementById('data').value = d.data;
        despesaEditandoId = d.id;

        document.getElementById('adicionar').textContent = 'Editar'; // Alterar o nome do botão para "Editar"
    })
    .catch(err => {
        console.error("Erro ao buscar despesa:", err);
        alert("Erro ao carregar dados da despesa.");
    });
}