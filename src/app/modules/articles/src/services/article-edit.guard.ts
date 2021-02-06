import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  ActivatedRoute,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { AuthFacade } from '@auth';
import { isEmptyObject, ROUTES_DATA, isNullOrUndefined } from '@shared';
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
            console.log(isEqual);
            console.log(authorId);

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
      filter((d) => !isEmptyObject(d)),
      take(1),
      map(({ uid }) => uid === authorId)
    );
  }

  private getArticleAuthor() {
    return this.articlesFacade.selectedArticle$.pipe(
      filter((d) => !isNullOrUndefined(d)),
      take(1),
      map(({ authorId }) => authorId)
    );
  }
}
