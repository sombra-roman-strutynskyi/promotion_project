Cypress.Commands.add('login', () => {
  cy.visit('/').then(() => {
    cy.get("input[type='email']").type('test@gmail.com');
    cy.get("input[type='password']").type('12345678');
    cy.get(".form-buttons button[type='submit']").click();
  });
});
Cypress.Commands.add('logout', () => {
  cy.visit('/').then(() => {
    cy.get('.layout-header__button').click();
  });
});
