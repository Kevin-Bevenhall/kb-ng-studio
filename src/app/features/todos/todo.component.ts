import { Component, inject } from '@angular/core';
import { TodoService } from './data-access/todo.service';

@Component({
  selector: 'app-todo',
  imports: [],
  template: `
    <div>
      Todo works!
      <button (click)="test()">fetch</button>
      <button (click)="update()">update todos</button>
    </div>
  `,
})
export class TodoComponent {
  private todoService = inject(TodoService);

  test() {
    console.log(this.todoService.todos.value())
  }

  update() {
    this.todoService.todos.update((todos) => [...todos? todos : [], { title: 'new', completed: false }] )
  }
}
