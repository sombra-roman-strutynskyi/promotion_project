import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // component: LayoutComponent,
    // children: [
    //   {
    //     path: '',
    //     loadChildren: () => import('@auth/auth.module').then((m) => m.AuthModule),
    //   },
    // ],
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
