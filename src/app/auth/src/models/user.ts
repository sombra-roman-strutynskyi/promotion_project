import { deepMerge, deepRemoveEmptyObjProperty } from '@shared';

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
export interface IChangePassword{
  newPassword: string;
  oldPassword: string;
  confirmPassword?: string;
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
}
export interface IUpdateUser {
  firstName: string;
  lastName: string;
  age: string;
}

export class User implements IUser {
  uid = '';
  firstName = '';
  lastName = '';
  email = '';
  age = '';
  photoURL? = '';
  constructor(data: IUser) {
    Object.assign(this, deepMerge(this, deepRemoveEmptyObjProperty(data)));
  }
}

export class UpdateUser implements IUpdateUser {
  firstName = '';
  lastName = '';
  age = '';
  constructor(data: IUser) {
    Object.assign(this, deepMerge(this, deepRemoveEmptyObjProperty(data)));
  }
}