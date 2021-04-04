import 'cypress-file-upload';

Cypress.Commands.add('login', () => {
  cy.intercept('post', '*identitytoolkit/v3/relyingparty/getAccountInfo?*').as(
    'login'
  );
  cy.visit('/').then(() => {
    cy.get('input[type="email"]').type(Cypress.env('userEmail'));
    cy.get('input[type="password"]').type(Cypress.env('userPassword'));
    cy.get('.form-buttons button[type="submit"]').click();
    cy.wait('@login');
  });
});
Cypress.Commands.add('logout', () => {
  cy.visit('/').then(() => {
    cy.get('.layout-header__button').click();
  });
});

Cypress.Commands.add(
  'getWithWait',
  (selector: string, timeout: number = 20000) => {
    return cy.get(selector, { timeout });
  }
);
