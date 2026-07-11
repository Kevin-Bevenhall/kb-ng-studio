import { Component, inject, signal } from '@angular/core';
import { form, required } from '@angular/forms/signals';
import { ActivatedRoute } from '@angular/router';
import { Todo, TodoPriorityEnum } from 'src/app/core/api/models/todos/todo';
import { DataDetailComponent, DetailField } from 'src/app/core/components/data-detail/data-detail.component';
import { TodoService } from 'src/app/shared/services/todo.service';
import { getEnumDataSource } from 'src/app/shared/utils/get-enum-data-source';

@Component({
  selector: 'app-todo-detail',
  imports: [DataDetailComponent],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss',
})
export class TodoDetailComponent {
  private todoService = inject(TodoService);
  private route = inject(ActivatedRoute);

  returnUrl = '/todos';

  todoModel = signal<Todo>(this.route.snapshot.data['todoDetail']);
  todoForm = form(this.todoModel, (schemaPath) => {
    required(schemaPath.name)
  });

  detailFields: DetailField[] = [
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
}
