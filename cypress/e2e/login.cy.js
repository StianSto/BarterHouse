const USER_EMAIL = Cypress.env('USER_EMAIL');
const USER_PASSWORD = Cypress.env('USER_PASSWORD');
const USER_NAME = Cypress.env('USER_NAME');

context('authentication forms', () => {
  it('logs in user with valid credentials', () => {
    cy.visit('/auth/?form=login');
    cy.wait(500);

    cy.get('form')
      .should('exist')
      .within(() => {
        cy.get('#email').should('exist').type(USER_EMAIL);
        cy.get('#password').should('exist').type(USER_PASSWORD);

        cy.intercept('https://api.noroff.dev/api/v1/auction/auth/login').as(
          'loginSubmit'
        );
        cy.root().submit();
        cy.wait('@loginSubmit').then((interception) => {
          expect(interception.response.statusCode).to.equal(200);
        });
      });
  });

  it('fails to submit form if user enters invalid email', () => {
    cy.visit('/auth/?form=login');
    cy.wait(500);

    cy.get('form')
      .should('exist')
      .within(() => {
        cy.get('#email').should('exist').type('notNoroff@a');
        cy.get('#password').should('exist').type(USER_PASSWORD);

        cy.intercept('https://api.noroff.dev/api/v1/auction/auth/login').as(
          'loginSubmit'
        );

        cy.root().submit();
        cy.wait('@loginSubmit').then((interception) => {
          expect(interception.response.statusCode).to.equal(400);
          cy.get('#errMsg').contains('Email must be a valid email');
        });

        cy.get('#email').clear().type('notNoroff@email.com');
        cy.root().submit();
        cy.wait('@loginSubmit').then((interception) => {
          expect(interception.response.statusCode).to.equal(401);
          cy.get('#errMsg').contains('Invalid email or password');
        });
      });
  });
});
