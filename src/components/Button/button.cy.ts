import { mount } from 'cypress/vue'
import Button from './Button.vue'
import ButtonE2e from './Button.e2e.vue'

describe('<Button />', () => {
  it('renders all variants in ButtonE2e', () => {
    mount(ButtonE2e)
    cy.get('button').should('have.length', 3)
    cy.get('button').eq(0).should('contain.text', 'Primary')
    cy.get('button').eq(1).should('contain.text', 'Neutral')
    cy.get('button').eq(2).should('contain.text', 'Subtle')
  })

  it('renders with default props', () => {
    mount(Button)
    cy.get('button').should('exist')
  })

  it('displays the correct label', () => {
    mount(Button, { slots: { default: 'Click Me' } })
    cy.get('button').should('contain.text', 'Click Me')
  })

  it('emits click event when clicked', () => {
    const onClick = cy.stub().as('clickHandler')
    mount(Button, {
      slots: { default: 'Click Me' },
      attrs: { onClick },
    })
    cy.get('button').click()
    cy.get('@clickHandler').should('have.been.calledOnce')
  })

  it('is disabled when disabled prop is true', () => {
    mount(Button, {
      props: { disabled: true },
      slots: { default: 'Disabled' },
    })
    cy.get('button').should('be.disabled')
  })

  it('applies custom class', () => {
    mount(Button, {
      attrs: { class: 'custom-class' },
      slots: { default: 'Styled' },
    })
    cy.get('button').should('have.class', 'custom-class')
  })

  it('renders slot content', () => {
    mount(Button, {
      slots: { default: '<span>Slot Content</span>' },
    })
    cy.get('button').should('contain.text', 'Slot Content')
    cy.get('button span').should('exist')
  })
})
