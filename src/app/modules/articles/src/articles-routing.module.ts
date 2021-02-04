import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth';
import { ROUTES_DATA } from '@shared';
import {
  CreateEditArticleComponent,
  PreviewArticleComponent,
} from './components';
import { ListComponent } from './containers';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTES_DATA.ARTICLES.children.EDIT.path,
    component: CreateEditArticleComponent,
    data: {
      title: ROUTES_DATA.AUTH.children.SIGN_IN.title,
    },
  },
  {
    path: ROUTES_DATA.ARTICLES.children.ADD.path,
    component: CreateEditArticleComponent,
    data: {
      title: ROUTES_DATA.AUTH.children.SIGN_IN.title,
    },
  },
  {
    path: ':id',
    component: PreviewArticleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesRoutingModule {}
