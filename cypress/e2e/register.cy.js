const USER_EMAIL = Cypress.env('USER_EMAIL');
const USER_PASSWORD = Cypress.env('USER_PASSWORD');
const USER_NAME = Cypress.env('USER_NAME');

context('registration tests', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/v1/auction/auth/register').as(
      'registerResponse'
    );
    cy.visit('/auth/?form=register');
  });

  it('shows an error message when users enters an email that does not match the pattern format', () => {
    cy.get('input[name="name"]').as('nameInput').type(Cypress.env('USER_NAME'));
    cy.get('input[name="email"]').as('emailInput').type('someones@gmail.com');
    cy.get('input[name="password"]')
      .as('passwordInput')
      .type(Cypress.env('USER_PASSWORD'));

    cy.get('form#register').submit();
    cy.wait('@registerResponse').then((interception) => {
      expect(interception.response.statusCode).to.eq(400);
    });
    cy.get('#errMsg').should(
      'contain',
      'Only noroff.no emails are allowed to register'
    );
  });

  it('shows an error message when users enters credentials of a user that already exists', () => {
    cy.get('input[name="name"]').as('nameInput').type(Cypress.env('USER_NAME'));
    cy.get('input[name="email"]')
      .as('emailInput')
      .type(Cypress.env('USER_EMAIL'));
    cy.get('input[name="password"]')
      .as('passwordInput')
      .type(Cypress.env('USER_PASSWORD'));

    cy.get('form#register').submit();
    cy.wait('@registerResponse').then((interception) => {
      expect(interception.response.statusCode).to.eq(400);
    });
    cy.get('#errMsg').should('contain', 'Profile already exists');
  });

  it('registers a user, uses the credential to log them in, saves token to storage and redirects them to home page', () => {
    cy.clearLocalStorage();
    cy.intercept('GET', '/').as('redirect');
    cy.intercept('POST', '/api/v1/auction/auth/register', {
      fixture: 'register200.json',
    }).as('registerResponse');
    cy.get('input[name="name"]').as('nameInput').type(Cypress.env('USER_NAME'));
    cy.get('input[name="email"]')
      .as('emailInput')
      .type(Cypress.env('USER_EMAIL'));
    cy.get('input[name="password"]')
      .as('passwordInput')
      .type(Cypress.env('USER_PASSWORD'));

    cy.get('form#register').submit();
    cy.wait('@registerResponse');
    cy.wait('@redirect').then(() => {
      expect(localStorage.getItem('token')).to.exist;
      expect(localStorage.getItem('userDetails')).to.exist;
    });
  });
});
