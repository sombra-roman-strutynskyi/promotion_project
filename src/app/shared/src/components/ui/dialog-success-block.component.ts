import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
interface IDialogSuccessData {
  text: string;
}
@Component({
  selector: 'ui-dialog-success-block',
  template: `
    <div>
      <div mat-dialog-content class="success-block">
        <mat-icon class="success-block__icon"> check </mat-icon>
        <p class="success-block__text">{{ data.text }}</p>
        <button mat-raised-button color="primary" (click)="onClick()">
          Ok
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .success-block {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .success-block__text {
        padding: 15px;
        margin: 0;
        text-align: center;
        color: rgba(0, 0, 0, 0.8);
        font-size: 16px;
        font-weight: 500;
      }
      .success-block__icon {
        height: 50px;
        width: 50px;
        color: #8bd76b;
        border: 3px solid currentColor;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 35px;
      }
    `,
  ],
})
export class DialogSuccessBlockComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogSuccessBlockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogSuccessData
  ) {}

  onClick() {
    this.dialogRef.close();
  }
}
