import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { IArticle } from '../models';

import * as ArticlesActions from './articles.actions';

export const ARTICLES_FEATURE_KEY = 'articles';
export interface ArticlesState extends EntityState<IArticle> {
  article?: IArticle;
  errors?: string[] | null;
  pending: boolean;
  selectedId: string;
}
export interface ArticlesPartialState {
  readonly [ARTICLES_FEATURE_KEY]: ArticlesState;
}

export function sortByDate(a: IArticle, b: IArticle): number {
  const date1 = new Date(a.updatedAt);
  const date2 = new Date(b.updatedAt);
  if (date1 === date2) {
    return 0;
  }
  return date1 > date2 ? -1 : 1;
}

export const articlesAdapter: EntityAdapter<IArticle> = createEntityAdapter<IArticle>(
  { selectId: ({ id }) => id, sortComparer: sortByDate }
);

export const initialState: ArticlesState = articlesAdapter.getInitialState({
  article: null,
  pending: false,
  selectedId: null,
});

const articlesReducer = createReducer(
  initialState,
  on(
    ArticlesActions.createArticle,
    ArticlesActions.updateArticle,
    ArticlesActions.loadArticleById,
    ArticlesActions.loadArticles,
    ArticlesActions.removeArticle,
    (state) => ({
      ...state,

      errors: null,
      pending: true,
    })
  ),
  on(ArticlesActions.createArticleSuccess, (state, { article }) =>
    articlesAdapter.setOne(article, {
      ...state,
      article,
      pending: false,
    })
  ),
  on(
    ArticlesActions.updateArticleSuccess,
    ArticlesActions.loadArticleByIdSuccess,
    (state, { article }) =>
      articlesAdapter.upsertOne(article, {
        ...state,
        article,
        pending: false,
      })
  ),
  on(ArticlesActions.loadArticleById, (state, { id }) => ({
    ...state,
    errors: null,
    pending: true,
    selectedId: id,
  })),
  on(ArticlesActions.loadArticlesSuccess, (state, { articles }) =>
    articlesAdapter.setAll(articles, {
      ...state,
      errors: null,
      pending: false,
    })
  ),
  on(ArticlesActions.removeArticleSuccess, (state, { id }) =>
    articlesAdapter.removeOne(id, {
      ...state,
      errors: null,
      pending: false,
    })
  )
  // on(
  //   ArticlesActions.loadArticlesFailure,
  //   ArticlesActions.loadArticleByIdFailure,
  //   ArticlesActions.updateArticleFailure,
  //   ArticlesActions.createArticleFailure,
  //   ArticlesActions.removeArticleFailure,
  //   (state, { errors }) => ({
  //     ...state,
  //     errors,
  //     pending: false,
  //   })
  // )
);

export function reducer(state: ArticlesState | undefined, action: Action) {
  return articlesReducer(state, action);
}
