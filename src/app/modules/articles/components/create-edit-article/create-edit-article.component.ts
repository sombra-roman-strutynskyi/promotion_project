import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthFacade } from '@auth';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { SubscriptionDisposer, UiFormButton } from '@shared';
import { isEmpty, isNil } from 'lodash';
import { take, takeUntil, filter, map, tap } from 'rxjs/operators';
import { Article, IArticle } from '../../models';
import {
  ArticlesFacade,
  CreateEditArticleFormConfigService,
} from '../../services';

@Component({
  selector: 'articles-create-edit-article',
  templateUrl: './create-edit-article.component.html',
  styleUrls: ['./create-edit-article.component.scss'],
})
export class CreateEditArticleComponent
  extends SubscriptionDisposer
  implements OnInit {
  title: string;
  fields: FormlyFieldConfig[];
  formOptions: FormlyFormOptions = {
    formState: {
      showErrorState: false,
      disabled: false,
    },
  };
  formButtons: UiFormButton[];
  model = {} as IArticle;
  articleId: string;
  pending$ = this.articlesFacade.pending$;
  authorId: string;

  constructor(
    private articlesFacade: ArticlesFacade,
    private authFacade: AuthFacade,
    private activatedRoute: ActivatedRoute,
    private formService: CreateEditArticleFormConfigService,
    private location: Location
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
        })
      )
      .subscribe();

    this.configuringForm();
  }

  private configuringForm(): void {
    this.title = this.articleId ? 'Update Article' : 'Create Article';
    if (this.articleId) {
      this.articlesFacade.selectedArticle$
        .pipe(takeUntil(this.ngSubject))
        .subscribe((article: IArticle) => {
          if (isNil(article)) {
            this.articlesFacade.loadArticleById(this.articleId);
          } else {
            this.model = { ...article };
            this.fields = this.formService.getFormFields(article.imageUrl);
          }
        });
    } else {
      this.getAuthorId();
      this.fields = this.formService.getFormFields();
    }
    this.formButtons = this.formService.getFormButtons(
      !this.articleId,
      this.onRemoveArticle
    );
  }

  private getAuthorId(): void {
    this.authFacade.currentUser$
      .pipe(
        filter((d) => !isEmpty(d)),
        take(1),
        map(({ uid }) => uid)
      )
      .subscribe((id) => {
        this.authorId = id;
      });
  }

  public onSubmit(data: IArticle): void {
    const article = new Article(data);
    if (this.articleId) {
      this.updateArticle(article);
    } else {
      this.createArticle(article);
    }
  }

  private createArticle(article: IArticle): void {
    article.authorId = this.authorId;
    this.articlesFacade.createArticle(article);
  }

  private updateArticle(article: IArticle): void {
    this.articlesFacade.updateArticle(article);
  }

  public onCancel(): void {
    this.location.back();
  }

  public onRemoveArticle = (): void => {
    this.articlesFacade.removeArticle(this.articleId);
  };
}
