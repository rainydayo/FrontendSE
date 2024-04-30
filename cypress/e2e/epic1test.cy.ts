describe('epic 1 user story 1-1', () => {
  beforeEach(()=>{
    cy.visit('https://restaurantca.vercel.app')
    cy.wait(6000)
    cy.get('[data-test="login-btn"]').click()
    cy.get('#input-email-for-credentials-provider').type("bunmee@gmail.com")
    cy.get('#input-password-for-credentials-provider').type("admin123")
    cy.get('.provider').find('button').click()
    cy.wait(6000)
  })

  it('search with valid retaurant name', () => {
    cy.get('.topmenu_itemcontainer__xd8j8').contains('Restaurant').click()
    cy.wait(6000)
    cy.get('[data-test="search-bar"]').type('Terry Crooks')
    cy.get('[data-test="search-submit"]').click()
    cy.get('[data-test="restaurant-card-name"]').contains('Terry Crooks')
    cy.get('[data-test="catalog-div"]').children().should('have.length', 1)
  })
  
  it('search with invalid restaurant name', () => {
    cy.get('.topmenu_itemcontainer__xd8j8').contains('Restaurant').click()
    cy.wait(6000)
    cy.get('[data-test="search-bar"]').type('aefkgnaeign')
    cy.get('[data-test="search-submit"]').click()
    cy.get('[data-test="catalog-div"]').children().should('have.length', 0)
  })

  it('search with partial of restaurant name', () => {
    cy.get('.topmenu_itemcontainer__xd8j8').contains('Restaurant').click()
    cy.wait(6000)
    cy.get('[data-test="search-bar"]').type('r')
    cy.get('[data-test="search-submit"]').click()

  })
})