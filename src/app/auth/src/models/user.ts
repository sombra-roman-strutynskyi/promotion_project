import { deepMerge, deepRemoveEmptyObjProperty } from '@shared';

export interface Credentials {
  email: string;
  password: string;
  remember: boolean;
}

export interface ResetPasswordCredentials {
  password: string;
  confirmPassword: string;
  token?: string;
}

export class RegisterUser {
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
  photoURL?: string;
}

export class User implements IUser {
  uid = '';
  firstName = '';
  lastName = '';
  email = '';
  photoURL? = '';
  constructor(data: IUser) {
    Object.assign(this, deepMerge(this, deepRemoveEmptyObjProperty(data)));
  }
}
