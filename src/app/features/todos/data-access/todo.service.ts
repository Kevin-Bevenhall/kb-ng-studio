import { HttpClient } from '@angular/common/http';
import { inject, Injectable, resource } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Todo } from 'src/app/shared/models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);
  private baseUrl = 'api/v1/todos/';

  todos = resource({
    loader: () => this.getAllTodos(),
  });

  async getAllTodos() {
    return lastValueFrom(this.http.get<Todo[]>(this.baseUrl));
  }

  async getTodoById() {
    
  }

  async addTodo() {
  }

  async deleteTodo() {

  }

  async updateTodo() {

  }
}
