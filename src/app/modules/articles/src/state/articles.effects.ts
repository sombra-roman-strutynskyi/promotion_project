import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError, exhaustMap, tap } from 'rxjs/operators';
import { ArticlesDBService } from '../services/articles-db.service';
import * as ArticlesActions from './articles.actions';
import { ROUTES_DATA } from '../../../../shared/src/constants/routePaths';

@Injectable()
export class ArticlesEffects {
  loadArticleById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticlesActions.loadArticleById),
      switchMap(({ id }) =>
        this.articlesDB.getArticle(id).pipe(
          map((article) =>
            ArticlesActions.loadArticleByIdSuccess({
              article,
            })
          ),
          catchError((error) =>
            of(ArticlesActions.loadArticleByIdFailure({ errors: [error] }))
          )
        )
      )
    )
  );

  updateArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticlesActions.updateArticle),
      exhaustMap(({ article }) =>
        this.articlesDB.updateArticle(article).pipe(
          map((data) =>
            ArticlesActions.updateArticleSuccess({ article: data })
          ),
          catchError((error) =>
            of(ArticlesActions.updateArticleFailure({ errors: [error] }))
          )
        )
      )
    )
  );

  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticlesActions.createArticle),
      exhaustMap(({ article }) =>
        this.articlesDB.createArticle(article).pipe(
          map((data) =>
            ArticlesActions.createArticleSuccess({ article: data })
          ),
          catchError((error) =>
            of(ArticlesActions.createArticleFailure({ errors: [error] }))
          )
        )
      )
    )
  );

  loadArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticlesActions.loadArticles),
      switchMap(() =>
        this.articlesDB.getArticles().pipe(
          map((articles) =>
            ArticlesActions.loadArticlesSuccess({
              articles,
            })
          ),
          catchError((error) =>
            of(ArticlesActions.loadArticlesFailure({ errors: [error] }))
          )
        )
      )
    )
  );

  removeArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticlesActions.removeArticle),
      exhaustMap(({ id }) =>
        this.articlesDB.removeArticle(id).pipe(
          map((deletedId) =>
            ArticlesActions.removeArticleSuccess({
              id: deletedId,
            })
          ),
          tap(() => this.router.navigateByUrl(ROUTES_DATA.ARTICLES.url)),
          catchError((error) =>
            of(ArticlesActions.removeArticleFailure({ errors: [error] }))
          )
        )
      )
    )
  );

  createArticleSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ArticlesActions.createArticleSuccess,
          ArticlesActions.updateArticleSuccess
        ),
        tap(({ article }) =>
          this.router.navigateByUrl(`${ROUTES_DATA.ARTICLES.url}/${article.id}`)
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private articlesDB: ArticlesDBService,
    private router: Router
  ) {}
}