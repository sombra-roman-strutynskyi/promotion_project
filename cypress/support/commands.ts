import 'cypress-file-upload';

Cypress.Commands.add('login', () => {
  cy.visit('/').then(() => {
    cy.get('input[type="email"]').type(Cypress.env('userEmail'));
    cy.get('input[type="password"]').type(Cypress.env('userPassword'));
    cy.get('.form-buttons button[type="submit"]').click();
  });
});
Cypress.Commands.add('logout', () => {
  cy.visit('/').then(() => {
    cy.get('.layout-header__button').click();
  });
});
