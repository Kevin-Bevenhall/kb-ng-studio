import { Component, inject, signal } from '@angular/core';
import { form, FormField, minLength, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { TodoService } from 'src/app/shared/services/todo.service';
import { getEnumDataSource } from 'src/app/shared/utils/get-enum-data-source';

interface TodoAdd {
  name: string;
  priority: TodoPriorityEnum | '';
}

enum TodoPriorityEnum {
  Low = "low",
  Medium = "medium",
  High = "high",
  Critical = 'critical'
}

@Component({
  selector: 'app-todo-create',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormField, MatButtonModule, MatProgressSpinner, TranslocoPipe],
  templateUrl: './todo-create.component.html',
  styleUrl: './todo-create.component.scss',
})
export class TodoCreateComponent {
  private router = inject(Router);
  private todoService = inject(TodoService);

  priorities = getEnumDataSource(TodoPriorityEnum);

  todoModel = signal<TodoAdd>({
    name: '',
    priority: ''
  });

  todoForm = form(this.todoModel, (schemaPath) => {
    required(schemaPath.name);
    minLength(schemaPath.name, 3);
    required(schemaPath.priority);
  });

  isCreating = signal(false);

  async submit(event: SubmitEvent) {
    event.preventDefault();
    this.isCreating.set(true);
    await this.todoService.create(this.todoForm().value());
    this.router.navigateByUrl('/todos');
  }

  return() {
    this.router.navigateByUrl('/todos');
  }
}