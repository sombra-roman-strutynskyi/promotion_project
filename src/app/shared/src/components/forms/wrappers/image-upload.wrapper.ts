import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';
import { Subject, Observable } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined, isString } from '../../../helpers';

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
          *ngIf="!formControl.disabled"
          type="button"
          class="image-uploader__button"
          mat-stroked-button
          color="primary"
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
  implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('fieldComponent', { read: ViewContainerRef, static: true })
  fieldComponent: ViewContainerRef;

  private ngSubject = new Subject<void>();
  private reader = new FileReader();
  _imageUrl: string | ArrayBuffer;

  get imageUrl() {
    const placeholderImg = './assets/images/picture.svg';
    return this._imageUrl || this.to.imageUrl || placeholderImg;
  }

  ngOnInit() {
    this.reader.onload = (e) => {
      this._imageUrl = e.target.result;
    };
    if (!this.to.imageUrl && this.to.imageUrl$) {
      this.to.imageUrl$
        .pipe(
          filter((v) => !isNullOrUndefined(v)),
          takeUntil(this.ngSubject)
        )
        .subscribe((imageUrl) => {
          this._imageUrl = imageUrl;
        });
    }
  }

  ngAfterViewInit() {
    this.formControl.valueChanges
      .pipe(takeUntil(this.ngSubject))
      .subscribe((res) => {
        if (isNullOrUndefined(res) || !res.length) {
          this.resetImage();
        } else {
          this.reader.readAsDataURL(res[0]);
        }
      });
  }

  private resetImage() {
    if (this.to.imageUrl) {
      this._imageUrl = this.to.imageUrl;
    }
    if (!this.to.imageUrl && this.to.imageUrl$) {
      this.to.imageUrl$
        .pipe(
          filter((v) => !isNullOrUndefined(v)),
          take(1)
        )
        .subscribe((imageUrl) => {
          this._imageUrl = imageUrl;
        });
    }
  }
  ngOnDestroy(): void {
    this.ngSubject.next();
    this.ngSubject.complete();
  }
}
