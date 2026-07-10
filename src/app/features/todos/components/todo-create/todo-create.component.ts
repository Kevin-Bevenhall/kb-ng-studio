import { Component, inject, signal } from "@angular/core";
import { form, minLength, required } from "@angular/forms/signals";
import { Router } from "@angular/router";
import { TodoCreate, TodoPriorityEnum } from "src/app/core/api/models/todos/todo";
import { AddField, DataAddComponent } from "src/app/core/components/data-add/data-add.component";
import { TodoService } from "src/app/shared/services/todo.service";
import { getEnumDataSource } from "src/app/shared/utils/get-enum-data-source";

@Component({
  selector: 'app-todo-create',
  imports: [DataAddComponent],
  templateUrl: './todo-create.component.html',
  styleUrl: './todo-create.component.scss',
})
export class TodoCreateComponent {
  protected todoService = inject(TodoService);
  private router = inject(Router);

  returnUrl = '/todos';

  todoModel = signal<TodoCreate>({ name: '', priority: '' });
  todoForm = form(this.todoModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is required.' });
  });

  todoFields: AddField[] = [
    {
      caption: 'Name',
      type: 'text',
      formField: this.todoForm.name
    },
    {
      caption: 'Priority',
      type: 'select',
      formField: this.todoForm.priority,
      options: getEnumDataSource(TodoPriorityEnum)
    }
  ];

  test() {
    console.log(this.todoForm().value())
  }

}