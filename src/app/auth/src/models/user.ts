export interface Credentials {
  email: string;
  password: string;
}

export interface ResetPasswordCredentials {
  password: string;
  confirmPassword: string;
  token?: string;
}

export class User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  photoUrl?: string;
}

export class RegisterUser {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  age: number;
}
