import { SelectionModel } from '@angular/cdk/collections';
import { Component, computed, inject, input } from '@angular/core';
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

  data = input.required<T[]>();
  isLoading = input.required<boolean>();
  hasError = input.required<boolean>();
  error = input<Error>();

  displayedColumns = computed(() => this.columns().map(c => c.columnDef));

  selectedRows = new SelectionModel<number>(true);

  onToolbarDeleteClick() {
    console.log('delete click')
  }

  onToolbarReloadClick() {
    this.dataService().reloadData();
  }

  onRowClick(event: MouseEvent, id: number) {
    console.log(event)
    this.selectedRows.toggle(id);
    console.log(this.selectedRows.selected)
  }
}

export type DataGridColumn<T = any> = {
  columnDef: string,
  header: string,
  cell: (row: T) => any;
}