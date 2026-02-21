import { Component, inject } from '@angular/core';
import { TodoService } from './data-access/todo.service';
import { TodoListComponent } from './ui/todo-list.component';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { Router } from '@angular/router';
import { TodoToolbarComponent } from './ui/todo-toolbar.component';
import { HlmDialogService } from '@spartan-ng/helm/dialog';
import { TodoCreateDialogComponent } from './ui/todo-create-dialog.component';

@Component({
  selector: 'app-todo',
  imports: [TodoListComponent, HlmButtonImports, TodoToolbarComponent],
  template: `
    <div class="max-w-xl mx-auto bg-card border border-solid border-sidebar-border rounded-md max-h-160 h-full">
      <app-todo-toolbar (createTodo)="openCreateDialog()"></app-todo-toolbar>
      <app-todo-list [todos]="todoService.todos.value() ?? []"></app-todo-list>
    </div>
  `,
})
export class TodoComponent {
  protected todoService = inject(TodoService);
  private dialogService = inject(HlmDialogService);
  private router = inject(Router);

  openCreateDialog() {
    this.dialogService.open(TodoCreateDialogComponent, {
      contentClass: 'w-md',
    });
  }
}
