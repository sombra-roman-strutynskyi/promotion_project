import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserManagementComponent } from './user-management/user-management.component';

export const COMPONENTS = [
  LoginComponent,
  RegisterComponent,
  ResetPasswordComponent,
  ForgotPasswordComponent,
  UserManagementComponent,
];

export * from './login/login.component';
export * from './register/register.component';
export * from './reset-password/reset-password.component';
export * from './forgot-password/forgot-password.component';
export * from './user-management/user-management.component';
