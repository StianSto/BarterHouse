const USER_TOKEN = Cypress.env('USER_TOKEN');
const USER_DETAILS = {
  email: Cypress.env('USER_EMAIL'),
  name: Cypress.env('USER_NAME'),
  avatar: Cypress.env('USER_AVATAR'),
};
const NEW_AVATAR =
  'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg';

import { updateProfile } from '../../src/js/api/profile/update/update';

context('update avatar image', () => {
  before(() => {
    localStorage.setItem('userDetails', JSON.stringify(USER_DETAILS));
    localStorage.setItem('token', JSON.stringify(USER_TOKEN));
  });
  it('user can update their own avatar image', () => {
    cy.intercept(
      'PUT',
      `/api/v1/auction/profiles/${USER_DETAILS.name}/media`
    ).as('updateAvatarRequest');
    cy.intercept('GET', '/profiles/').as('reload');

    cy.visit('/profiles/');
    cy.get('#changeAvatarModal').should('not.be.visible');
    cy.get(
      'button[data-bs-toggle="modal"][data-bs-target="#changeAvatarModal"]'
    )
      .should('be.visible')
      .click()
      .then(() => {
        cy.get('#changeAvatarModal').should('be.visible');
      });

    // cy.get('input[name="avatar"]').clear();
    cy.get('input[name="avatar"]').invoke('val', NEW_AVATAR);

    cy.get('button[type="submit"]').click();

    cy.wait('@updateAvatarRequest').then((interception) => {
      console.log(interception);
      expect(interception.response.statusCode).to.equal(200);
    });

    cy.wait('@reload').then(() => {
      cy.get('img#profileImg').should('have.attr', 'src', NEW_AVATAR);
      cy.get('#navProfile img.profile-img').should(
        'have.attr',
        'src',
        NEW_AVATAR
      );
    });
  });

  after(() => {
    updateProfile(
      Cypress.env('USER_NAME'),
      JSON.stringify({
        avatar: Cypress.env('USER_AVATAR'),
      })
    );
  });
});
