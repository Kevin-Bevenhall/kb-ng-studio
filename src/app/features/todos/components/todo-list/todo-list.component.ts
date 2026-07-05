import { Component, inject, OnInit } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { Todo } from 'src/app/core/api/models/todos/todo';
import { DataGridColumn, DataGridComponent } from 'src/app/core/components/data-grid/data-grid.component';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-todo-list',
  imports: [DataGridComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  private todoService = inject(TodoService);
  private translocoService = inject(TranslocoService);

  todosQuery = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: () => this.todoService.getAll(),
    refetchOnWindowFocus: false
  }));

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
}
