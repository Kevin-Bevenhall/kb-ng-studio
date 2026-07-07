import { Component, effect, inject, input } from '@angular/core';
import { Todo } from 'src/app/core/api/models/todos/todo';
import { BaseDataDetail } from 'src/app/core/base/base-data-detail-page';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-todo-detail',
  imports: [],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss',
})
export class TodoDetailComponent extends BaseDataDetail<Todo> {
  protected todoService = inject(TodoService);
  protected dataService = this.todoService;
  todoId = input.required<number>();

  constructor() {
    super();

    effect(() => {
      this.todoService.setDetailId(this.todoId);
    })
  }
}
