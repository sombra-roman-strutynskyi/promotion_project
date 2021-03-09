import { Article, IArticle } from '@modules/articles';

export const MOCK_CREATE_ARTICLE = {
  title: 'title',
  body: 'body',
  image: [new File([''], 'test.jpg', { type: 'image/jpeg' })],
};

export const MOCK_EDIT_ARTICLE = {
  ...MOCK_CREATE_ARTICLE,
  id: '1',
  imageUrl: 'image',
  authorId: '1',
};

export const MOCK_ARTICLE: IArticle = {
  ...MOCK_EDIT_ARTICLE,
  createdAt: '2021-03-09T20:28:21.523Z',
  updatedAt: '2021-03-09T20:28:22.523Z',
};

export const MOCK_MODIFY_ARTICLE: IArticle = new Article(MOCK_ARTICLE);
