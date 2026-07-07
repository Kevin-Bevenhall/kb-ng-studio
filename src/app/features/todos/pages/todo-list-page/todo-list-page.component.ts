import { Component } from '@angular/core';
import { TodoListComponent } from '../../components/todo-list/todo-list.component';
import { TitleComponent } from 'src/app/core/components/title/title.component';

@Component({
  selector: 'app-todo-list-page',
  imports: [TodoListComponent, TitleComponent],
  templateUrl: './todo-list-page.component.html',
  styleUrl: './todo-list-page.component.scss',
})
export class TodoListPageComponent {

}
