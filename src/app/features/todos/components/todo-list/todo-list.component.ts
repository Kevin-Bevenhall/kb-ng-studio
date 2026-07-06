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
})
export class TodoListComponent implements OnInit {
  protected todoService = inject(TodoService);
  private router = inject(Router);

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
      columnDef: 'created',
      header: 'Created',
      cell: (todo) => todo.created_at
    }
  ]

  ngOnInit(): void {
    this.todoService.reloadData();
  }

  route() {
    this.router.navigateByUrl('/todos/38');
  }
}
