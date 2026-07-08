import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/core/api/models/todos/todo';
import { DataGridColumn, DataGridComponent } from 'src/app/core/components/data-grid/data-grid.component';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-todo-list',
  imports: [DataGridComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
  providers: [DatePipe]
})
export class TodoListComponent implements OnInit {
  protected todoService = inject(TodoService);
  private router = inject(Router);
  private datePipe = inject(DatePipe);

  detailUrl = '/todos/';
  createUrl = '/todos/create';

  data = this.todoService.data;
  isLoading = this.todoService.isLoading;
  hasError = this.todoService.hasError;
  error = this.todoService.error;

  columns: DataGridColumn<Todo>[] = [
    {
      columnDef: 'name',
      header: 'Name',
      cell: (todo) => todo.name
    },
    {
      columnDef: 'created_at',
      header: 'Created',
      cell: (todo) => this.datePipe.transform(todo.created_at, 'HH:mm, yyyy-MM-dd'),
    }
  ]

  ngOnInit(): void {
    this.todoService.reloadData();
  }

  route() {
    this.router.navigateByUrl('/todos/38');
  }
}
