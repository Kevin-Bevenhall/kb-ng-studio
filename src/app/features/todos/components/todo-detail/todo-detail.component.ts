import { Component, inject, input } from '@angular/core';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-todo-detail',
  imports: [],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss',
})
export class TodoDetailComponent {
  private todoService = inject(TodoService);

  todoId = input.required<string>();

  async test() {
    const data = await this.todoService.getById('20');
    console.log(data)
  }
}
