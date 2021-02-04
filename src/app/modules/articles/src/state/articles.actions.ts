import { createAction, props } from '@ngrx/store';
import { IArticle } from '../models';

export const loadArticleById = createAction(
  '[Articles] Load Article By ID',
  props<{ id: string }>()
);

export const loadArticleByIdSuccess = createAction(
  '[Articles] Load Article By ID Success',
  props<{
    article: IArticle;
  }>()
);

export const loadArticleByIdFailure = createAction(
  '[Articles] Load Article By ID Failure',
  props<{ errors: string[] }>()
);

export const loadArticles = createAction('[Articles] Load Articles');

export const loadArticlesSuccess = createAction(
  '[Articles] Load Articles Success',
  props<{
    articles: IArticle[];
  }>()
);

export const loadArticlesFailure = createAction(
  '[Articles] Load Articles Failure',
  props<{ errors: string[] }>()
);

export const createArticle = createAction(
  '[Articles] Create Article',
  props<{ article: IArticle }>()
);

export const createArticleSuccess = createAction(
  '[Articles] Create Article Success',
  props<{ article: IArticle }>()
);

export const createArticleFailure = createAction(
  '[Articles] Create Article Failure',
  props<{ errors: string[] }>()
);

export const updateArticle = createAction(
  '[Articles] Update Article',
  props<{ article: IArticle }>()
);

export const updateArticleSuccess = createAction(
  '[Articles] Update Article Success',
  props<{ article: IArticle }>()
);

export const updateArticleFailure = createAction(
  '[Articles] Update Article Failure',
  props<{ errors: string[] }>()
);

export const removeArticle = createAction(
  '[Articles] Remove Article',
  props<{ id: string }>()
);

export const removeArticleSuccess = createAction(
  '[Articles] Remove Article Success',
  props<{ id: string }>()
);

export const removeArticleFailure = createAction(
  '[Articles] Remove Article Failure',
  props<{ errors: string[] }>()
);
