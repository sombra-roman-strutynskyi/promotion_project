import { ROUTES_DATA } from '../../src/app/shared/constants/routePaths';

describe('User Profile', () => {
  before(() => {
    cy.login();
    cy.wait(1000);
  });
  beforeEach(() => {
    cy.visit(`/${ROUTES_DATA.PROFILE.url}`);
  });

  describe('Profile Edit', () => {
    const profileEditBtn = 'profile-edit-profile .accordion__button';
    const profileSubmitBtn = 'profile-edit-profile button[type="submit"]';
    const profileInputs = 'profile-edit-profile input';
    it('should change state when click on edit button', () => {
      cy.get(profileEditBtn).should('not.be.disabled');
      cy.get(profileInputs).should('be.disabled');
      cy.get(profileEditBtn).click();

      cy.get(profileEditBtn).should('be.disabled');
      cy.get(profileInputs).should('not.be.disabled');
    });
    it('should change state when click on cancel button', () => {
      cy.get(profileEditBtn).click();

      cy.get(profileEditBtn).should('be.disabled');
      cy.get(profileInputs).should('not.be.disabled');

      cy.get('profile-edit-profile button').contains('Cancel').click();
      cy.get(profileEditBtn).should('not.be.disabled');
      cy.get(profileInputs).should('be.disabled');
    });
    it('should have error message if firstName is empty', () => {
      cy.get(profileEditBtn).click();

      cy.get('.first_name input').clear().blur();
      cy.contains('Please enter First Name');
      cy.get(profileSubmitBtn).should('be.disabled');
    });
    it('should have error message if lastName is empty', () => {
      cy.get(profileEditBtn).click();

      cy.get('.last_name input').clear().blur();
      cy.contains('Please enter Last Name');
      cy.get(profileSubmitBtn).should('be.disabled');
    });
    it('should have error message if age is invalid', () => {
      cy.get(profileEditBtn).click();

      cy.get('.age input').clear().type('5').blur();
      cy.contains('Should be more then 6');
      cy.get(profileSubmitBtn).should('be.disabled');

      cy.get('.age input').clear().type('121').blur();
      cy.contains('Should be less then 120');
      cy.get(profileSubmitBtn).should('be.disabled');
    });
  });
  describe('Change Password', () => {
    const changePasswordEditBtn = 'profile-change-password .accordion__button';
    const changePasswordSubmitBtn =
      'profile-change-password button[type="submit"]';
    const changePasswordInputs = 'profile-change-password input';
    const password = 'input[type="password"]';
    it('should change state when click on edit button', () => {
      cy.get(changePasswordEditBtn).should('not.be.disabled');
      cy.get(changePasswordInputs).should('be.disabled');

      cy.get(changePasswordEditBtn).click();
      cy.get(changePasswordEditBtn).should('be.disabled');
      cy.get(changePasswordInputs).eq(0).should('not.be.disabled');
      cy.get(changePasswordInputs).eq(1).should('not.be.disabled');
      cy.get(changePasswordInputs).eq(2).should('be.disabled');

      cy.get(changePasswordSubmitBtn).should('be.disabled');
    });
    it('should change state when click on cancel button', () => {
      cy.get(changePasswordEditBtn).click();

      cy.get(changePasswordEditBtn).should('be.disabled');
      cy.get(changePasswordInputs).eq(0).should('not.be.disabled');

      cy.get('profile-change-password button').contains('Cancel').click();
      cy.get(changePasswordEditBtn).should('not.be.disabled');
      cy.get(changePasswordInputs).should('be.disabled');
    });
    it('should have error message if oldPassword is empty or invalid', () => {
      cy.get(changePasswordEditBtn).click();

      cy.get(password).eq(0).type('12345').blur();
      cy.contains('Should have 6 characters');

      cy.get(password).eq(0).clear().blur();
      cy.contains('Please enter Old Password');
    });
    it('should have error message if newPassword is empty or invalid', () => {
      cy.get(changePasswordEditBtn).click();

      cy.get(password).eq(1).type('12345').blur();
      cy.contains('Should have 6 characters');

      cy.get(password).eq(1).clear().blur();
      cy.contains('Please enter New Password');
    });
    it('should have error message if newPassword and confirmPassword no matching', () => {
      cy.get(changePasswordEditBtn).click();

      cy.get(password).eq(1).type('123456');
      cy.get(password).eq(2).type('1234567').blur();
      cy.contains('Password Not Matching');

      cy.get(password).eq(1).clear().type('123456');
      cy.get(password).eq(2).clear().type('123456').blur();
      cy.should('not.contain', 'Password Not Matching');

      cy.get(password).eq(1).clear().type('1234567');
      cy.get(password).eq(2).clear().type('123456').blur();
      cy.contains('Password Not Matching');
    });
    it('should have error message if confirmPassword is empty or invalid', () => {
      cy.get(changePasswordEditBtn).click();
      cy.get(password).eq(1).type('123456');
      cy.get(password).eq(2).type('12345').blur();
      cy.contains('Should have 6 characters');

      cy.get(password).eq(2).clear().blur();
      cy.contains('Please enter Confirm Password');
    });
    it('should have be active submit button', () => {
      cy.get(changePasswordEditBtn).click();
      cy.get(password).eq(0).type('123456');
      cy.get(password).eq(1).type('123456');
      cy.get(password).eq(2).type('123456');
      cy.get(changePasswordSubmitBtn).should('not.be.disabled');
    });
  });
  after(() => {
    cy.logout();
  });
});
