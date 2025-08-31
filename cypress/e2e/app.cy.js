/// <reference types="cypress" />

describe('App.vue', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('renders the Vite logo with correct link and alt', () => {
    cy.get('a[href="https://vite.dev"]')
      .find('img.logo')
      .should('have.attr', 'alt', 'Vite logo')
      // Don't check for src, as it may be inlined
  })

  it('renders the Vue logo with correct link and alt', () => {
    cy.get('a[href="https://vuejs.org/"]')
      .find('img.logo.vue')
      .should('have.attr', 'alt', 'Vue logo')
      // Don't check for src, as it may be inlined
  })
})