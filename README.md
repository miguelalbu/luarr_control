# Luar Cosméticos - Sistema de Gestão

## 📋 Sobre o Projeto
Sistema web desenvolvido para gerenciamento interno da Luar Cosméticos, permitindo controle de produtos, despesas e relatórios financeiros.

## 🚀 Funcionalidades

### 🔐 Autenticação e Segurança
- Sistema de login seguro
- Gerenciamento de usuários (apenas para administradores)
- Proteção de rotas para usuários não autenticados

### 📊 Módulos Principais
1. **Dashboard**
   - Visão geral do sistema
   - Resumo de produtos cadastrados
   - Informações financeiras

2. **Produtos**
   - Cadastro de produtos
   - Gerenciamento de estoque
   - Listagem e edição

3. **Despesas**
   - Registro de despesas
   - Categorização
   - Acompanhamento financeiro

4. **Relatórios**
   - Relatórios financeiros
   - Análise de despesas
   - Estatísticas do negócio

5. **Administração**
   - Gerenciamento de usuários
   - Controle de acessos
   - Ativação/desativação de contas

## 🛠️ Tecnologias Utilizadas

- **Frontend:**
  - HTML5
  - CSS3 (Bootstrap 5.3.3)
  - JavaScript (Vanilla)

- **Backend/Banco de Dados:**
  - Supabase (Backend as a Service)
  - PostgreSQL (através do Supabase)

## 📥 Instalação e Uso

1. **Pré-requisitos**
   - Servidor web local (pode usar Live Server do VS Code)
   - Conexão com internet (para acessar Supabase)

2. **Configuração**
   ```bash
   # Clone o repositório
   git clone [URL_DO_REPOSITÓRIO]

   # Acesse a pasta do projeto
   cd luarr_control
   ```

3. **Executando o Sistema**
   - Abra o arquivo `index.html` usando um servidor web
   - Faça login com suas credenciais
   - Para acesso administrativo, use uma conta com permissões de admin

## 👤 Perfis de Acesso

1. **Administrador**
   - Acesso total ao sistema
   - Gerenciamento de usuários
   - Configurações avançadas

2. **Usuário Comum**
   - Acesso ao dashboard
   - Registro de produtos e despesas
   - Visualização de relatórios

## 🔒 Segurança

- Autenticação via Supabase
- Proteção contra acesso não autorizado
- Políticas de segurança no banco de dados
- Gerenciamento de sessões

## ⚙️ Configuração do Supabase

1. **Tabelas Principais**
   - users (gerenciamento de usuários)
   - produtos (cadastro de produtos)
   - despesas (registro de despesas)

2. **Políticas de Segurança**
   - Controle de acesso por função
   - Restrições de leitura/escrita
   - Proteção de dados sensíveis

## 📱 Responsividade
- Interface adaptável para diferentes dispositivos
- Design responsivo com Bootstrap
- Navegação otimizada para mobile

## 🤝 Contribuição
Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Faça commit das alterações
4. Push para a branch
5. Abra um Pull Request

## ⚠️ Notas Importantes
- Sistema desenvolvido para uso interno
- Necessário configurar emails administrativos
- Manter backups regulares dos dados
- Atualizar senhas periodicamente

## 📄 Licença
Este projeto está sob a licença de
Miguel Albuquerque