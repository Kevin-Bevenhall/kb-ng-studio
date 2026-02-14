import { HttpClient } from '@angular/common/http';
import { inject, Injectable, resource, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);
  private baseUrl = 'api/v1/todos/todos';

  getAll() {
    return this.http.get('api/v1/todos/todos');
  }
}
