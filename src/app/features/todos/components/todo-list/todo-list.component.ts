import { Component, inject } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-todo-list',
  imports: [],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  private todoService = inject(TodoService);

  todosQuery = injectQuery(() => ({
    queryKey: ['todos'],
    queryFn: () => this.todoService.getAll()
  }));

  test() {
    console.log(this.todosQuery.data())
  }
}
