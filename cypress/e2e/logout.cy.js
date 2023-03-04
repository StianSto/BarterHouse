const USER_TOKEN = Cypress.env('USER_TOKEN');
const USER_DETAILS = {
  name: Cypress.env('USER_NAME'),
  email: Cypress.env('USER_EMAIL'),
};

context('logging out', () => {
  beforeEach(() => {
    cy.intercept('GET', '/').as('redirect');

    localStorage.setItem('token', JSON.stringify(USER_TOKEN));
    localStorage.setItem('userDetails', JSON.stringify(USER_DETAILS));
    expect(localStorage.getItem('token')).to.exist;
    expect(localStorage.getItem('userDetails')).to.exist;

    cy.visit('/');
  });

  afterEach(() => {
    cy.wait('@redirect').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      expect(localStorage.getItem('token')).not.to.exist;
      expect(localStorage.getItem('userDetails')).not.to.exist;
    });
  });

  it('a logged in user should be able to logout', () => {
    cy.get('#navProfile').click();
    cy.get('.dropdown-menu[data-bs-popper="static"]')
      .should('be.visible')
      .within(() => {
        cy.get('li[data-logout]').click();
      });
  });

  it('a logged in user should be able to logout on mobile view', () => {
    cy.viewport(400, 800);
    cy.get('[data-bs-target="#navbarSupportedContent"]').click();
    cy.get('#navProfileMobile')
      .should('be.visible')
      .within(() => {
        cy.get('[data-logout]').click();
      });
  });
});
