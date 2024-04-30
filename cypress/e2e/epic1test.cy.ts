describe('epic 1 user story 1-1', () => {
  beforeEach(()=>{
    cy.visit('https://restaurantca.vercel.app')
    //cy.visit('http://localhost:3000')
    cy.wait(6000)
    cy.get('[data-test="login-btn"]').click()
    cy.get('#input-email-for-credentials-provider').type("bunmee@gmail.com")
    cy.get('#input-password-for-credentials-provider').type("admin123")
    cy.get('.provider').find('button').click()
    cy.wait(6000)
  })

  it('TC-1 search with existing retaurant name & correct price range', () => {
    cy.get('.topmenu_itemcontainer__xd8j8').contains('Restaurant').click()
    cy.wait(6000)
    cy.get('[data-test="search-bar"]').type('Terry Crooks')
    cy.get('select[id="min"]').select(2) //value in index 2 option is 3
    cy.get('select[id="max"]').select(1) //value in index 1 option is 4
    cy.get('[data-test="search-submit"]').click()
    cy.intercept("GET", `${process.env.BACKEND_URL}/api/v1/restaurants`, {
      fixture: 'restaurantMock.json'
    })
    cy.wait(2000)
    cy.get('[data-test="restaurant-card-name"]').contains('Terry Crooks')
    cy.get('[data-test="price-range"]').should('contain', '$$$')
    cy.get('[data-test="price-range"]').should('not.contain', '$$$$$')
    cy.get('[data-test="catalog-div"]').children().should('have.length', 1)
  })

  it('TC-2 search with empty text', () => {
    cy.get('.topmenu_itemcontainer__xd8j8').contains('Restaurant').click()
    cy.wait(6000)
    cy.get('select[id="min"]').select(2) //value in index 2 option is 3
    cy.get('select[id="max"]').select(2) //value in index 2 option is 3
    cy.get('[data-test="search-submit"]').click()
    cy.intercept("GET", `${process.env.BACKEND_URL}/api/v1/restaurants`, {
      fixture: 'restaurantMock.json'
    })
    cy.wait(2000)
    cy.get('[data-test="catalog-div"]').children().should('have.length', 2)
    cy.get('[data-test="price-range"]').should('have.text', '$$$')
  })

  it.only('TC-3 search with partial string of existing retaurant name & correct price range', () => {
    cy.get('.topmenu_itemcontainer__xd8j8').contains('Restaurant').click()
    cy.wait(6000)
    cy.get('[data-test="search-bar"]').type('Teenoi')
    cy.get('select[id="min"]').select(4) //value in index 4 option is 5
    cy.get('select[id="max"]').select(0) //value in index 0 option is 5
    cy.get('[data-test="search-submit"]').click()
    cy.intercept("GET", `${process.env.BACKEND_URL}/api/v1/restaurants/search/:search?restaurantName=Teenoi&minPrice=5&maxPrice=5`, {
      fixture: 'restaurantMock.json'
    })
    cy.wait(2000)
    cy.get('[data-test="catalog-div"]').children().should('have.length', 1)
    cy.get('[data-test="price-range"]').should('have.text', '$$$$$')
  })
  
  it('TC- search with invalid restaurant name', () => {
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

describe('epic 1 user story 1-2', () => {
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

  })
})