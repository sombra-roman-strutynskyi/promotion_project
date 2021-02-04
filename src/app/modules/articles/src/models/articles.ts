import { deepMerge, deepRemoveEmptyObjProperty, isArray } from '@shared';

export interface IArticle {
  id?: string;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  imageUrl: string;
  image?: File;
}

export class Article implements IArticle {
  id = '';
  title = '';
  body = '';
  createdAt = null;
  updatedAt = null;
  imageUrl = '';
  image = null;
  constructor(data: IArticle) {
    Object.assign(this, deepMerge(this, deepRemoveEmptyObjProperty(data)));
    // if (isArray(data.image)) {
    //   this.image = data.image[0]
    // }
  }
}
