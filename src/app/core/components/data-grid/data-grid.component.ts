import { SelectionModel } from '@angular/cdk/collections';
import { Component, computed, inject, input, model, signal, viewChild } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { StoreBaseService } from 'src/app/shared/services/store-base.service';
import { DataGridToolbarComponent } from './data-grid-toolbar/data-grid-toolbar.component';

@Component({
  selector: 'app-data-grid',
  imports: [MatTableModule, TranslocoPipe, DataGridToolbarComponent, MatProgressSpinnerModule, MatSortModule],
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
  isLoading = model.required<boolean>();
  hasError = input.required<boolean>();
  error = input.required<Error>();


  sort = viewChild(MatSort);

  dataSource = computed(() => {
    const dataSource = new MatTableDataSource(this.data());
    dataSource.sort = this.sort();
    return dataSource;
  });
  displayedColumns = computed(() => this.columns().map(c => c.columnDef));

  selection = new SelectionModel<number>(true);
  selectionCount = signal(0);

  onToolbarDeleteClick() {
    this.dataService().delete(this.selection.selected)
  }

  onToolbarReloadClick() {
    this.dataService().reloadData();
  }

  onToolbarCreateClick() {
    setTimeout(() => {
      this.router.navigateByUrl(`${this.createUrl()}`);
    }, 50);
  }

  onToolbarOpenDetailClick() {
    const selected = this.selection.selected;
    if (selected.length !== 1) {
      return;
    }
    this.router.navigateByUrl(`${this.detailUrl()}${selected}`)
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

    this.selectionCount.set(this.selection.selected.length);
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