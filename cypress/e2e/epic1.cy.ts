describe('epic 1 user story 1-1', () => {
    beforeEach(()=>{
      //cy.visit('https://restaurantca.vercel.app')
      cy.visit('http://localhost:3000')
      cy.wait(6000)
      cy.get('[data-test="login-btn"]').click()
      cy.get('#input-email-for-credentials-provider').type("bunmee@gmail.com")
      cy.get('#input-password-for-credentials-provider').type("admin123")
      cy.get('.provider').find('button').click()
      cy.wait(6000)
    })
  
    it('TC-1 search with existing retaurant name & correct price range', () => {
      cy.get('.topmenu_itemcontainer__xd8j8').contains('Restaurant').click()
      cy.wait(4000)
      cy.get('[data-test="search-bar"]').type('Terry Crooks')
      cy.get('select[id="min"]').select(2) //value in index 2 option is 3
      cy.get('select[id="max"]').select(1) //value in index 1 option is 4
      cy.get('[data-test="search-submit"]').click()
      // cy.intercept("GET", `${process.env.BACKEND_URL}/api/v1/restaurants/search/:search?restaurantName=Terry Crooks&minPrice=3&maxPrice=4`, {
      //   fixture: 'tc1search.json'
      // })
      cy.wait(2000)
      cy.get('[data-test="restaurant-card-name"]').contains('Terry Crooks')
      cy.get('[data-test="catalog-div"]').children().should('have.length', 1).each(($child) => {
        cy.get('[data-test="price-range"]').should('contain', '$$$')
        cy.get('[data-test="price-range"]').should('not.contain', '$$$$$')
      })
    })
  
    it('TC-2 search with empty text', () => {
      cy.get('.topmenu_itemcontainer__xd8j8').contains('Restaurant').click()
      cy.wait(4000)
      cy.get('select[id="min"]').select(2) //value in index 2 option is 3
      cy.get('select[id="max"]').select(2) //value in index 2 option is 3
      cy.get('[data-test="search-submit"]').click()
      // cy.intercept("GET", `${process.env.BACKEND_URL}/api/v1/restaurants/search/:search?restaurantName=&minPrice=3&maxPrice=3`, {
      //   fixture: 'tc2search.json'
      // })
      cy.wait(2000)
      cy.get('[data-test="catalog-div"]').children().should('have.length', 3).each(($child) => {
        cy.wrap($child).should('contain', '$$$')
        cy.wrap($child).should('not.contain', '$$$$')
      })
    })
  
    it('TC-3 search with partial string of existing retaurant name & correct price range', () => {
      cy.get('.topmenu_itemcontainer__xd8j8').contains('Restaurant').click()
      cy.wait(4000)
      cy.get('[data-test="search-bar"]').type('Teenoi')
      cy.get('select[id="min"]').select(4) //value in index 4 option is 5
      cy.get('[data-test="search-submit"]').click()
      // cy.intercept("GET", `${process.env.BACKEND_URL}/api/v1/restaurants/search/:search?restaurantName=Teenoi&minPrice=5&maxPrice=5`, {
      //   fixture: 'tc3search.json'
      // })
      cy.wait(2000)
      cy.get('[data-test="catalog-div"]').children().should('have.length', 1).each(($child) => {
        cy.get('[data-test="price-range"]').should('have.text', '$$$$$')
      })
    })
    
    it('TC-4 search with partial string of existing retaurant name but incorrect price range', () => {
      cy.get('.topmenu_itemcontainer__xd8j8').contains('Restaurant').click()
      cy.wait(4000)
      cy.get('[data-test="search-bar"]').type('Teenoi')
      cy.get('select[id="max"]').select(3) //value in index 3 option is 2
      cy.get('[data-test="search-submit"]').click()
      cy.wait(2000)
      cy.get('[data-test="catalog-div"]').children().should('have.length', 0)
    })
    
    it('TC-5 search with non-existing restaurant name', () => {
      cy.get('.topmenu_itemcontainer__xd8j8').contains('Restaurant').click()
      cy.wait(4000)
      cy.get('[data-test="search-bar"]').type('aefkgnaeign')
      cy.get('[data-test="search-submit"]').click()
      cy.wait(2000)
      cy.get('[data-test="catalog-div"]').children().should('have.length', 0)
    })
  
    it('TC-6 search with empty text', () => {
      cy.get('.topmenu_itemcontainer__xd8j8').contains('Restaurant').click()
      cy.wait(4000)
      cy.get('select[id="min"]').select(1) //value in index 1 option is 2
      cy.get('select[id="max"]').select(1) //value in index 1 option is 4
      cy.get('[data-test="search-submit"]').click()
      // cy.intercept("GET", `${process.env.BACKEND_URL}/api/v1/restaurants/search/:search?restaurantName=&minPrice=2&maxPrice=4`, {
      //   fixture: 'tc6search.json'
      // }) 
      cy.wait(2000)
      cy.get('[data-test="catalog-div"]').children().should('have.length', 10)
      .each(($child) => {
        cy.get('[data-test="price-range"]').should('contain', '$$')
        cy.get('[data-test="price-range"]').should('not.contain', '$$$$$')
      })
    })
  
    it('TC-7 search with incorrect price range', () => {
      cy.get('.topmenu_itemcontainer__xd8j8').contains('Restaurant').click()
      cy.wait(4000)
      cy.get('select[id="min"]').select(3) //value in index 3 option is 4
      cy.get('select[id="max"]').select(2) //value in index 2 option is 3
      cy.get('[data-test="search-submit"]').click()
      cy.wait(2000)
      cy.get('[data-test="catalog-div"]').children().should('have.length', 0)
    })
   
    // it('search with partial of restaurant name', () => {
    //   cy.get('.topmenu_itemcontainer__xd8j8').contains('Restaurant').click()
    //   cy.wait(4000)
    //   cy.get('[data-test="search-bar"]').type('r')
    //   cy.get('[data-test="search-submit"]').click()
    //   cy.get('[data-test="catalog-div"]').children().should('have.length', 0)
    // })
  })
  
  describe('epic 1 user story 1-2', () => {
    beforeEach(()=>{
      //cy.visit('https://restaurantca.vercel.app')
      cy.visit('http://localhost:3000')
      cy.wait(6000)
      cy.get('[data-test="login-btn"]').click()
      cy.get('#input-email-for-credentials-provider').type("bunmee@gmail.com")
      cy.get('#input-password-for-credentials-provider').type("admin123")
      cy.get('.provider').find('button').click()
      cy.wait(6000)
    })
  
    it('TC-8 show review if there is existing review', () => {
        cy.get('.topmenu_itemcontainer__xd8j8').contains('Restaurant').click()
        cy.wait(4000)
        cy.get('[data-test="restaurant-link-Kot Shop"]').click()
        cy.get('[data-test="review-card"]').should('exist')
    })

    it('TC-9 show no review if there is no exist review', () => {
        cy.get('.topmenu_itemcontainer__xd8j8').contains('Restaurant').click()
        cy.wait(4000)
        cy.get('[data-test="restaurant-link-The Cozy Cauldron"]').click()
        cy.get('[data-test="review-card"]').should('not.exist')
    })

    it('TC-10 comment with non-empty comment', () => {
        cy.get('.topmenu_itemcontainer__xd8j8').contains('Restaurant').click()
        cy.wait(4000)
        cy.get('[data-test="restaurant-link-Kot Shop"]').click()
        cy.get('[data-test="comment-text"]').type('Good job')
        cy.get('select[id="rating"]').select(2) //value in index 2 option is 3
        cy.get('[data-test="submit-review"]').click()
        cy.wait(2000)
        cy.get('[data-test="rating-3"]').should('exist')
        cy.get('[data-test="comment-Good job"]').should('exist') 
    })

    it('TC-11 comment with empty comment', () => {
        cy.get('.topmenu_itemcontainer__xd8j8').contains('Restaurant').click()
        cy.wait(4000)
        cy.get('[data-test="restaurant-link-Kot Shop"]').click()
        cy.get('select[id="rating"]').select(3) //value in index 3 option is 4
        cy.get('[data-test="submit-review"]').click()
        cy.wait(2000)
        cy.get('[data-test="rating-4"]').should('exist')
        cy.get('[data-test="comment- "]').should('exist') 
    })
  })

  describe('epic 1 user story 1-3', () => {
    beforeEach(()=>{
      //cy.visit('https://restaurantca.vercel.app')
      cy.visit('http://localhost:3000')
      cy.wait(6000)
      cy.get('[data-test="login-btn"]').click()
      cy.get('#input-email-for-credentials-provider').type("bunmee@gmail.com")
      cy.get('#input-password-for-credentials-provider').type("admin123")
      cy.get('.provider').find('button').click()
      cy.wait(6000)
    })
  
    it('TC-12 Every restaurant on the listing page displays a price range indicator.', () => {
        cy.get('.topmenu_itemcontainer__xd8j8').contains('Restaurant').click()
        cy.wait(4000)
        cy.get('[data-test="catalog-div"]').children().each(($child) => {
            cy.wrap($child).should('contain', '$')
          })
    })

    it('TC-13 The specific restaurant page does not display a price range indicator.', () => {
        cy.get('.topmenu_itemcontainer__xd8j8').contains('Restaurant').click()
        cy.wait(4000)
        cy.get('[data-test="restaurant-link-The Cozy Cauldron"]').click()
        cy.wait(3000)
        cy.get('div').contains('$').should('not.exist')
    })

    it('TC-14 display price range indicator correctly', () => {
        cy.get('.topmenu_itemcontainer__xd8j8').contains('Restaurant').click()
        cy.wait(4000)
        cy.get('select[id="min"]').select(1) //value in index 1 option is 2
        cy.get('select[id="max"]').select(3) //value in index 3 option is 2
        cy.get('[data-test="search-submit"]').click()
        // cy.intercept("GET", `${process.env.BACKEND_URL}/api/v1/restaurants/search/:search?restaurantName=&minPrice=3&maxPrice=3`, {
        //   fixture: 'tc2search.json'
        // })
        cy.wait(2000)
        cy.get('[data-test="catalog-div"]').children().each(($child) => {
          cy.get('[data-test="price-range"]').should('not.have.text', '$')
          cy.get('[data-test="price-range"]').should('contain', '$$')
          cy.get('[data-test="price-range"]').should('not.have.text', '$$$')
          cy.get('[data-test="price-range"]').should('not.have.text', '$$$$')
          cy.get('[data-test="price-range"]').should('not.have.text', '$$$$$')
        })
    })
  })