import { Component, output } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-todo-toolbar',
  imports: [HlmButtonImports],
  template: `
  <div class="p-2 border-b-2">
    <button hlmBtn variant="cta" (click)="createTodo.emit()">New todo</button>
  </div>
  `,
  styles: ``,
})
export class TodoToolbarComponent {
  createTodo = output();
}
