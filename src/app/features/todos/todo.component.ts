import { Component, inject } from '@angular/core';
import { TodoService } from './data-access/todo.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-todo',
  imports: [],
  template: `
    <div>
      Todo works!
      <button (click)="getAll()">fetch</button>
    </div>
  `,
})
export class TodoComponent {
  private todoService = inject(TodoService);

  async getAll() {
    await lastValueFrom(this.todoService.getAll()).then((data) => console.log(data))
  }
}
