const query = 'a';

context('search', () => {
  it('unauthoreized users can search and view listings', () => {
    cy.visit('/listings/');

    cy.intercept(
      'GET',
      'https://api.noroff.dev/api/v1/auction/listings?sort=created&sortOrder=desc&limit=100&offset=100&_active=true&_bids=true'
    ).as('getListings');

    cy.get('#search input').type(query + '{enter}');
    cy.wait('@getListings').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
    cy.get('.listing').first().should('be.visible');
    cy.get('#filtersBadges').within(() => {
      cy.get('span').should('contain', `Search: ${query}`);
    });
  });
});
