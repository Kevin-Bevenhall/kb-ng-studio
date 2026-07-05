import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, computed, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TranslocoPipe } from '@jsverse/transloco';

export type DataGridColumn<T = any> = {
  columnDef: string,
  header: string,
  cell: (row: T) => any;
}

@Component({
  selector: 'app-data-grid',
  imports: [MatTableModule, TranslocoPipe],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss',
})
export class DataGridComponent {
  dataSource = input.required<any[]>();
  columns = input.required<DataGridColumn<any>[]>();

  displayedColumns = computed(() => this.columns().map(c => c.columnDef));
}
