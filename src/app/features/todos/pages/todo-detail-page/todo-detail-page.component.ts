import { Component, input } from '@angular/core';
import { TodoDetailComponent } from '../../components/todo-detail/todo-detail.component';

@Component({
  selector: 'app-todo-detail-page',
  imports: [TodoDetailComponent],
  templateUrl: './todo-detail-page.component.html',
  styleUrl: './todo-detail-page.component.scss',
})
export class TodoDetailPageComponent {
  todoId = input.required<string>();
}
