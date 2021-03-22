import { Action } from '@ngrx/store';
import { MOCK_ARTICLE, MOCK_FIREBASE_ERROR } from '@testing';
import { IArticle } from '../models';
import * as ArticlesActions from './articles.actions';
import {
  ArticlesState,
  initialState,
  reducer,
  sortByDate,
} from './articles.reducer';

describe('Article Reducer', () => {
  const createArticleEntity = (id: string) =>
    ({ ...MOCK_ARTICLE, id } as IArticle);

  describe('Article Sorting Entity Adapter', () => {
    it('correct sorting Articles by date', () => {
      expect(
        sortByDate(
          { ...MOCK_ARTICLE, updatedAt: '2021-03-08T20:28:21.523Z' },
          { ...MOCK_ARTICLE, updatedAt: '2021-03-08T20:28:21.523Z' }
        )
      ).toBe(1);
      expect(
        sortByDate(
          { ...MOCK_ARTICLE, updatedAt: '2021-03-08T20:28:21.523Z' },
          { ...MOCK_ARTICLE, updatedAt: '2021-03-09T20:28:21.523Z' }
        )
      ).toBe(1);
      expect(
        sortByDate(
          { ...MOCK_ARTICLE, updatedAt: '2021-03-09T20:28:21.523Z' },
          { ...MOCK_ARTICLE, updatedAt: '2021-03-08T20:28:21.523Z' }
        )
      ).toBe(-1);
    });
  });
  describe('valid Article actions', () => {
    it('should reset error in state and set `true` for pending', () => {
      const actions = [
        ArticlesActions.createArticle,
        ArticlesActions.updateArticle,
        ArticlesActions.loadArticleById,
        ArticlesActions.loadArticles,
        ArticlesActions.removeArticle,
      ];

      actions.forEach((action) => {
        const state: ArticlesState = reducer(initialState, action as Action);

        expect(state.error).toEqual(null);
        expect(state.pending).toBe(true);
      });
    });
    it('createArticleSuccess should return set article', () => {
      const article = createArticleEntity('PRODUCT-AAA');

      const action = ArticlesActions.createArticleSuccess({ article });

      const state: ArticlesState = reducer(initialState, action as Action);

      expect(state.article.id).toEqual('PRODUCT-AAA');
      expect(state.error).toEqual(null);
      expect(state.pending).toBe(false);
    });
    it('updateArticleSuccess or loadArticleByIdSuccess should return set article', () => {
      const article = createArticleEntity('PRODUCT-AAA');

      const actions = [
        ArticlesActions.updateArticleSuccess,
        ArticlesActions.loadArticleByIdSuccess,
      ];

      actions.forEach((action) => {
        const state: ArticlesState = reducer(
          initialState,
          action({ article }) as Action
        );

        expect(state.article.id).toEqual('PRODUCT-AAA');
        expect(state.error).toEqual(null);
        expect(state.pending).toBe(false);
      });
    });
    it('loadArticleSuccess should return set the list of known Article', () => {
      const articles = [
        createArticleEntity('PRODUCT-AAA'),
        createArticleEntity('PRODUCT-zzz'),
      ];
      const action = ArticlesActions.loadArticlesSuccess({ articles });

      const result: ArticlesState = reducer(initialState, action);

      expect(result.error).toBe(null);
      expect(result.pending).toBe(false);
      expect(result.ids.length).toBe(2);
    });
    it('loadArticleById should return set the selectedId', () => {
      const id = 'PRODUCT-AAA';
      const action = ArticlesActions.loadArticleById({ id });

      const result: ArticlesState = reducer(initialState, action);

      expect(result.error).toBe(null);
      expect(result.pending).toBe(true);
      expect(result.selectedId).toBe(id);
    });
    it('removeArticleSuccess should return remove article by id', () => {
      const id = 'PRODUCT-AAA';
      const action = ArticlesActions.removeArticleSuccess({ id });

      const result: ArticlesState = reducer(
        {
          ...initialState,
          ids: ['PRODUCT-AAA'],
          entities: {
            'PRODUCT-AAA': { ...MOCK_ARTICLE, id: 'PRODUCT-AAA' },
          },
        },
        action
      );

      expect(result.ids.length).toBe(0);
      expect(result.error).toBe(null);
      expect(result.pending).toBe(false);
    });
    it('removeArticleSuccess should remove article by id', () => {
      const id = 'PRODUCT-AAA';
      const action = ArticlesActions.removeArticleSuccess({ id });

      const result: ArticlesState = reducer(
        {
          ...initialState,
          ids: ['PRODUCT-AAA'],
          entities: {
            'PRODUCT-AAA': { ...MOCK_ARTICLE, id: 'PRODUCT-AAA' },
          },
        },
        action
      );

      expect(result.ids.length).toBe(0);
      expect(result.error).toBe(null);
      expect(result.pending).toBe(false);
    });
    it('removeArticleSuccess should remove article by id', () => {
      const id = 'PRODUCT-AAA';
      const action = ArticlesActions.removeArticleSuccess({ id });

      const result: ArticlesState = reducer(
        {
          ...initialState,
          ids: ['PRODUCT-AAA'],
          entities: {
            'PRODUCT-AAA': { ...MOCK_ARTICLE, id: 'PRODUCT-AAA' },
          },
        },
        action
      );

      expect(result.ids.length).toBe(0);
      expect(result.error).toBe(null);
      expect(result.pending).toBe(false);
    });
    it('should set error in state and end pending', () => {
      const error = MOCK_FIREBASE_ERROR;
      const actions = [
        ArticlesActions.loadArticlesFailure,
        ArticlesActions.loadArticleByIdFailure,
        ArticlesActions.updateArticleFailure,
        ArticlesActions.createArticleFailure,
        ArticlesActions.removeArticleFailure,
      ];

      actions.forEach((action) => {
        const state: ArticlesState = reducer(
          initialState,
          action({ error }) as Action
        );

        expect(state.error).toEqual(MOCK_FIREBASE_ERROR.message);
        expect(state.pending).toBe(false);
      });
    });
  });
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
