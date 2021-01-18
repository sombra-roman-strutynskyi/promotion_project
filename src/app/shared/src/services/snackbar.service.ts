import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackbarService {
  constructor(public snackBar: MatSnackBar, private zone: NgZone) { }
  
  open(message) {
    this.zone.run(() => {
      this.snackBar.open(message, 'Dismiss', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }
}
