import { ROUTES_DATA } from '../../src/app/shared/constants/routePaths';

describe('Auth', () => {
  describe('Login', () => {
    const submitButton = '.form-buttons button[type="submit"]';
    const inputEmail = 'input[type="email"]';
    const inputPassword = 'input[type="password"]';
    beforeEach(() => {
      cy.visit(`/${ROUTES_DATA.AUTH.children.SIGN_IN.url}`);
      cy.intercept(
        'get',
        '*identitytoolkit/v3/relyingparty/getProjectConfig?*'
      ).as('login');
    });
    it('should active submit button', () => {
      cy.get(submitButton).should('be.disabled');
      cy.get(inputEmail).type('test@email.com');
      cy.get(inputPassword).type('12345678');

      cy.get(submitButton).should('not.be.disabled');
    });
    it('should have error message if invalid email', () => {
      cy.get(inputEmail).type('failedEmail').blur();
      cy.get(inputPassword).type('12345678');

      cy.contains('This is not a valid email address');
      cy.get(submitButton).should('be.disabled');
    });
    it('should have error message if invalid password to short ', () => {
      cy.get(inputEmail).type('test@email.com');
      cy.get(inputPassword).type('12345').blur();

      cy.contains('Should have 6 characters');
      cy.get(submitButton).should('be.disabled');
    });
    it('should login with facebook', () => {
      cy.get('.login__button--facebook').click();

      cy.wait('@login').then((data) => {
        expect(data.requestWaited).equal(true);
      });
    });
    it('should login with google', () => {
      cy.get('.login__button--google').click();
      cy.wait('@login').then((data) => {
        expect(data.requestWaited).equal(true);
      });
    });
    it('should go to forgot password page', () => {
      cy.get('.login__reset-password').click();

      cy.url().should('include', ROUTES_DATA.AUTH.children.FORGOT_PASSWORD.url);
    });
    it('should go to register page', () => {
      cy.get('[data-tab="1"]').click({ force: true });
      cy.url().should('include', ROUTES_DATA.AUTH.children.SIGN_UP.url);
    });
  });
  describe('Register', () => {
    const submitButton = '.form-buttons button[type="submit"]';
    const inputFirstName = '.first_name input';
    const inputLastName = '.last_name input';
    const inputAge = '.age input';
    const inputEmail = 'input[type="email"]';
    const inputPassword = 'input[type="password"]';

    beforeEach(() => {
      cy.visit(`/${ROUTES_DATA.AUTH.children.SIGN_UP.url}`);
    });
    it('should active submit button', () => {
      cy.get(submitButton).should('be.disabled');
      cy.get(inputFirstName).type('first name');
      cy.get(inputLastName).type('last name');
      cy.get(inputAge).type('22');
      cy.get(inputEmail).type('test@email.com');
      cy.get(inputPassword).type('12345678');

      cy.get(submitButton).should('not.be.disabled');
    });
    it('should have error message if firstName is empty', () => {
      cy.get(inputFirstName).focus().blur();
      cy.get(inputLastName).type('last name');
      cy.get(inputAge).type('22');
      cy.get(inputEmail).type('test@email.com');
      cy.get(inputPassword).type('12345678');

      cy.contains('Please enter First Name');
      cy.get(submitButton).should('be.disabled');
    });
    it('should have error message if lastName is empty', () => {
      cy.get(inputFirstName).type('first name');
      cy.get(inputLastName).focus().blur();
      cy.get(inputAge).type('22');
      cy.get(inputEmail).type('test@email.com');
      cy.get(inputPassword).type('12345678');

      cy.contains('Please enter Last Name');
      cy.get(submitButton).should('be.disabled');
    });
    it('should have error message if email is empty or invalid', () => {
      cy.get(inputFirstName).type('first name');
      cy.get(inputLastName).type('last name');
      cy.get(inputAge).type('22');
      cy.get(inputPassword).type('12345678');

      cy.get(inputEmail).focus().blur();
      cy.contains('Please enter Email');
      cy.get(submitButton).should('be.disabled');

      cy.get(inputEmail).type('failedEmail').blur();
      cy.contains('This is not a valid email address');
      cy.get(submitButton).should('be.disabled');
    });
    it('should have error message if password is empty or invalid', () => {
      cy.get(inputFirstName).type('first name');
      cy.get(inputLastName).type('last name');
      cy.get(inputAge).type('22');
      cy.get(inputEmail).type('test@email.com');

      cy.get(inputPassword).focus().blur();
      cy.contains('Please enter Password');
      cy.get(submitButton).should('be.disabled');

      cy.get(inputPassword).type('12345').blur();
      cy.contains('Should have 6 characters');
      cy.get(submitButton).should('be.disabled');
    });
    it('should have error message if age is invalid', () => {
      cy.get(inputFirstName).type('first name');
      cy.get(inputLastName).type('last name');

      cy.get(inputAge).clear().type('5').blur();
      cy.contains('Should be more then 6');
      cy.get(submitButton).should('be.disabled');

      cy.get(inputAge).clear().type('121').blur();
      cy.contains('Should be less then 120');
      cy.get(submitButton).should('be.disabled');
    });

    it('should go to login page', () => {
      cy.get('[data-tab="0"]').click({ force: true });
      cy.url().should('include', ROUTES_DATA.AUTH.children.SIGN_IN.url);
    });
  });
  describe('Forgot Password', () => {
    const submitButton = '.form-buttons button[type="submit"]';
    const inputEmail = 'input[type="email"]';

    beforeEach(() => {
      cy.visit(`/${ROUTES_DATA.AUTH.children.FORGOT_PASSWORD.url}`);
    });
    it('should active submit button', () => {
      cy.get(submitButton).should('be.disabled');
      cy.get(inputEmail).type('test@email.com');

      cy.get(submitButton).should('not.be.disabled');
    });
    it('should have error message if email is empty or invalid', () => {
      cy.get(inputEmail).focus().blur();
      cy.contains('Please enter Email');
      cy.get(submitButton).should('be.disabled');

      cy.get(inputEmail).type('failedEmail').blur();
      cy.contains('This is not a valid email address');
      cy.get(submitButton).should('be.disabled');
    });
    it('should go to login page', () => {
      cy.visit(`/${ROUTES_DATA.AUTH.children.SIGN_IN.url}`);
      cy.get('.login__reset-password').click();
      cy.get('.mat-card-title .auth__button').click();
      cy.url().should('include', ROUTES_DATA.AUTH.children.SIGN_IN.url);
    });
  });
});
