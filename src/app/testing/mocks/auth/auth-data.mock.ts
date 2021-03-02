import {
  ICredentials,
  IDialogPasswordConformationData,
  IRegisterUser,
  IResetPasswordCredentials,
  IUser,
} from '@auth';

export const MOCK_DIALOG_PASSWORD: IDialogPasswordConformationData = {
  email: 'admin@test.com',
  password: 'password',
};
export const MOCK_CREDENTIALS: ICredentials = {
  email: 'admin@test.com',
  password: 'password',
  remember: true,
};
export const MOCK_REGISTER_USER: IRegisterUser = {
  email: 'admin@test.com',
  firstName: 'firstName',
  lastName: 'lastName',
  age: 22,
};

export const MOCK_USER: IUser = {
  ...MOCK_REGISTER_USER,
  uid: null,
  photoURL: 'http://photo.url',
};

export const MOCK_RESET_PASSWORD: IResetPasswordCredentials = {
  newPassword: 'password',
  confirmPassword: 'password',
};
