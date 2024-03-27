/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Validando teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste '
        cy.get('#firstName').type('Aristolfo', {delay: 0}) 
        cy.get('#lastName').type('Josemundo Cardoso', {delay: 0})
        cy.get('#email').type('joca@gmail.com', {delay: 0})
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Aristolfo', {delay: 0}) 
        cy.get('#lastName').type('Josemundo Cardoso', {delay: 0})
        cy.get('#email').type('joca@,com', {delay: 0})
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
    })

    it ('Campo telefone continua vazio quando preenchido com valor nao numerico', function(){
    cy.get('#phone')
        .type('fsefsefesf#$%#')
        .should ('have.value', '')
    })

    it ('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function (){
        const longText = 'Validando teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste '
        cy.get('#firstName').type('Aristolfo', {delay: 0}) 
        cy.get('#lastName').type('Josemundo Cardoso', {delay: 0})
        cy.get('#email').type('joca@gmail.com', {delay: 0})
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')

    })

    it ('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Aristolfo', {delay: 0})
            .should ('have.value', 'Aristolfo')
            .clear()
            .should ('have.value','')

            cy.get('#lastName')
            .type('Josemundo Cardoso', {delay: 0})
            .should ('have.value', 'Josemundo Cardoso')
            .clear()
            .should ('have.value','')

            cy.get('#email')
            .type('email@lover.com', {delay: 0})
            .should ('have.value', 'email@lover.com')
            .clear()
            .should ('have.value','')

            cy.get('#phone')
            .type('12345678', {delay: 0})
            .should ('have.value', '12345678')
            .clear()
            .should ('have.value','')

            cy.get('#open-text-area')
            .type('teste testando testado', {delay: 0})
            .should ('have.value', 'teste testando testado')
            .clear()
            .should ('have.value','')
    })

    it ('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it ('envia o formuário com sucesso usando um comando customizado',function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it ('encontra um objeto que contenha argumento button e um segundo argumento com texto enviar', function() {
        const longText = 'Validando teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste '
        cy.get('#firstName').type('Aristolfo', {delay: 0}) 
        cy.get('#lastName').type('Josemundo Cardoso', {delay: 0})
        cy.get('#email').type('joca@gmail.com', {delay: 0})
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button','Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it ('seleciona um produto (YouTube) por seu texto',function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it ('seleciona um produto (Mentoria) por seu valor (value)',function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it ('seleciona um produto (Blog) por seu índice',function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it ('marca o tipo de atendimento "Feedback',function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')
    })

    it ('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should ('be.checked')
            })
     })

     it ('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .check().should('be.checked')
            .last()
            .uncheck()
            .should ('not.be.checked')
     })

     it ('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário (utilizando check)', function (){
        const longText = 'Validando teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste  teste '
        cy.get('#firstName').type('Aristolfo', {delay: 0}) 
        cy.get('#lastName').type('Josemundo Cardoso', {delay: 0})
        cy.get('#email').type('joca@gmail.com', {delay: 0})
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')

    })

    //sessão de uploads de arquivos pulado

    it ('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')

    })

    it ('acessa a página da política de privacidade removendo o target e então clicando no link',function(){
        cy.get('#privacy a')
        .invoke ('removeAttr','target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

    // sessão de dimensões pulado
    
})


