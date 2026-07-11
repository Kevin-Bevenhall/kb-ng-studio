import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-snackbar',
  imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction, TranslocoPipe],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class SnackbarComponent { 
  snackbarRef = inject(MatSnackBarRef);

  onDismiss() {
    this.snackbarRef.dismissWithAction();
  }
}
