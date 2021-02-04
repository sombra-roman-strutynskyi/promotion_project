import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ArticlesState,
  ARTICLES_FEATURE_KEY,
  articlesAdapter,
  ArticlesPartialState,
} from './articles.reducer';

export const getArticlesState = createFeatureSelector<
  ArticlesPartialState,
  ArticlesState
>(ARTICLES_FEATURE_KEY);

const { selectAll, selectEntities } = articlesAdapter.getSelectors();

export const getArticlesError = createSelector(
  getArticlesState,
  (state: ArticlesState) => state.errors
);
export const getSelectedId = createSelector(
  getArticlesState,
  (state: ArticlesState) => state.selectedId
);

export const getArticle = createSelector(
  getArticlesState,
  (state: ArticlesState) => selectEntities(state)
);

export const getSelected = createSelector(
  getArticle,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);

export const getAllArticles = createSelector(
  getArticlesState,
  (state: ArticlesState) => selectAll(state)
);

export const getPending = createSelector(
  getArticlesState,
  (state: ArticlesState) => state.pending
);

export const articlesQuery = {
  getArticlesError,
  getSelectedId,
  getArticle,
  getAllArticles,
  getPending,
  getSelected,
};
