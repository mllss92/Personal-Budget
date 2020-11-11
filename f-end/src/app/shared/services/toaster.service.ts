import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  private config: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  };

  constructor(private toaster: MatSnackBar) { }

  success(message: string): void {
    this.config.panelClass = 'success';
    this.toaster.open(message, 'Success!', this.config);
  }

  error(message: string): void {
    this.config.panelClass = 'error';
    this.toaster.open(message, 'Failed!', this.config);
  }
}
