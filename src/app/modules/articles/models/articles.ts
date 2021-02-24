import { deepMerge, deepRemoveEmptyObjProperty } from '@shared';

export interface IArticle {
  id?: string;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  image?: File;
  authorId: string;
}

export class Article implements IArticle {
  id = '';
  title = '';
  body = '';
  createdAt = null;
  updatedAt = null;
  imageUrl = '';
  image = null;
  authorId = '';
  constructor(data: IArticle) {
    Object.assign(this, deepMerge(this, deepRemoveEmptyObjProperty(data)));
  }
}
