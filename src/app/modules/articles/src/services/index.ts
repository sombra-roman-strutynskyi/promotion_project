import { ArticlesDBService } from './articles-db.service';
import { ArticlesFacade } from './articles.facade';

export const SERVICES = [ArticlesFacade, ArticlesDBService];

export * from './articles.facade';
export * from './articles-db.service';
