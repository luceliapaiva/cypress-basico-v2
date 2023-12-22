/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('Verifica o titulo da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longTest = 'Estou amando Cypress,Estou amando Cypress,Estou amando Cypress,Estou amando Cypress'

        cy.get('#firstName').type('Lucelia')
        cy.get('#lastName').type('Paiva')
        cy.get('#email').type('paivaluce@gmail.com')
        cy.get('#open-text-area').type(longTest, { delay: 0 })
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formato inválido', function () {
        cy.get('#firstName').type('Lucelia')
        cy.get('#lastName').type('Paiva')
        cy.get('#email').type('paivaluce@gmail,com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchidocom valor não-númerico', function () {
        cy.get('#phone')
            .type('.abcdefghijlmn')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é inserido ', function () {
        cy.get('#firstName').type('Lucelia')
        cy.get('#lastName').type('Paiva')
        cy.get('#email').type('paivaluce@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preencher e limpar os campos nome, sobrenome,email etelefone', function () {
        cy.get('#firstName')
            .type('Lucélia')
            .should('have.value', 'Lucélia')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Paiva')
            .should('have.value', 'Paiva')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('paivaluce@gmail.com')
            .should('have.value', 'paivaluce@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('11978787878')
            .should('have.value', '11978787878')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area')
            .type('teste')
            .should('have.value', 'teste')
            .clear()
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é inserido ', function () {
        cy.get('#firstName').type('Lucelia')
        cy.get('#lastName').type('Paiva')
        cy.get('#email').type('paivaluce@gmail.com')
        cy.get('#phone-checkbox').check()   //mudei de click para check
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessar a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })
})


