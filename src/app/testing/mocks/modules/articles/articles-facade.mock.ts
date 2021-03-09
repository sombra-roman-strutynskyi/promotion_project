import { Injectable } from '@angular/core';
import { ArticlesFacade } from '@modules/articles';
import { of } from 'rxjs';
import { MOCK_ARTICLE } from './articles-data.mock';

@Injectable()
export class ArticlesFacadeMock implements Partial<ArticlesFacade> {
  pending$ = of(null);
  article$ = of(null);
  selectedArticle$ = of(MOCK_ARTICLE);
  allArticles$ = of([MOCK_ARTICLE]);
  loadArticleById = jest.fn();
  createArticle = jest.fn();
  updateArticle = jest.fn();
  loadArticles = jest.fn();
  removeArticle = jest.fn();
}
