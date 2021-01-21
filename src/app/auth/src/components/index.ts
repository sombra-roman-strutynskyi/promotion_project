import { ChangeAvatarComponent } from './change-avatar/change-avatar.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const COMPONENTS = [
  LoginComponent,
  RegisterComponent,
  ResetPasswordComponent,
  EditUserComponent,
  ChangeAvatarComponent,
  ChangePasswordComponent,
];

export * from './login/login.component';
export * from './register/register.component';
export * from './reset-password/reset-password.component';
export * from './edit-user/edit-user.component';
export * from './change-avatar/change-avatar.component';
export * from './change-password/change-password.component';
