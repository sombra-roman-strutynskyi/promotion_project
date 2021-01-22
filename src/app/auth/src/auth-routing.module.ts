import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES_DATA } from '@shared';
import {
  ForgotPasswordComponent,
  LoginComponent,
  RegisterComponent,
  ResetPasswordComponent,
} from './components';
import { AuthComponent, InfoUserComponent} from './containers';
import { AuthGuard, UnauthorizedGuard } from './services';

export const routes: Routes = [
  {
    path: ROUTES_DATA.AUTH.url,
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: ROUTES_DATA.AUTH.children.SIGN_IN.path,
        pathMatch: 'full',
      },
      {
        path: ROUTES_DATA.AUTH.children.SIGN_IN.path,
        component: LoginComponent,
        canActivate: [UnauthorizedGuard],
        data: {
          title: ROUTES_DATA.AUTH.children.SIGN_IN.title,
        },
      },
      {
        path: ROUTES_DATA.AUTH.children.SIGN_UP.path,
        component: RegisterComponent,
        canActivate: [UnauthorizedGuard],
        data: {
          title: ROUTES_DATA.AUTH.children.SIGN_UP.title,
        },
      },
      {
        path: ROUTES_DATA.AUTH.children.RESET_PASSWORD.path,
        component: ResetPasswordComponent,
        data: {
          title: ROUTES_DATA.AUTH.children.RESET_PASSWORD.title,
        },
      },
      {
        path: ROUTES_DATA.AUTH.children.FORGOT_PASSWORD.path,
        component: ForgotPasswordComponent,
        canActivate: [UnauthorizedGuard],
        data: {
          title: ROUTES_DATA.AUTH.children.FORGOT_PASSWORD.title,
        },
      },
    ],
  },
  {
    path: ROUTES_DATA.EDIT_USER.url,
    component: InfoUserComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
