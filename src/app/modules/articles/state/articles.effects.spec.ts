import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
export { cold, hot } from 'jasmine-marbles';
import { MatDialog } from '@angular/material/dialog';
import { AuthFacade } from '@auth';
import { ROUTES_DATA, SnackbarService } from '@shared';
import {
  AuthFacadeMock,
  MockStoreModule,
  MOCK_FIREBASE_ERROR,
  MOCK_ARTICLE,
  ArticlesFacadeMock,
  RouterMock,
} from '@testing';
import { cold, hot } from 'jasmine-marbles';
import { ArticlesDbService, ArticlesFacade } from '../services';
import * as ArticlesActions from './articles.actions';
import { ArticlesEffects } from './articles.effects';
import { initialState, ARTICLES_FEATURE_KEY } from './articles.reducer';

describe('ArticlesEffects', () => {
  let store: Store<any>;
  let effects: ArticlesEffects;
  let authFacade: AuthFacade;
  let articlesDbService: ArticlesDbService;
  let actions$: Observable<any>;
  let routerService: Partial<Router>;
  let snackBar: SnackbarService;
  let router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MockStoreModule.forRoot(ARTICLES_FEATURE_KEY, { initialState }),
      ],
      providers: [
        ArticlesEffects,
        provideMockActions(() => actions$),
        { provide: AuthFacade, useClass: AuthFacadeMock },
        { provide: ArticlesFacade, useClass: ArticlesFacadeMock },
        {
          provide: ArticlesDbService,
          useValue: {},
        },
        {
          provide: Router,
          useClass: RouterMock,
        },
        {
          provide: SnackbarService,
          useValue: { open: jest.fn() },
        },
      ],
    });

    store = TestBed.inject(Store);
    effects = TestBed.inject(ArticlesEffects);
    authFacade = TestBed.inject(AuthFacade);
    actions$ = TestBed.inject(Actions);
    routerService = TestBed.inject(Router);
    articlesDbService = TestBed.inject(ArticlesDbService);
    snackBar = TestBed.inject(SnackbarService);

    router = jest.spyOn(routerService, 'navigateByUrl');
  });

  describe('loadArticleById$', () => {
    beforeEach(() => {
      const action = ArticlesActions.loadArticleById({
        id: MOCK_ARTICLE.id,
      });

      actions$ = hot('-a', { a: action });
    });
    it('should return an ArticlesActions.loadArticleByIdSuccess action, when articlesDb succeeds', () => {
      const article = MOCK_ARTICLE;
      const completion = ArticlesActions.loadArticleByIdSuccess({ article });

      const response = cold('-a|', {
        a: article,
      });
      const expected = cold('--c', { c: completion });

      articlesDbService.getArticle = jest.fn(() => response);
      expect(effects.loadArticleById$).toBeObservable(expected);
    });
    it('should return a new  ArticlesActions.loadArticleByIdFailure if the articlesDb service throws error', () => {
      const error = MOCK_FIREBASE_ERROR;
      const completion = ArticlesActions.loadArticleByIdFailure({ error });

      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });

      articlesDbService.getArticle = jest.fn(() => response);
      expect(effects.loadArticleById$).toBeObservable(expected);
    });
  });

  describe('updateArticle$', () => {
    const article = MOCK_ARTICLE;

    beforeEach(() => {
      const action = ArticlesActions.updateArticle({ article });

      actions$ = hot('-a', { a: action });
    });
    it('should return an ArticlesActions.updateArticleSuccess action, when articlesDb succeeds', () => {
      const completion = ArticlesActions.updateArticleSuccess({ article });

      const response = cold('-a|', {
        a: article,
      });
      const expected = cold('--c', { c: completion });

      articlesDbService.updateArticle = jest.fn(() => response);
      expect(effects.updateArticle$).toBeObservable(expected);
    });
    it('should return a new  ArticlesActions.updateArticleFailure if the articlesDb service throws error', () => {
      const error = MOCK_FIREBASE_ERROR;
      const completion = ArticlesActions.updateArticleFailure({ error });

      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });

      articlesDbService.updateArticle = jest.fn(() => response);
      expect(effects.updateArticle$).toBeObservable(expected);
    });
  });

  describe('createArticle$', () => {
    const article = MOCK_ARTICLE;

    beforeEach(() => {
      const action = ArticlesActions.createArticle({ article });

      actions$ = hot('-a', { a: action });
    });
    it('should return an ArticlesActions.createArticleSuccess action, when articlesDb succeeds', () => {
      const completion = ArticlesActions.createArticleSuccess({ article });

      const response = cold('-a|', {
        a: article,
      });
      const expected = cold('--c', { c: completion });

      articlesDbService.createArticle = jest.fn(() => response);
      expect(effects.createArticle$).toBeObservable(expected);
    });
    it('should return a new  ArticlesActions.createArticleFailure if the articlesDb service throws error', () => {
      const error = MOCK_FIREBASE_ERROR;
      const completion = ArticlesActions.createArticleFailure({ error });

      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });

      articlesDbService.createArticle = jest.fn(() => response);
      expect(effects.createArticle$).toBeObservable(expected);
    });
  });

  describe('removeArticle$', () => {
    const id = MOCK_ARTICLE.id;

    beforeEach(() => {
      const action = ArticlesActions.removeArticle({ id });

      actions$ = hot('-a', { a: action });
    });
    it('should return an ArticlesActions.removeArticleSuccess action, when articlesDb succeeds', () => {
      const completion = ArticlesActions.removeArticleSuccess({ id });

      const response = cold('-a|', {
        a: id,
      });
      const expected = cold('--c', { c: completion });

      articlesDbService.removeArticle = jest.fn(() => response);
      expect(effects.removeArticle$).toBeObservable(expected);
      expect(router).toHaveBeenCalledWith(ROUTES_DATA.ARTICLES.url);
    });
    it('should return a new  ArticlesActions.removeArticleFailure if the articlesDb service throws error', () => {
      const error = MOCK_FIREBASE_ERROR;
      const completion = ArticlesActions.removeArticleFailure({ error });

      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });

      articlesDbService.removeArticle = jest.fn(() => response);
      expect(effects.removeArticle$).toBeObservable(expected);
    });
  });
  describe('loadArticles$', () => {
    beforeEach(() => {
      const action = ArticlesActions.loadArticles();

      actions$ = hot('-a', { a: action });
    });
    it('should return an ArticlesActions.loadArticlesSuccess action, when articlesDb succeeds', () => {
      const articles = [MOCK_ARTICLE];

      const completion = ArticlesActions.loadArticlesSuccess({ articles });

      const response = cold('-a|', {
        a: articles,
      });
      const expected = cold('--c', { c: completion });

      articlesDbService.getArticles = jest.fn(() => response);
      expect(effects.loadArticles$).toBeObservable(expected);
    });
    it('should return a new  ArticlesActions.loadArticlesFailure if the articlesDb service throws error', () => {
      const error = MOCK_FIREBASE_ERROR;
      const completion = ArticlesActions.loadArticlesFailure({ error });

      const response = cold('-#|', {}, error);
      const expected = cold('--b', { b: completion });

      articlesDbService.getArticles = jest.fn(() => response);
      expect(effects.loadArticles$).toBeObservable(expected);
    });
  });
  describe('createArticleSuccess$', () => {
    it(`should call RouterNavigate action when
        ArticlesActions.createArticleSuccess or ArticlesActions.updateArticleSuccess
        is dispatched
      `, (done) => {
      const article = MOCK_ARTICLE;

      actions$ = of(
        ArticlesActions.createArticleSuccess({ article }),
        ArticlesActions.updateArticleSuccess({ article })
      );

      effects.createArticleSuccess$.subscribe(() => {
        expect(router).toHaveBeenCalledWith(
          `${ROUTES_DATA.ARTICLES.url}/${article.id}`
        );

        done();
      });
    });
  });

  describe('handleError$', () => {
    it(`should call SnackbarOpen when is dispatched action from list:
        ArticlesActions.loadArticleByIdFailure,
        ArticlesActions.loadArticlesFailure,
        ArticlesActions.createArticleFailure,
        ArticlesActions.updateArticleFailure,
        ArticlesActions.removeArticleFailure.
      `, (done: any) => {
      const snackbarOpen = jest.spyOn(snackBar, 'open');

      const error = MOCK_FIREBASE_ERROR;
      actions$ = of(
        ArticlesActions.loadArticleByIdFailure({ error }),
        ArticlesActions.loadArticlesFailure({ error }),
        ArticlesActions.createArticleFailure({ error }),
        ArticlesActions.updateArticleFailure({ error }),
        ArticlesActions.removeArticleFailure({ error })
      );

      effects.handleError$.subscribe(() => {
        expect(snackbarOpen).toHaveBeenCalledWith(MOCK_FIREBASE_ERROR.message);
        done();
      });
    });
    it(`should not call SnackbarOpen when is dispatched action without message from list:
        ArticlesActions.loadArticleByIdFailure,
        ArticlesActions.loadArticlesFailure,
        ArticlesActions.createArticleFailure,
        ArticlesActions.updateArticleFailure,
        ArticlesActions.removeArticleFailure.
      `, (done: any) => {
      const snackbarOpen = jest.spyOn(snackBar, 'open');

      const error = { ...MOCK_FIREBASE_ERROR, message: null };
      actions$ = of(
        ArticlesActions.loadArticleByIdFailure({ error }),
        ArticlesActions.loadArticlesFailure({ error }),
        ArticlesActions.createArticleFailure({ error }),
        ArticlesActions.updateArticleFailure({ error }),
        ArticlesActions.removeArticleFailure({ error })
      );

      effects.handleError$.subscribe(() => {
        expect(snackbarOpen).toHaveBeenCalledTimes(0);
        done();
      });
    });
  });
});
