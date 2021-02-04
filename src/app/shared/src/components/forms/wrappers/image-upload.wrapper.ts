import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef,
  OnInit,
} from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-image-uploader',
  template: `
    <div class="image-uploader">
      <div class="image-uploader__header">
        {{ to.label }}
        <span *ngIf="to.required">*</span>
      </div>
      <div class="image-uploader__content">
        <img
          *ngIf="imageUrl"
          [src]="imageUrl"
          alt="user avatar"
          class="image-uploader__img"
        />
        <button
          type="button"
          class="image-uploader__button"
          mat-raised-button
          color="accent"
        >
          <label [for]="id"> Upload Image </label>
        </button>
        <ng-container #fieldComponent></ng-container>
      </div>
      <mat-error *ngIf="showError" [style.display]="'block'">
        <formly-validation-message
          [field]="field"
          [attr.data-test]="field.key"
        ></formly-validation-message>
      </mat-error>
    </div>
  `,
})
export class FormlyWrapperImageUploaderComponent
  extends FieldWrapper
  implements AfterViewInit, OnInit {
  @ViewChild('fieldComponent', { read: ViewContainerRef, static: true })
  fieldComponent: ViewContainerRef;
  reader = new FileReader();
  _imageUrl: string | ArrayBuffer;

  get imageUrl() {
    return this._imageUrl || this.to.imageUrl || './assets/images/picture.svg';
  }

  ngOnInit() {
    this.reader.onload = (e) => {
      this._imageUrl = e.target.result;
    };
  }

  ngAfterViewInit() {
    this.formControl.valueChanges.subscribe((res) => {
      this.reader.readAsDataURL(res[0]);
    });
  }
}
