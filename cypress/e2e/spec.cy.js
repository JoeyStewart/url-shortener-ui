describe('spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

describe('Get request for the APP', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', 
    {fixture: 'getFixture.json'}
    ).as('getURL')
    cy.visit('http://localhost:3000/')
    cy.wait('@getURL')
  })

  it('Should intercept and stub the API upon initial load', () => {
    cy.get('h1').contains('URL Shortener')
    cy.get('.url').should('have.length', 1)
    cy.get('.cards:first').should('contain', 'Awesome photo')
    cy.get('.cards:first').should('contain', 'http://localhost:3001/useshorturl/1')
    cy.get('.cards:first').should('contain', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
    cy.get('form').should('be.visible')
    cy.get('[name="urlToShorten"]').should('have.value', '')
    cy.get('[name="title"]').should('have.value', '')
  })

  it('Should post the new object to the server', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', 
    { fixture: 'postFixture.json'}
    ).as('postURL')
    cy.get('h1').contains('URL Shortener')
    cy.get('[name="title"]').type('Post Title')
    cy.get('[name="urlToShorten"]').type('https://example.cypress.io')
    cy.get('[name="title"]').should('have.value', 'Post Title')
    cy.get('[name="urlToShorten"]').should('have.value', 'https://example.cypress.io')
    cy.get('button').contains('Shorten Please').click()
    cy.wait('@postURL')
    cy.get('.url').should('have.length', 2)
    cy.get('.cards:first').should('contain', 'Awesome photo')
    cy.get('.cards:first').should('contain', 'http://localhost:3001/useshorturl/1')
    cy.get('.cards:first').should('contain', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
    cy.get('.cards:last').should('contain', 'Post Title')
    cy.get('.cards:last').should('contain', 'https://example.cypress.io')
    cy.get('.cards:last').should('contain', 'http://localhost:3001/useshorturl/2')
    cy.get('form').should('be.visible')
    cy.get('button').contains('Shorten Please')
    cy.get('[name="urlToShorten"]').should('have.value', '')
    cy.get('[name="title"]').should('have.value', '')
  })
})




