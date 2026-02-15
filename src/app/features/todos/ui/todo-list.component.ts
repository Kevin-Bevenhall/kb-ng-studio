import { Component, input } from '@angular/core';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { Todo } from 'src/app/shared/models/todo';

@Component({
  selector: 'app-todo-list',
  imports: [HlmItemImports, HlmSeparatorImports],
  template: `
    <div hlmItemGroup>
      @for (todo of todos(); track todo.id) {
        <div hlmItem size="sm">
          <div hlmItemContent>
            <div hlmItemTitle> {{ todo.label }} </div>
          </div>
        </div>
        <hlm-separator></hlm-separator>
      }
    </div>
  `,
  styles: ``,
})
export class TodoListComponent {
  todos = input.required<Todo[]>();
}
