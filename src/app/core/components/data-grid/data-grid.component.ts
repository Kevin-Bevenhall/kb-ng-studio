import { SelectionModel } from '@angular/cdk/collections';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, computed, inject, input, linkedSignal, model, signal, viewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { StoreBaseService } from 'src/app/shared/services/store-base.service';
import { ConfirmDialogComponent, ConfirmDialogData } from '../confirm-dialog/confirm-dialog.component';
import { DataGridToolbarComponent } from './data-grid-toolbar/data-grid-toolbar.component';

export type DataGridColumn<T = any> = {
  columnDef: string,
  header: string,
  cell: (row: T) => any;
}

@Component({
  selector: 'app-data-grid',
  imports: [MatTableModule, TranslocoPipe, DataGridToolbarComponent, MatProgressSpinnerModule, MatSortModule, CdkDropList, CdkDrag],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss',
})
export class DataGridComponent<T> {
  private router = inject(Router);
  private dialog = inject(MatDialog);

  columns = input.required<DataGridColumn<T>[]>();
  dataService = input.required<StoreBaseService<T>>();
  detailUrl = input<string>();
  createUrl = input<string>();

  data = input.required<T[]>();
  isLoading = model.required<boolean>();
  hasError = input.required<boolean>();
  error = input.required<Error | undefined>();

  sort = viewChild(MatSort);

  dataSource = computed(() => {
    const dataSource = new MatTableDataSource(this.data());
    dataSource.sort = this.sort();
    return dataSource;
  });
  displayedColumns = linkedSignal(() => this.columns().map(c => c.columnDef));

  selection = new SelectionModel<number>(true);
  selectionCount = signal(0);

  columnDrop(event: CdkDragDrop<string>) {
    moveItemInArray(this.displayedColumns(), event.previousIndex, event.currentIndex);
  }

  onToolbarDeleteClick() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: <ConfirmDialogData>{
        title: 'DeleteItems',
        text: 'DeleteItemsConfirmationText'
      }
    });
    const dialogComponent = dialogRef.componentInstance;

    dialogComponent.confirm.subscribe(async () => {
      dialogComponent.loading.set(true);
      await this.deleteSelection();
      dialogRef.close();
    });

    dialogComponent.cancel.subscribe(() => {
      dialogRef.close()
    })
  }

  async deleteSelection() {
    await this.dataService().delete(this.selection.selected);

    this.selection.clear();
    this.selectionCount.set(0);
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