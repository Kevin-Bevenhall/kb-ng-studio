import { HttpClient } from '@angular/common/http';
import { inject, Injectable, resource } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Todo } from 'src/app/shared/models/todo';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private baseUrl = 'api/v1/todos';

  todos = resource({
    loader: () => this.getAllTodos(),
  });

  async getAllTodos() {
    return lastValueFrom(this.http.get<Todo[]>(this.baseUrl));
  }

  async getById() {}

  async addTodo(title: string) {
    return lastValueFrom(this.http.post(this.baseUrl, { title }, { withCredentials: true }));
  }

  async delete() {}

  async update() {}
}
