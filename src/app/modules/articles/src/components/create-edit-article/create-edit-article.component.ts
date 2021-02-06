import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthFacade, IUser } from '@auth';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import {
  isEmptyObject,
  isNullOrUndefined,
  SubscriptionDisposer,
  UiFormButton,
} from '@shared';
import { take, takeUntil, filter, map } from 'rxjs/operators';
import { Article, IArticle } from '../../models';
import {
  ArticlesFacade,
  CreateEditArticleFormConfigService,
} from '../../services';

@Component({
  selector: 'app-create-edit-article',
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
    this.activatedRoute.params.pipe(take(1)).subscribe(({ id }) => {
      if (!isNullOrUndefined(id)) {
        this.articleId = id;
      }
    });

    this.configuringForm();
  }

  configuringForm() {
    this.title = this.articleId ? 'Update Article' : 'Create Article';
    if (this.articleId) {
      this.articlesFacade.selectedArticle$
        .pipe(takeUntil(this.ngSubject))
        .subscribe((article: IArticle) => {
          if (isNullOrUndefined(article)) {
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

  getAuthorId() {
    this.authFacade.currentUser$
      .pipe(
        filter((d) => !isEmptyObject(d)),
        take(1),
        map(({ uid }) => uid)
      )
      .subscribe((id) => {
        this.authorId = id;
      });
  }

  onSubmit(data: IArticle) {
    const article = new Article(data);
    if (this.articleId) {
      this.updateArticle(article);
    } else {
      this.createArticle(article);
    }
  }

  createArticle(article: IArticle) {
    article.authorId = this.authorId;
    this.articlesFacade.createArticle(article);
  }

  updateArticle(article: IArticle) {
    this.articlesFacade.updateArticle(article);
  }

  onCancel() {
    this.location.back();
  }

  onRemoveArticle = () => {
    this.articlesFacade.removeArticle(this.articleId);
  };
}
