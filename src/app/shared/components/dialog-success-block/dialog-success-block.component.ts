import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface IDialogSuccessData {
  text: string;
}
@Component({
  selector: 'ui-dialog-success-block',
  templateUrl: './dialog-success-block.component.html',
  styleUrls: ['./dialog-success-block.component.scss'],
})
export class DialogSuccessBlockComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogSuccessBlockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogSuccessData
  ) {}

  public onClick(): void {
    this.dialogRef.close();
  }
}
