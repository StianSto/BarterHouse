/// <reference types="Cypress" />

const USER_TOKEN = Cypress.env('USER_TOKEN');
const USER_DETAILS = {
  email: Cypress.env('USER_EMAIL'),
  name: Cypress.env('USER_NAME'),
  avatar: Cypress.env('USER_AVATAR'),
};

context('authorized users', () => {
  beforeEach(() => {
    localStorage.setItem('token', JSON.stringify(USER_TOKEN));
    localStorage.setItem('userDetails', JSON.stringify(USER_DETAILS));
    cy.visit('/listings/?view=newest');
    cy.get('.listing').first().click();
    cy.wait(500);
  });

  it('create a bid', () => {
    cy.location('search').then((search) => {
      const params = new URLSearchParams(search);
      const id = params.get('id');

      cy.intercept(
        'POST',
        `https://api.noroff.dev/api/v1/auction/listings/${id}/bids?_seller=true&_bids=true`
      ).as('addBid');
    });

    cy.get('input[name="amount"]').type('{upArrow}');
    cy.get('form#addBid').submit();
    cy.wait('@addBid').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  });
  it('can see all bids made on item', () => {
    cy.get('button[data-bs-target="#listingDetailsHistory"]').click();
    cy.get('#bidHistory').should('be.visible');
  });
});

context('unauthorized user', () => {
  beforeEach(() => {
    cy.clearAllLocalStorage();
    cy.visit('/listings/?view=newest');
    cy.get('.listing').first().click();
    cy.wait(500);
  });

  it('can NOT make a bid on a item', () => {
    cy.get('input[name="amount"]').should('not.exist');
  });

  it('can NOT see all bids made on item', () => {
    cy.get('button[data-bs-target="#listingDetailsHistory"]').click();
    cy.get('#bidHistory').should('be.empty');
  });
});
