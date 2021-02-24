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
  @Output() action: EventEmitter<any> = new EventEmitter();

  public click(type: string, payload: any, handler: () => void): void {
    payload = payload || this.model;
    this.action.emit({ type, payload: Object.assign({}, payload) });
    if (handler) {
      handler();
    }
  }
}
