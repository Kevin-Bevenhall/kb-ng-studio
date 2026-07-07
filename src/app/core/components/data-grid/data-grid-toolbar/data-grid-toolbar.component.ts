import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-data-grid-toolbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './data-grid-toolbar.component.html',
  styleUrl: './data-grid-toolbar.component.scss',
})
export class DataGridToolbarComponent {
  delete = output();
  reload = output();

  onDeleteButtonClick() {
    this.delete.emit();
  }

  onReloadButtonClick() {
    this.reload.emit();
  }
}
