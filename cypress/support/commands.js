// Comandos personalizados do Cypress
Cypress.Commands.add('login', () => {
    cy.log('Iniciando processo de login...')
    
    // Visita a página inicial
    cy.visit('/')
    
    // Aguarda a página carregar
    cy.wait(1000)
    
    // Insere as credenciais
    cy.get('#inputEmail')
        .should('be.visible')
        .type('miguel.albu14@outlook.com', { force: true })
    
    cy.get('#inputPassword')
        .should('be.visible')
        .type('guel1410', { force: true })
    
    // Submete o formulário
    cy.get('#loginForm').submit()
    
    // Aguarda o redirecionamento
    cy.wait(2000)
    
    // Armazena o token na sessionStorage
    cy.window().then((win) => {
        cy.wrap(win.sessionStorage.getItem('token')).should('exist')
    })
})

Cypress.Commands.add('cadastrarProduto', (produto) => {
    // Verifica se está na página de produtos
    cy.url().should('include', '/produtos.html')
    
    // Aguarda o formulário estar visível
    cy.get('#formProduto').should('be.visible')
    
    // Preenche o formulário com os IDs corretos
    cy.get('#nome')
        .should('be.visible')
        .clear()
        .type(produto.nome)
    
    cy.get('#quantidade')
        .should('be.visible')
        .clear()
        .type(produto.quantidade)
    
    cy.get('#preco')
        .should('be.visible')
        .clear()
        .type(produto.preco)
    
    // Submete o formulário
    cy.get('#formProduto').submit()
    
    // Aguarda feedback
    cy.wait(1000)
})