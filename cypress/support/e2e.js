// Importação do arquivo de comandos
import './commands'

// Configurações globais do Cypress
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})