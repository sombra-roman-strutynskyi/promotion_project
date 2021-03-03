import { IUser } from '@auth';
import { deepMerge, deepRemoveEmptyObjProperty } from '@shared';

export type ProviderType = 'password' | 'google.com' | 'facebook.com';

export interface IChangePassword {
  newPassword: string;
  oldPassword: string;
  confirmPassword?: string;
}

export interface IUpdateProfile {
  firstName: string;
  lastName: string;
  age: string | number;
  photoURL: string;
  photo: File[];
}
export class UpdateProfile implements IUpdateProfile {
  firstName = '';
  lastName = '';
  age = '';
  photoURL = '';
  photo = null;
  constructor(data: IUser | IUpdateProfile) {
    Object.assign(this, deepMerge(this, deepRemoveEmptyObjProperty(data)));
  }
}
