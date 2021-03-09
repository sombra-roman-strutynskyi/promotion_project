import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthFacade } from '@auth';
import { ROUTES_DATA, SubscriptionDisposer } from '@shared';
import { isEmpty, isNil } from 'lodash';
import { filter, map, take, takeUntil } from 'rxjs/operators';
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
        take(1)
      )
      .subscribe((id) => {
        this.articleId = id;
        this.articlesFacade.loadArticleById(this.articleId);
      });

    this.articlesFacade.selectedArticle$
      .pipe(takeUntil(this.ngSubject))
      .subscribe((article) => {
        if (!isNil(article)) {
          this.article = { ...article };
        } else {
          this.router.navigateByUrl(ROUTES_DATA.ARTICLES.url);
        }
      });
    this.getCurrentUserId();
  }

  private getCurrentUserId(): void {
    this.authFacade.currentUser$
      .pipe(
        filter((d) => !isEmpty(d)),
        take(1),
        map(({ uid }) => uid)
      )
      .subscribe((id) => {
        this.currentUserId = id;
      });
  }
}
