Cypress.Commands.add('fillMandatoryFieldsSubmit', function () {
    cy.get('#firstName').type('Lucelia')
    cy.get('#lastName').type('Paiva')
    cy.get('#email').type('paivaluce@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button','Enviar').click()
})
