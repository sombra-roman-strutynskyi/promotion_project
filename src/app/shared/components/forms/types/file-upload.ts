import { AfterViewInit, Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-file',
  template: `
    <input
      [id]="id"
      type="file"
      [formlyAttributes]="field"
      [formControl]="formControl"
    />
  `,
})
export class FormlyFieldFileComponent extends FieldType {}
