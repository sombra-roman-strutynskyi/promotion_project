import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDialogPasswordConformationData } from '../../models';

@Component({
  selector: 'app-dialog-password-conformation',
  templateUrl: './dialog-password-conformation.component.html',
  styleUrls: ['./dialog-password-conformation.component.scss'],
})
export class DialogPasswordConformationComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogPasswordConformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogPasswordConformationData
  ) {}
}
