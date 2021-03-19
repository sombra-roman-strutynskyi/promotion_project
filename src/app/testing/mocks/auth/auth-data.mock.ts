import {
  ICredentials,
  IDialogPasswordConformationData,
  IProviders,
  IRegisterUser,
  IResetPasswordCredentials,
  IUser,
} from '@auth';
import { UserCredential, UserFirebase } from '@shared';

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
  uid: '1',
  photoURL: 'http://photo.url',
};

export const MOCK_RESET_PASSWORD: IResetPasswordCredentials = {
  newPassword: 'password',
  confirmPassword: 'password',
};
export const MOCK_PROVIDERS: IProviders = {
  password: true,
};
export const MOCK_FIREBASE_USER: Partial<UserFirebase> = {
  uid: '1',
  email: 'admin@test.com',
  photoURL: 'http://photo.url',
  providerData: [
    {
      displayName: 'test',
      email: 'admin@test.com',
      phoneNumber: null,
      photoURL: 'http://photo.url',
      providerId: 'facebook.com',
      uid: '2537068276590519',
    },
  ],
};
export const MOCK_FIREBASE_USER_CREDENTIALS: Partial<UserCredential> = {
  user: MOCK_FIREBASE_USER as UserFirebase,
};
