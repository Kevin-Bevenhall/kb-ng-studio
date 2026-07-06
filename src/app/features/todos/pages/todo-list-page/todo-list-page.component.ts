import { Component, inject, OnInit } from '@angular/core';
import { TodoService } from 'src/app/shared/services/todo.service';
import { TodoListComponent } from '../../components/todo-list/todo-list.component';

@Component({
  selector: 'app-todo-list-page',
  imports: [TodoListComponent],
  templateUrl: './todo-list-page.component.html',
  styleUrl: './todo-list-page.component.scss',
})
export class TodoListPageComponent implements OnInit {
  private todoService = inject(TodoService);

  ngOnInit(): void {
    this.todoService.load();
  }
}
