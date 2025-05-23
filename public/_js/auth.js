const supabaseUrl = 'https://vlrzwandkawtfcmikdtb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZscnp3YW5ka2F3dGZjbWlrZHRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MTM2MjQsImV4cCI6MjA2Mjk4OTYyNH0.08Xt2676zob242KX4_qvG6K_mXC41zL5Y131yRd3RgQ';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Lista de emails de administradores
const ADMIN_EMAILS = ['miguel.albu14@outlook.com'];

async function checkAuth() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) {
        window.location.href = 'index.html';
        return null;
    }
    return session;
}

async function checkAdmin() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user || !ADMIN_EMAILS.includes(user.email)) {
        window.location.href = 'dashboard.html';
        return false;
    }
    return true;
}

async function logout() {
    try {
        const { error } = await supabaseClient.auth.signOut();
        if (error) throw error;
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        alert('Erro ao fazer logout. Tente novamente.');
    }
}

// Adicione esta função de login
async function handleLogin(e) {
    e.preventDefault();
    const msg = document.getElementById('msg');
    msg.style.display = 'none';

    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;

    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;

        // Login bem sucedido
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error('Erro no login:', error);
        msg.textContent = 'Email ou senha inválidos';
        msg.style.display = 'block';
    }
}

// Adicione este código para inicializar o formulário
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});