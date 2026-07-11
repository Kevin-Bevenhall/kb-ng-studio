import { Component, inject, input } from '@angular/core';
import { Todo } from 'src/app/core/api/models/todos/todo';
import { BaseDataDetailPage } from 'src/app/core/base/base-data-detail-page';
import { TodoService } from 'src/app/shared/services/todo.service';
import { TodoDetailComponent } from "../../components/todo-detail/todo-detail.component";

@Component({
  selector: 'app-todo-detail-page',
  imports: [TodoDetailComponent],
  templateUrl: './todo-detail-page.component.html',
  styleUrl: './todo-detail-page.component.scss',
})
export class TodoDetailPageComponent extends BaseDataDetailPage<Todo> {
  private todoService = inject(TodoService);
  protected dataService = this.todoService;

  todoDetail = input.required<Todo>();

}
