import { SelectionModel } from '@angular/cdk/collections';
import { Component, computed, inject, input, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { StoreBaseService } from 'src/app/shared/services/store-base.service';
import { DataGridToolbarComponent } from './data-grid-toolbar/data-grid-toolbar.component';

@Component({
  selector: 'app-data-grid',
  imports: [MatTableModule, TranslocoPipe, DataGridToolbarComponent, MatProgressSpinnerModule],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss',
})
export class DataGridComponent<T> {
  private router = inject(Router);

  columns = input.required<DataGridColumn<T>[]>();
  dataService = input.required<StoreBaseService<T>>();
  detailUrl = input<string>();
  createUrl = input<string>();

  data = input.required<T[]>();
  isLoading = input.required<boolean>();
  hasError = input.required<boolean>();
  error = input<Error>();

  displayedColumns = computed(() => this.columns().map(c => c.columnDef));

  selection = new SelectionModel(true);
  hasSelection = signal(false);

  onToolbarDeleteClick() {
    console.log('delete click')
  }

  onToolbarReloadClick() {
    this.dataService().reloadData();
  }

  onToolbarCreateClick() {
    this.router.navigateByUrl(`${this.createUrl()}`);
  }

  onRowClick(event: MouseEvent, id: number) {
    if (event.detail > 1) return;
    const isSelected = this.selection.isSelected(id);

    if (event.ctrlKey) {
      this.selection.toggle(id);
    } else {
      this.selection.clear();
      if (!isSelected) {
        this.selection.select(id);
      }
    }

    this.hasSelection.set(this.selection.hasValue());
  }

  onRowDblClick(event: MouseEvent, id: number) {
    this.router.navigateByUrl(`${this.detailUrl()}${id}`);
  }
}

export type DataGridColumn<T = any> = {
  columnDef: string,
  header: string,
  cell: (row: T) => any;
}