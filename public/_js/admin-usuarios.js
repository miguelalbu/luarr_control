async function loadUsers() {
    try {
        const { data: users, error } = await supabaseClient
            .from('users')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const tableBody = document.getElementById('usersTable');
        tableBody.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.email}</td>
                <td>${user.is_active ? 
                    '<span class="badge bg-success">Ativo</span>' : 
                    '<span class="badge bg-warning">Inativo</span>'}
                </td>
                <td>${new Date(user.created_at).toLocaleDateString('pt-BR')}</td>
                <td>${user.last_login ? 
                    new Date(user.last_login).toLocaleDateString('pt-BR') : 
                    'Nunca'}
                </td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="toggleUserStatus('${user.id}', ${!user.is_active})">
                        ${user.is_active ? '🚫 Desativar' : '✅ Ativar'}
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
    }
}

async function addUser() {
    const email = document.getElementById('newEmail').value.trim();
    const password = document.getElementById('newPassword').value.trim();

    try {
        const { data, error: authError } = await supabaseClient.auth.signUp({
            email,
            password
        });

        if (authError) throw authError;

        const { error: dbError } = await supabaseClient
            .from('users')
            .insert([{ 
                id: data.user.id,
                email: email
            }]);

        if (dbError) throw dbError;

        alert('Usuário adicionado com sucesso!');
        loadUsers();
        bootstrap.Modal.getInstance(document.getElementById('addUserModal')).hide();
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        alert('Erro ao adicionar usuário: ' + error.message);
    }
}

async function toggleUserStatus(userId, newStatus) {
    if (!confirm(`Tem certeza que deseja ${newStatus ? 'ativar' : 'desativar'} este usuário?`)) return;

    try {
        const { error } = await supabaseClient
            .from('users')
            .update({ is_active: newStatus })
            .eq('id', userId);

        if (error) throw error;

        alert(`Usuário ${newStatus ? 'ativado' : 'desativado'} com sucesso!`);
        loadUsers();
    } catch (error) {
        console.error('Erro ao atualizar status do usuário:', error);
        alert('Erro ao atualizar status do usuário.');
    }
}

// Carregar usuários quando a página for aberta
document.addEventListener('DOMContentLoaded', loadUsers);
