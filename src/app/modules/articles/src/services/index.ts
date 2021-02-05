import { ArticlesDBService } from './articles-db.service';
import { ArticlesFacade } from './articles.facade';
import { CreateEditArticleFormConfigService } from './create-edit-article-form-config.service';

export const SERVICES = [
  ArticlesFacade,
  ArticlesDBService,
  CreateEditArticleFormConfigService,
];

export * from './articles.facade';
export * from './articles-db.service';
export * from './create-edit-article-form-config.service';
