// tslint:disable:ban-types
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from '@env';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { UiFormlyService } from '../../../../services';

import { get } from '../../../../helpers';
import { UiFormButton } from '../../../../models';


@Component({
  selector: 'ui-base-form',
  templateUrl: 'ui-base-form.component.html',
  styleUrls: ['ui-base-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class UiBaseFormComponent implements OnInit, AfterViewInit {
  @Input()
  set pending(isPending: boolean) {
  }
  @Input() form = new FormGroup({});
  @Input() parentForm?: FormGroup;
  @Input() fields: FormlyFieldConfig[] = [];
  @Input() model: Object;
  @Input() formOptions: FormlyFormOptions;
  @Input() formButtons: UiFormButton[];
  @Input() formClasses = '';
  @Input() classButtonNames = 'btn btn-outline';
  @Input() showBtns = true;
  @Input() showErrorsModal = true;
  @Output() submitted = new EventEmitter<Object>();
  @Output() canceled = new EventEmitter<any>();
  @Output() debug = new EventEmitter<any>();
  isDebug = !environment.production;
  panelOpenState: false;

  constructor(
    private formlyService: UiFormlyService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.formlyService.bindFieldsToFormState(this.fields, {
      disabled: 'formState.disabled',
      disabledClassName: get('formState.disabledClassName', this.formOptions),
      validationShow: 'formState.showErrorState',
    });
    const validators = get('formState.validators', this.formOptions);
    if (validators) {
      this.form.setValidators(validators);
    }
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
    if (this.parentForm) {
      this.formlyService.bindChildControlsToParentForm(
        this.form,
        this.parentForm
      );
    }
  }

  handleAction(event) {
    if (event.type === 'submit') {
      this.submitForm();
    } else if (event.type === 'cancel') {
      this.cancel();
    } else if (event.type === 'reset') {
      this.resetForm();
    }
  }

  submitForm() {
    if (this.form.valid) {
      this.submitted.emit(this.model);
    }
  }
  resetForm() {
    this.formOptions.resetModel();
  }
  cancel() {
    this.canceled.emit(false);
  }

  onDebug(debugObj: any) {
    this.debug.emit(debugObj);
  }

  toggleState() {
    this.formOptions.formState.disabled = !this.formOptions.formState.disabled;
  }

  forceErrorState() {
    this.formOptions.formState.showErrorState = !this.formOptions.formState
      .showErrorState;
  }
}
