import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth';
import { ROUTES_DATA } from '@shared';

const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTES_DATA.ARTICLES.path,
    pathMatch: 'full',
  },
  {
    path: ROUTES_DATA.AUTH.path,
    loadChildren: () => import('@auth').then((m) => m.AuthModule),
  },
  {
    path: ROUTES_DATA.ARTICLES.path,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@modules/articles').then((m) => m.ArticlesModule),
  },
  {
    path: ROUTES_DATA.PROFILE.path,
    canActivate: [AuthGuard],
    loadChildren: () => import('@modules/profile').then((m) => m.ProfileModule),
  },
  {
    path: '**',
    redirectTo: ROUTES_DATA.ARTICLES.path,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
