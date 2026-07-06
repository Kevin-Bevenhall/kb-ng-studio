import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { Todo } from 'src/app/core/api/models/todos/todo';
import { TodoDetailComponent } from '../../components/todo-detail/todo-detail.component';
import { TodoService } from 'src/app/shared/services/todo.service';
import { BaseDataDetail } from 'src/app/core/base/base-data-detail';

@Component({
  selector: 'app-todo-detail-page',
  imports: [TodoDetailComponent],
  templateUrl: './todo-detail-page.component.html',
  styleUrl: './todo-detail-page.component.scss',
})
export class TodoDetailPageComponent extends BaseDataDetail<Todo> {
  protected dataService = inject(TodoService);
  todoDetail = input.required<Todo>();
}
