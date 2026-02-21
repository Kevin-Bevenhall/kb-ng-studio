import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrnDialogRef } from '@spartan-ng/brain/dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { TodoService } from '../data-access/todo.service';

@Component({
  selector: 'app-todo-create-dialog',
  imports: [HlmDialogImports, HlmButtonImports, HlmInputImports, FormsModule],
  template: `
    <div class="flex flex-col gap-5">
      <hlm-dialog-header>
        <h3 hlmDialogTitle>Add a new todo</h3>
      </hlm-dialog-header>
      <div>
        <input
          hlmInput
          type="text"
          placeholder="Title"
          [(ngModel)]="title" />
      </div>
      <hlm-dialog-footer>
        <button
          hlmBtn
          hlmDialogClose
          size="sm"
          variant="destructive">
          Cancel
        </button>
        <button
          hlmBtn
          type="submit"
          variant="cta"
          size="sm"
          [disabled]="!title()"
          (click)="addTodo()">
          Add todo
        </button>
      </hlm-dialog-footer>
    </div>
  `,
})
export class TodoCreateDialogComponent {
  private todoService = inject(TodoService);
  private dialogRef = inject(BrnDialogRef);
  title = signal('');

  addTodo() {
    this.todoService.addTodo(this.title()).then(() => this.dialogRef.close())
  }
}
