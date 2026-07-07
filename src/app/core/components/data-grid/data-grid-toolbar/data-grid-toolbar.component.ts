import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-data-grid-toolbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, TranslocoPipe],
  templateUrl: './data-grid-toolbar.component.html',
  styleUrl: './data-grid-toolbar.component.scss',
})
export class DataGridToolbarComponent {
  hasSelection = input<boolean>();

  delete = output();
  reload = output();
  create = output();

  onCreateButtonClick() {
    this.create.emit();
  }

  onDeleteButtonClick() {
    this.delete.emit();
  }

  onReloadButtonClick() {
    this.reload.emit();
  }
}
