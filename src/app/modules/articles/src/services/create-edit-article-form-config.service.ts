// tslint:disable: ban-types
import { Injectable } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { UiFormButton } from '@shared';

@Injectable()
export class CreateEditArticleFormConfigService {
  getFormButtons(isNew: boolean, removeArticleFn: Function): UiFormButton[] {
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
        handler: () => removeArticleFn(),
      },
    };
    return isNew ? formButtons : [deleteButton, ...formButtons];
  }

  getFormFields(imageUrl = ''): FormlyFieldConfig[] {
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
            validation: {
              show: true,
              messages: {
                required: () => `Please select image`,
              },
            },
          },
        ],
      },
    ];
  }
}
