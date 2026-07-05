import { Component, inject, input, OnInit } from '@angular/core';
import { TodoService } from 'src/app/shared/services/todo.service';
import { TodoDetailComponent } from '../../components/todo-detail/todo-detail.component';

@Component({
  selector: 'app-todo-detail-page',
  imports: [TodoDetailComponent],
  templateUrl: './todo-detail-page.component.html',
  styleUrl: './todo-detail-page.component.scss',
})
export class TodoDetailPageComponent implements OnInit {
  private todoService = inject(TodoService);

  todoId = input.required<number>();

  ngOnInit(): void {
    this.todoService.setDetailId(this.todoId())
  }
}
