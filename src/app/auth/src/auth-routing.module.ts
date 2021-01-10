import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES_DATA } from '@shared';
import {
  AuthComponent,
  LoginComponent,
  RegisterComponent,
  ResetPasswordComponent,
} from './components';

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
        data: {
          title: ROUTES_DATA.AUTH.children.SIGN_IN.title,
        },
      },
      {
        path: ROUTES_DATA.AUTH.children.SIGN_UP.path,
        component: RegisterComponent,
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
