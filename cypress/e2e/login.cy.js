const USER_EMAIL = Cypress.env('USER_EMAIL');
const USER_PASSWORD = Cypress.env('USER_PASSWORD');
const USER_NAME = Cypress.env('USER_NAME');

context('authentication forms', () => {
  beforeEach(() => {
    cy.visit('/auth/?form=login');
    cy.intercept('POST', '/api/v1/auction/auth/login').as('loginSubmit');
  });

  it('fails to submit form if user enters invalid email format', () => {
    cy.get('input[name="email"]').should('exist').type('notNoroff@amail.com');
    cy.get('input[name="password"]').should('exist').type(USER_PASSWORD);

    cy.get('form#login button')
      .contains('Submit')
      .click()
      .then(() => {
        cy.get('input[name="email"]:invalid').should('exist');
        cy.get('input[name="password"]:valid').should('exist');
      });
  });

  it('responds with an error if user submits with invalid credentials', () => {
    cy.get('input[name="email"]')
      .should('exist')
      .type('notUser@stud.noroff.no');
    cy.get('input[name="password"]').should('exist').type('notMyPassword');

    cy.get('form#login button')
      .contains('Submit')
      .click()
      .then(() => {
        cy.get('input[name="email"]:valid').should('exist');
        cy.get('input[name="password"]:valid').should('exist');
      });
    cy.wait('@loginSubmit').then((interception) => {
      expect(interception.response.statusCode).to.equal(401);
      cy.get('#errMsg').contains('Invalid email or password');
    });
  });

  it('logs in user with valid credentials', () => {
    cy.clearLocalStorage();
    cy.intercept('GET', '/').as('redirect');
    cy.visit('/auth/?form=login');
    cy.wait(500);

    cy.get('#email').should('exist').type(USER_EMAIL);
    cy.get('#password').should('exist').type(USER_PASSWORD);

    cy.get('form#login button').contains('Submit').click();
    cy.wait('@loginSubmit').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

    cy.wait('@redirect').then(() => {
      expect(localStorage.getItem('token')).to.exist;
      expect(localStorage.getItem('userDetails')).to.exist;
      cy.location().should((location) =>
        expect(location.pathname).to.equal('/')
      );
    });
  });
});
