const USER_TOKEN = Cypress.env('USER_TOKEN');
const USER_NAME = Cypress.env('USER_NAME');
const USER_DETAILS = {
  name: Cypress.env('USER_NAME'),
  email: Cypress.env('USER_EMAIL'),
};

context('logged in user', () => {
  beforeEach(() => {
    localStorage.setItem('token', JSON.stringify(USER_TOKEN));
    localStorage.setItem('userDetails', JSON.stringify(USER_DETAILS));
    expect(localStorage.getItem('token')).to.exist;
    expect(localStorage.getItem('userDetails')).to.exist;
  });

  it('should be able to view their own credits', () => {
    cy.visit(`/profiles/?name=${USER_NAME}`);
    cy.get('#profileFunds').should('exist');
  });

  it('should not be able to view others credits', () => {
    cy.visit(`/profiles/?name=Jay`);
    cy.get('#profileFunds').should('exist').and('be.empty');
  });
});

context('unauthorized user', () => {
  it('should not be able to view their credits, or be able to view profile page, but instead be redirected to login page', () => {
    cy.intercept('GET', '/auth/?form=login').as('redirect');
    cy.on('uncaught:exception', (err) => {
      expect(err.message).to.include(
        "Cannot read properties of null (reading 'name')"
      );
      return false;
    });
    cy.visit(`/profiles/?name=${USER_NAME}`);
    cy.wait('@redirect').then(() => {
      cy.location().should((location) =>
        expect(location.pathname).to.equal('/auth/')
      );
    });
  });
});
