import { Component } from '@angular/core';
import { TodoCreateComponent } from '../../components/todo-create/todo-create.component';

@Component({
  selector: 'app-todo-create-page',
  imports: [TodoCreateComponent],
  templateUrl: './todo-create-page.component.html',
  styleUrl: './todo-create-page.component.scss',
})
export class TodoCreatePageComponent {
 }
