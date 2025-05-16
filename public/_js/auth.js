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