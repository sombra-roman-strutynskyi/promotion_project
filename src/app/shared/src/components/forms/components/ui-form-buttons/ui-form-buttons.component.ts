import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UiFormButton } from '../../../../models';

@Component({
  selector: 'ui-form-buttons',
  templateUrl: './ui-form-buttons.component.html',
  styleUrls: ['./ui-form-buttons.component.scss'],
})
export class UiFormButtonsComponent {
  @Input() buttons: UiFormButton[] = [];
  @Input() form: FormGroup;
  @Input() model: any = {};
  @Input() classNames = 'btn';
  @Output() action: EventEmitter<any> = new EventEmitter();

  click(type, payload, handler) {
    payload = payload || this.model;
    this.action.emit({ type, payload: Object.assign({}, payload) });
    if (handler) {
      handler();
    }
  }
}
