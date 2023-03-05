import { removeListing } from '../../src/js/api/listings/remove/removeListing';

const USER_TOKEN = Cypress.env('USER_TOKEN');
const USER_DETAILS = {
  email: Cypress.env('USER_EMAIL'),
  name: Cypress.env('USER_NAME'),
  avatar: Cypress.env('USER_AVATAR'),
};

const image1 =
  'https://cdn.shopify.com/s/files/1/0075/3929/4305/collections/G22_WA_AP_NAV-Shoes.jpg?v=1645999375';
const image2 =
  'https://hips.hearstapps.com/hmg-prod/images/run-on-shoes-1637184473.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*';

const title = 'cypress test';
const endsAt = new Date();
endsAt.setDate(endsAt.getDate() + 1);
const tags = ['cypress', 'test'];
const media = [image1, image2];
const description =
  'this is a generated listing from cypress. it will be deleted shortly';

const endsAtValue = endsAt.toJSON();

const LISTING = {
  title,
  endsAt,
  tags,
  media,
  description,
};

context('creates a new listing with', () => {
  beforeEach(() => {
    localStorage.setItem('token', JSON.stringify(USER_TOKEN));
    localStorage.setItem('userDetails', JSON.stringify(USER_DETAILS));
    cy.visit('/create/');
    cy.intercept('POST', 'https://api.noroff.dev/api/v1/auction/listings').as(
      'createListingRequest'
    );
    const removeListingSpy = cy.spy(removeListing);
  });

  afterEach(() => {
    cy.get('button[type="submit"]').should('contain', 'Create Listing').click();

    cy.wait('@createListingRequest').then((interception) => {
      expect(interception.response.statusCode).to.equal(201);
      let id = interception.response.body.id;

      cy.intercept(
        'DELETE',
        `https://api.noroff.dev/api/v1/auction/listings/${id}`
      ).as('removeListingResponse');

      removeListing(id);
      cy.wait('@removeListingResponse').then((interception) => {
        expect(interception.response.statusCode).to.equal(204);
      });
    });
  });

  it('minimum info, title and end date', () => {
    cy.get('form#createListing').within(() => {
      cy.get('input[name="title"]').type(title);
      cy.get('input[name="endsAt"]').type(endsAtValue.slice(0, 16));
    });
  });

  it('title, tags, end date, images and a description', () => {
    cy.get('form#createListing').within(() => {
      cy.get('input[name="title"]').type(title);
      cy.get('input[name="endsAt"]').type(endsAtValue.slice(0, 16));
      tags.forEach((tag) => {
        cy.get('input#tags').type(tag + ' ');
      });
      cy.get('textarea[name="description"]').type(description);
      cy.get('[data-bs-target="#modalAddImages"]').click();
      cy.wait(1000);

      cy.get('#modalAddImages', { withinSubject: null })
        .should('be.visible')
        .within(() => {
          media.forEach((img) => {
            cy.get('#addImageBtn', { withinSubject: null }).wait(100).type(img);
          });
          cy.get('[data-save]').click();
        });
    });
  });
});
