import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthFacade } from '@auth';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { SnackbarService } from '@shared';
import { AuthFacadeMock, RouterMock } from '@testing';
import { MOCK_FIREBASE_ERROR, MOCK_ARTICLE } from '@testing';
import * as ArticlesActions from '../state/articles.actions';
import { ArticlesEffects } from '../state/articles.effects';
import {
  ArticlesState,
  initialState,
  reducer,
  ARTICLES_FEATURE_KEY,
} from '../state/articles.reducer';
import { ArticlesDbService } from './articles-db.service';
import { ArticlesFacade } from './articles.facade';

interface TestSchema {
  article: ArticlesFacade;
}

describe('ArticlesFacade', () => {
  let facade: ArticlesFacade;
  let store: Store<TestSchema>;
  let mockInitialState: ArticlesState;
  let dispatchSpy;
  describe('used in NgModule', () => {
    beforeEach(() => {
      mockInitialState = {
        ...initialState,
        error: MOCK_FIREBASE_ERROR.message,
      };

      @NgModule({
        imports: [
          StoreModule.forFeature(ARTICLES_FEATURE_KEY, reducer, {
            initialState: mockInitialState,
          }),
          EffectsModule.forFeature([ArticlesEffects]),
        ],
        providers: [
          ArticlesFacade,
          {
            provide: ArticlesDbService,
            useValue: {},
          },
          {
            provide: AuthFacade,
            useClass: AuthFacadeMock,
          },
          {
            provide: Router,
            useClass: RouterMock,
          },
          {
            provide: SnackbarService,
            useValue: {},
          },
          {
            provide: MatDialog,
            useValue: {},
          },
        ],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}

      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(ArticlesFacade);

      dispatchSpy = spyOn(store, 'dispatch');
    });

    it('should return pending$ value', (done) => {
      facade.pending$.subscribe((pending) => {
        expect(pending).toEqual(mockInitialState.pending);
        done();
      });
    });
    it('should return allArticles$ value', (done) => {
      facade.allArticles$.subscribe((questionnaires) => {
        expect(questionnaires.length).toEqual(0);
        done();
      });
    });
    it('should return selectedArticle$ value', (done) => {
      facade.selectedArticle$.subscribe((selectedId) => {
        expect(selectedId).toBeFalsy();
        done();
      });
    });
    it('should return error$ value', (done) => {
      facade.error$.subscribe((error) => {
        expect(error).toEqual(mockInitialState.error);
        done();
      });
    });
    it('should dispatch loadArticleById action', () => {
      const id = MOCK_ARTICLE.id;
      const expectedAction = ArticlesActions.loadArticleById({ id });

      facade.loadArticleById(id);

      expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
    });
    it('should dispatch createArticle action', () => {
      const article = MOCK_ARTICLE;
      const expectedAction = ArticlesActions.createArticle({ article });

      facade.createArticle(article);

      expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
    });
    it('should dispatch updateArticle action', () => {
      const article = MOCK_ARTICLE;
      const expectedAction = ArticlesActions.updateArticle({ article });

      facade.updateArticle(article);

      expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
    });
    it('should dispatch loadArticles action', () => {
      const expectedAction = ArticlesActions.loadArticles();

      facade.loadArticles();

      expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
    });
    it('should dispatch removeArticle action', () => {
      const id = MOCK_ARTICLE.id;
      const expectedAction = ArticlesActions.removeArticle({ id });

      facade.removeArticle(id);

      expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
    });
  });
});
