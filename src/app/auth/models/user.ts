import { deepMerge, deepRemoveEmptyObjProperty } from '@shared';

export type ProviderType = 'password' | 'google.com' | 'facebook.com';
export interface IProviders {
  password: boolean;
  google: boolean;
  facebook: boolean;
}
export interface ICredentials {
  email: string;
  password: string;
  remember: boolean;
}
export interface IResetPasswordCredentials {
  password: string;
  confirmPassword: string;
  token?: string;
}
export class IRegisterUser {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  age: number;
}

export interface IUser {
  uid?: string;
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  photoURL?: string;
  photo?: File[];
}
export class User implements IUser {
  uid = '';
  firstName = '';
  lastName = '';
  email = '';
  age = '';
  photoURL = '';
  photo = null;
  constructor(data: IUser) {
    Object.assign(this, deepMerge(this, deepRemoveEmptyObjProperty(data)));
  }
}
