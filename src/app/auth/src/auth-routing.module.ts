import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ROUTES_DATA} from '@shared';
import {AuthComponent, LoginComponent} from './components';

const enum RoutesData {
  SIGN_IN = 'Sign In',
  SIGN_UP = 'Sign Up',
  RESET_PASSWORD = 'Reset Password',
  REGISTER = 'New account request',
  COMPLETE_REGISTER = 'Complete Registration',
}

export const authRoutes: Routes = [
  {
    path: ROUTES_DATA.AUTH.url,
    component: AuthComponent,
    data: {
      layoutClass: 'layout-auth',
    },
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: RoutesData.SIGN_IN,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
