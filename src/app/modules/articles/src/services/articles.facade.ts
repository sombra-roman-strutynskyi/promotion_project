import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IArticle } from '../models';
import { articlesQuery } from '../state';

import * as ArticlesActions from '../state/articles.actions';
import * as ArticlesReducer from '../state/articles.reducer';

@Injectable()
export class ArticlesFacade {
  pending$ = this.store.pipe(select(articlesQuery.getPending));
  article$ = this.store.pipe(select(articlesQuery.getArticle));
  selectedArticle$ = this.store.pipe(select(articlesQuery.getSelected));
  allArticles$ = this.store.pipe(select(articlesQuery.getAllArticles));

  constructor(private store: Store<ArticlesReducer.ArticlesPartialState>) {}

  loadArticleById(id: string) {
    this.store.dispatch(ArticlesActions.loadArticleById({ id }));
  }

  createArticle(article: IArticle) {
    this.store.dispatch(ArticlesActions.createArticle({ article }));
  }

  updateArticle(article: IArticle) {
    this.store.dispatch(ArticlesActions.updateArticle({ article }));
  }

  loadArticles() {
    this.store.dispatch(ArticlesActions.loadArticles());
  }

  removeArticle(id: string) {
    this.store.dispatch(ArticlesActions.removeArticle({ id }));
  }
}
