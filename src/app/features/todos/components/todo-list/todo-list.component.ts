import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-todo-list',
  imports: [MatListModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  private todoService = inject(TodoService);

  todosQuery = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: () => this.todoService.getAll(),
    refetchOnWindowFocus: false
  }))
}
