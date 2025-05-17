# Luar Cosméticos - Sistema de Gestão

## 📋 Sobre o Projeto
Sistema web desenvolvido para gerenciamento interno da Luar Cosméticos, permitindo controle de produtos, vendas, caixa, despesas e relatórios financeiros.

## 📦 Instalação e Uso

1. **Clone o Repositório**
```bash
git clone [URL_DO_REPOSITÓRIO]
cd luarr_control
```

2. **Instale as Dependências**
```bash
npm install
```

3. **Inicie o Servidor**
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

## 🚀 Funcionalidades

### 🔐 Autenticação e Segurança
- Sistema de login seguro
- Gerenciamento de usuários (apenas para administradores)
- Proteção de rotas para usuários não autenticados

### 📊 Módulos Principais

#### 1. Dashboard
- Visão geral do sistema
- Resumo de produtos cadastrados
- Informações financeiras em tempo real
- Gráficos de desempenho

#### 2. Produtos
- Cadastro e edição de produtos
- Gerenciamento de estoque automatizado
- Sistema de alertas de estoque baixo
- Histórico de movimentações

#### 3. Vendas
- Registro de vendas com interface intuitiva
- Desconto automático no estoque
- Múltiplos produtos por venda
- Cálculo automático do total
- Diferentes formas de pagamento (Dinheiro, Cartão, PIX)
- Histórico completo de vendas
- Filtros avançados por data e forma de pagamento
- Visualização detalhada de cada venda

#### 4. Caixa
- **Novo**: Controle diário de caixa
- **Novo**: Totalizadores por forma de pagamento
- **Novo**: Visualização de movimentações do dia
- **Novo**: Filtros por data específica
- **Novo**: Relatório detalhado de vendas

#### 5. Despesas
- Registro de despesas
- Categorização automática
- Acompanhamento financeiro
- Análise de gastos

#### 6. Relatórios
- Relatórios financeiros detalhados
- Análise de vendas e despesas
- Estatísticas do negócio
- Exportação de dados

#### 7. Administração
- Gerenciamento de usuários
- Controle de acessos
- Configurações do sistema
- Backup de dados

## 🛠️ Tecnologias Utilizadas

### Frontend:
- HTML5
- CSS3 (Bootstrap 5.3.3)
- JavaScript (Vanilla)
- Responsividade Mobile-First

### Backend:
- Node.js
- Express.js
- SQLite3 (Banco de dados local)
- Nodemon (Desenvolvimento)

## 💾 Estrutura do Banco de Dados

### Tabelas
- `produtos`: Gerenciamento de produtos e estoque
- `vendas`: Registro de vendas e itens
- `despesas`: Controle financeiro
- `users`: Administração de usuários

## 👥 Perfis de Acesso

### Administrador
- Acesso completo ao sistema
- Gerenciamento de usuários
- Configurações avançadas
- Relatórios gerenciais

### Usuário Comum
- Registro de vendas
- Consulta de produtos
- Movimentação de caixa
- Visualização de relatórios básicos

## 🔒 Segurança
- Autenticação segura
- Proteção contra acessos não autorizados
- Validação de dados
- Controle de sessão

## 📱 Responsividade
- Design responsivo
- Interface adaptável
- Otimizado para dispositivos móveis
- Experiência consistente em todas as telas

## ⚠️ Requisitos do Sistema
- Node.js >= 18.0.0
- NPM >= 9.0.0
- Navegador moderno
- 512MB RAM (mínimo)
- 1GB de espaço em disco

## 🔄 Atualizações Recentes
- Adição do módulo de Caixa
- Melhorias na interface de vendas
- Otimização do banco de dados
- Correções de bugs

## 📄 Licença
Este projeto é proprietário da Luar Cosméticos.
Todos os direitos reservados.