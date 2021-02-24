import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { AuthFacade } from '@auth';
import { ROUTES_DATA } from '@shared';
import { isEmpty, isNil } from 'lodash';
import { Observable } from 'rxjs';
import { filter, take, map, mergeMap } from 'rxjs/operators';
import { ArticlesFacade } from './articles.facade';
@Injectable()
export class ArticleEditGuard implements CanActivate {
  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private articlesFacade: ArticlesFacade
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.articlesFacade.loadArticleById(route.params.id);

    return this.getArticleAuthor().pipe(
      mergeMap((authorId) =>
        this.isCurrentUserId(authorId).pipe(
          map((isEqual) => {
            if (isEqual) {
              return true;
            }
            this.router.navigateByUrl(ROUTES_DATA.ARTICLES.url);
            return false;
          })
        )
      )
    );
  }

  private isCurrentUserId(authorId: string) {
    return this.authFacade.currentUser$.pipe(
      filter((d) => !isEmpty(d)),
      take(1),
      map(({ uid }) => uid === authorId)
    );
  }

  private getArticleAuthor() {
    return this.articlesFacade.selectedArticle$.pipe(
      filter((d) => !isNil(d)),
      take(1),
      map(({ authorId }) => authorId)
    );
  }
}
