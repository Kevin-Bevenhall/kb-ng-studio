import { Component, inject } from '@angular/core';
import { TodoService } from './data-access/todo.service';
import { Todo } from './../../shared/models/todo';
import { TodoListComponent } from './ui/todo-list.component';

@Component({
  selector: 'app-todo',
  imports: [TodoListComponent],
  template: `
    <div class="max-w-xl w-full mx-auto min-h-120 bg-card m-4 border border-solid border-sidebar-border rounded-md">
      <app-todo-list [todos]="todoService.todos.value() ?? []"></app-todo-list>
    </div>
  `,
})
export class TodoComponent {
  protected todoService = inject(TodoService);

  loadTodos() {
    console.log(this.todoService.todos.value());
  }

  updateOptimistically() {
    const newTodo: Todo = {
      is_completed: false,
      id: 102,
      label: 'new todo that was inserted optimistically',
      created_at: Date.now().toString(),
    };
    this.todoService.todos.value.update((prev) => [...(prev ? prev : []), newTodo]);

    console.log(this.todoService.todos.value());
  }
}
