import { MOCK_ARTICLE } from '@testing';
import { IArticle } from '../models';
import {
  articlesAdapter,
  ArticlesState,
  initialState,
} from './articles.reducer';
import { articlesQuery } from './articles.selectors';

describe('Articles Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const TOTAL_ELEM = 3;
  let state;

  const getArticleId = (it) => it['id'];
  const createArticleEntity = (id: string) =>
    ({ ...MOCK_ARTICLE, id } as IArticle);

  beforeEach(() => {
    state = {
      articles: articlesAdapter.setAll(
        [
          createArticleEntity('PRODUCT-AAA'),
          createArticleEntity('PRODUCT-BBB'),
          createArticleEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          pending: false,
        }
      ),
    };
  });

  describe('Articles Selectors', () => {
    it('getAllArticles() should return the list of Articles', () => {
      const results = articlesQuery.getAllArticles(state);
      const selId = getArticleId(results[1]);

      expect(results.length).toBe(TOTAL_ELEM);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = articlesQuery.getSelected(state);
      const selId = getArticleId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });
    it('getPending() should return "false"', () => {
      const results = articlesQuery.getPending(state);

      expect(results).toBe(false);
    });

    it('getError() should return error messages', () => {
      const results = articlesQuery.getError(state);

      expect(results).toEqual(ERROR_MSG);
    });
  });
});
