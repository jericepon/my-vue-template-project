/// <reference types="cypress" />

describe('HelloWorld Component', () => {
  beforeEach(() => {
    // Adjust the URL if your dev server runs on a different port or path
    cy.visit('http://localhost:5173/')
  })

  it('renders the passed message', () => {
    cy.contains('h1', 'Vite + Vue')
  })

  it('increments the count when button is clicked', () => {
    cy.contains('button', 'count is 0').click()
    cy.contains('button', 'count is 1')
  })

  it('shows the edit message', () => {
    cy.contains('Edit').parent().contains('code', 'components/HelloWorld.vue')
  })

  it('shows the create-vue link', () => {
    cy.contains('a', 'create-vue').should('have.attr', 'href').and('include', 'vuejs.org/guide/quick-start.html')
  })

  it('shows the scaling up guide link', () => {
    cy.contains('a', 'Vue Docs Scaling up Guide').should('have.attr', 'href').and('include', 'vuejs.org/guide/scaling-up/tooling.html')
  })
})