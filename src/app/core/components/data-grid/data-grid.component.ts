import { Component, computed, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TranslocoPipe } from '@jsverse/transloco';
import { StoreBaseService } from 'src/app/shared/services/store-base.service';

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
  dataService = input.required<StoreBaseService<any>>();
  columns = input.required<DataGridColumn<any>[]>();

  dataSource = computed(() => this.dataService().data() ?? [])
  displayedColumns = computed(() => this.columns().map(c => c.columnDef));
}
