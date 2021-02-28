import { DialogPasswordConformationComponent } from './dialog-password-conformation/dialog-password-conformation.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserManagementComponent } from './user-management/user-management.component';

export const COMPONENTS = [
  LoginComponent,
  RegisterComponent,
  ForgotPasswordComponent,
  UserManagementComponent,
  DialogPasswordConformationComponent,
];

export * from './login/login.component';
export * from './register/register.component';
export * from './forgot-password/forgot-password.component';
export * from './user-management/user-management.component';
export * from './dialog-password-conformation/dialog-password-conformation.component';
