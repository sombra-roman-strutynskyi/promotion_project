import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES_DATA } from '@shared';
import { AuthComponent, LoginComponent } from './components';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
