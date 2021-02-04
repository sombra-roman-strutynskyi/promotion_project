import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined, SubscriptionDisposer } from '@shared';
import { filter, take, takeUntil } from 'rxjs/operators';
import { IArticle } from '../../models';
import { ArticlesFacade } from '../../services';

@Component({
  selector: 'app-preview-article',
  templateUrl: './preview-article.component.html',
  styleUrls: ['./preview-article.component.scss'],
})
export class PreviewArticleComponent
  extends SubscriptionDisposer
  implements OnInit {
  private articleId: string;
  article: IArticle;

  constructor(
    private articlesFacade: ArticlesFacade,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.activatedRoute.params.pipe(take(1)).subscribe(({ id }) => {
      if (!isNullOrUndefined(id)) {
        this.articleId = id;
      }
    });
    this.articlesFacade.loadArticleById(this.articleId);

    this.articlesFacade.selectedArticle$
      .pipe(takeUntil(this.ngSubject))
      .subscribe((article) => {
        if (!isNullOrUndefined(article)) {
          this.article = { ...article };
        }
      });
  }
}
