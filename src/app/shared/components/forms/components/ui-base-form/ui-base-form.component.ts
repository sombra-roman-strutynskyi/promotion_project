import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { get } from 'lodash';
import { UiFormButton } from '../../../../models';
import { UiFormlyService } from '../../../../services';

@Component({
  selector: 'ui-base-form',
  templateUrl: 'ui-base-form.component.html',
  styleUrls: ['ui-base-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class UiBaseFormComponent implements OnInit, AfterViewInit {
  @Input() form = new FormGroup({});
  @Input() parentForm?: FormGroup;
  @Input() fields: FormlyFieldConfig[] = [];
  @Input() model: {};
  @Input() formOptions: FormlyFormOptions;
  @Input() formButtons: UiFormButton[];
  @Input() formClasses = '';
  @Input() classButtonNames = '';
  @Input() showBtns = true;
  @Output() submitted = new EventEmitter<{}>();
  @Output() canceled = new EventEmitter<any>();
  @Output() debug = new EventEmitter<any>();

  constructor(
    private formlyService: UiFormlyService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.formlyService.bindFieldsToFormState(this.fields, {
      disabled: 'formState.disabled',
      disabledClassName: get(this.formOptions, 'formState.disabledClassName'),
      validationShow: 'formState.showErrorState',
    });
    const validators = get(this.formOptions, 'formState.validators');
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

  public handleAction(event): void {
    if (event.type === 'submit') {
      this.submitForm();
    } else if (event.type === 'cancel') {
      this.cancel();
    } else if (event.type === 'reset') {
      this.resetForm();
    }
  }

  private submitForm(): void {
    if (this.form.valid) {
      this.submitted.emit(this.model);
    }
  }
  private resetForm(): void {
    this.formOptions.resetModel();
  }
  private cancel(): void {
    this.canceled.emit(false);
  }
}
