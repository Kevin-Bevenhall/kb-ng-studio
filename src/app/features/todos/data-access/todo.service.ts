import { HttpClient } from '@angular/common/http';
import { inject, Injectable, resource, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Todo } from 'src/app/shared/models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);
  private baseUrl = 'api/v1/todos/';

  todos = resource({
    params: () => ({}),
    loader: ({}) => this.getAll(),
  });

  getAll() {
    return lastValueFrom(this.http.get<Todo[]>('api/v1/todos'));
  }
}
