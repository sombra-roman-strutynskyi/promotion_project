import { ROUTES_DATA } from '../../src/app/shared/constants/routePaths';
describe('Global', () => {
  describe('Navigation', () => {
    it('should redirect to Articles', () => {
      cy.visit('/');
      cy.login();
      cy.url().should('include', ROUTES_DATA.ARTICLES.url);

      cy.visit('/bad-url');
      cy.url().should('include', ROUTES_DATA.ARTICLES.url);

      cy.visit(`/${ROUTES_DATA.PROFILE.url}`);
      cy.get('.layout-header__name').click();
      cy.url().should('include', ROUTES_DATA.ARTICLES.url);
    });
    it('should redirect to Profile', () => {
      cy.visit('/');

      cy.get('.layout-header__user').click();
      cy.url().should('include', ROUTES_DATA.PROFILE.url);
    });
    it('should redirect to Login', () => {
      cy.visit('/');
      cy.logout();
      cy.url().should('include', ROUTES_DATA.AUTH.children.SIGN_IN.url);

      cy.visit('/bad-url');
      cy.url().should('include', ROUTES_DATA.AUTH.children.SIGN_IN.url);

      cy.visit(`/${ROUTES_DATA.AUTH.children.SIGN_UP.url}`);
      cy.get('.layout-header__name').click();
      cy.url().should('include', ROUTES_DATA.AUTH.children.SIGN_IN.url);
    });
  });
});
