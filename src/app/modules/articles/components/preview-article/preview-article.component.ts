import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthFacade } from '@auth';
import { ROUTES_DATA, SubscriptionDisposer } from '@shared';
import { isEmpty, isNil } from 'lodash';
import {
  filter,
  map,
  take,
  takeUntil,
  tap,
  distinctUntilChanged,
  debounceTime,
} from 'rxjs/operators';
import { IArticle } from '../../models';
import { ArticlesFacade } from '../../services';
@Component({
  selector: 'articles-preview-article',
  templateUrl: './preview-article.component.html',
  styleUrls: ['./preview-article.component.scss'],
})
export class PreviewArticleComponent
  extends SubscriptionDisposer
  implements OnInit {
  private articleId: string;
  currentUserId: string;
  article: IArticle;
  pending$ = this.articlesFacade.pending$;
  constructor(
    private articlesFacade: ArticlesFacade,
    private authFacade: AuthFacade,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        map(({ id }) => id),
        filter((d) => !isNil(d)),
        take(1),
        tap((id) => {
          this.articleId = id;
          this.articlesFacade.loadArticleById(this.articleId);
        })
      )
      .subscribe();

    this.articlesFacade.selectedArticle$
      .pipe(
        debounceTime(750),
        distinctUntilChanged(),
        takeUntil(this.ngSubject),
        tap((article) => {
          if (!isNil(article)) {
            this.article = { ...article };
          } else {
            this.router.navigateByUrl(ROUTES_DATA.ARTICLES.url);
          }
        })
      )
      .subscribe();
    this.getCurrentUserId();
  }

  private getCurrentUserId(): void {
    this.authFacade.currentUser$
      .pipe(
        filter((d) => !isEmpty(d)),
        take(1),
        map(({ uid }) => uid),
        tap((id) => {
          this.currentUserId = id;
        })
      )
      .subscribe();
  }
}
