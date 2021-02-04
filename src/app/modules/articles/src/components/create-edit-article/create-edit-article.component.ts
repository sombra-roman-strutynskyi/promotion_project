import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { isNullOrUndefined, SubscriptionDisposer, UiFormButton } from '@shared';
import { take, takeUntil } from 'rxjs/operators';
import { Article, IArticle } from '../../models';
import { ArticlesFacade } from '../../services';

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
  constructor(
    private articlesFacade: ArticlesFacade,
    private activatedRoute: ActivatedRoute,
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
            this.fields = this.getFields(article.imageUrl);
          }
        });
    } else {
      this.fields = this.getFields();
    }
    this.formButtons = this.getConfigFormButtons(!this.articleId);
  }

  getConfigFormButtons(isNew: boolean): UiFormButton[] {
    const formButtons: UiFormButton[] = [
      {
        label: isNew ? 'Create Article' : 'Update Article',
        type: 'submit',
        action: { type: 'submit' },
        style: {
          color: 'accent',
          type: 'raised',
        },
      },
      {
        label: 'Cancel',
        type: 'button',
        classWrapper: 'col-1',
        action: { type: 'cancel' },
        style: {
          color: 'primary',
        },
      },
    ];

    const deleteButton: UiFormButton = {
      label: 'Remove Article',
      type: 'button',
      classWrapper: 'col row',
      style: {
        color: 'warn',
        type: 'stroked',
      },
      action: {
        handler: () => this.onRemoveArticle(),
      },
    };
    return isNew ? formButtons : [deleteButton, ...formButtons];
  }

  getFields(imageUrl = '') {
    return [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12',
            key: 'title',
            type: 'input',
            templateOptions: {
              type: 'text',
              label: 'Title',
              required: true,
              minLength: 10,
              maxLength: 100,
            },
          },
          {
            className: 'col-12',
            key: 'body',
            type: 'textarea',
            templateOptions: {
              rows: 10,
              label: 'Body',
              required: true,
              minLength: 10,
            },
          },
          {
            className: 'col-12',
            key: 'image',
            type: 'file',
            templateOptions: {
              label: 'Image',
              required: !imageUrl,
              imageUrl,
            },
          },
        ],
      },
    ];
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
    this.articlesFacade.createArticle(article);
  }

  updateArticle(article: IArticle) {
    this.articlesFacade.updateArticle(article);
  }

  onCancel() {
    this.location.back();
  }

  onRemoveArticle() {
    this.articlesFacade.removeArticle(this.articleId);
  }
}
