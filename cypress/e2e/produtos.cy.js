describe('Cadastro de Produtos', () => {
    beforeEach(() => {
        cy.login()
        
        // Preserva o token entre os testes
        cy.window().then((win) => {
            const token = win.sessionStorage.getItem('token')
            cy.visit('/produtos.html', {
                onBeforeLoad: (win) => {
                    win.sessionStorage.setItem('token', token)
                }
            })
        })
        
        // Aguarda a página carregar completamente
        cy.get('#formProduto').should('be.visible')
    })

    it('deve cadastrar 10 produtos', () => {
        const produtos = [
            { nome: 'Shampoo', quantidade: 50, preco: 29.90 },
            { nome: 'Condicionador', quantidade: 45, preco: 32.90 },
            { nome: 'Máscara', quantidade: 30, preco: 45.90 },
            { nome: 'Óleo Capilar', quantidade: 25, preco: 39.90 },
            { nome: 'Creme', quantidade: 60, preco: 24.90 },
            { nome: 'Leave-in', quantidade: 40, preco: 34.90 },
            { nome: 'Sérum', quantidade: 35, preco: 49.90 },
            { nome: 'Protetor', quantidade: 45, preco: 37.90 },
            { nome: 'Pomada', quantidade: 30, preco: 28.90 },
            { nome: 'Spray', quantidade: 40, preco: 31.90 }
        ]

        produtos.forEach((produto, index) => {
            cy.log(`Cadastrando produto ${index + 1}: ${produto.nome}`)
            cy.cadastrarProduto(produto)
        })

        // Verifica se os produtos foram adicionados
        cy.get('#tabelaProdutos tr').should('have.length.at.least', 10)
    })
})