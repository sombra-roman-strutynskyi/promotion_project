import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const COMPONENTS = [
  LoginComponent,
  AuthComponent,
  RegisterComponent,
  ResetPasswordComponent,
];

export * from './login/login.component';
export * from './auth.component';
export * from './register/register.component';
export * from './reset-password/reset-password.component';
