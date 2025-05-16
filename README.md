# Luar Cosméticos - Sistema de Gestão

## 📋 Sobre o Projeto
Sistema web desenvolvido para gerenciamento interno da Luar Cosméticos, permitindo controle de produtos, vendas, despesas e relatórios financeiros.

## 🚀 Funcionalidades

### 🔐 Autenticação e Segurança
- Sistema de login seguro (SupaBase)
- Gerenciamento de usuários (apenas para administradores)
- Proteção de rotas para usuários não autenticados

### 📊 Módulos Principais

#### 1. Dashboard
- Visão geral do sistema
- Resumo de produtos cadastrados
- Informações financeiras

#### 2. Produtos
- Cadastro de produtos
- Gerenciamento de estoque
- Listagem e edição

#### 3. Vendas
- **Novo**: Registro de vendas com desconto automático no estoque
- **Novo**: Múltiplos produtos por venda
- **Novo**: Cálculo automático do total
- **Novo**: Diferentes formas de pagamento (Dinheiro, Cartão, PIX)
- **Novo**: Histórico completo de vendas realizadas
- **Novo**: Filtros por data e forma de pagamento
- **Novo**: Visualização detalhada de cada venda

#### 4. Despesas
- Registro de despesas
- Categorização
- Acompanhamento financeiro

#### 5. Relatórios
- Relatórios financeiros
- Análise de despesas
- Estatísticas do negócio

#### 6. Administração
- Gerenciamento de usuários
- Controle de acessos
- Ativação/desativação de contas

## 🛠️ Tecnologias Utilizadas

### Frontend:
- HTML5
- CSS3 (Bootstrap 5.3.3)
- JavaScript (Vanilla)

### Backend:
- Node.js
- Express.js
- SQLite3 (Banco de dados)
- Supabase (Backend as a Service)
- PostgreSQL (Através do Supabase)


## 👥 Perfis de Acesso

### Administrador
- Acesso total ao sistema
- Gerenciamento de usuários
- Configurações avançadas

### Usuário Comum
- Acesso ao dashboard
- Registro de produtos e vendas
- Visualização de relatórios

## 🔒 Segurança
- Autenticação de usuários
- Proteção contra acesso não autorizado
- Políticas de segurança no banco de dados
- Gerenciamento de sessões

## 💾 Banco de Dados

### Tabelas Principais
- `produtos`: Cadastro e controle de estoque
- `vendas`: Registro de vendas realizadas
- `despesas`: Controle de despesas
- `users`: Gerenciamento de usuários

## 📱 Responsividade
- Interface adaptável para diferentes dispositivos
- Design responsivo com Bootstrap
- Navegação otimizada para mobile

## ⚠️ Notas Importantes
- Sistema desenvolvido para uso interno
- Mantenha backups regulares do banco de dados
- Atualize senhas periodicamente


## 📄 Licença
Este projeto é de código aberto sob licença Luar Cosméticos.