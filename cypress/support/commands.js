Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    const longText = 'Validando teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste '
    cy.get('#firstName').type('Aristolfo', {delay: 0}) 
    cy.get('#lastName').type('Josemundo Cardoso', {delay: 0})
    cy.get('#email').type('joca@gmail.com', {delay: 0})
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()
})