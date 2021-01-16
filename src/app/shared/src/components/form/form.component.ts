import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { IFormField, IFormFieldSyncValidation } from '../../models';
import { FormService } from '../../services';
import { SubscriptionDisposer } from '../../utils';

@Component({
  selector: 'ui-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent extends SubscriptionDisposer implements OnInit {
  _model: object;
  @Input() form = new FormGroup({});
  @Input() fields: IFormField[] = [];
  @Input() set model(data: object) {
    console.log(data);
    console.log(this.fields);
    
    this.form.setValue(data);
  }
  get model() {
    return this._model;
  }
  @Output() submitted = new EventEmitter<object>();
  @Output() canceled = new EventEmitter<boolean>();
  constructor(private formService: FormService) {
    super();
  }

  ngOnInit() {
    this.configForm();
    this.form.valueChanges
      .pipe(takeUntil(this.ngSubject))
      .subscribe((model) => {
        this._model = model;
      });
  }

  configForm() {
    this.formService
      .generateFormGroup(this.fields)
      .forEach(([key, control]) => {
        this.form.addControl(key, control);
      });
  }

  getSyncValidators(validationRules: IFormFieldSyncValidation) {
    return Object.entries(validationRules).reduce((rules, [key, val]) => {
      switch (key) {
        case 'required':
          if (val as boolean) {
            rules.push(Validators.required);
          }
          break;
        case 'pattern':
          rules.push(Validators.pattern(val as RegExp));
          break;
        default:
          break;
      }
      return rules;
    }, []);
  }

  submitForm() {
    if (this.form.valid) {
      this.submitted.emit(this.model);
    }
  }
  reset() {
    this.form.reset();
  }
  cancel() {
    this.canceled.emit(false);
  }
}
