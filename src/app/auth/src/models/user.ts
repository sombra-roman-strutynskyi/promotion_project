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
  displayName: string;
  email: string;
  photoURL?: string;
  phoneNumber: string;
}

export class User implements IUser {
  constructor(
    public uid: string,
    public displayName: string,
    public email: string,
    public phoneNumber: string,
    public photoURL?: string
  ) {}
}
