import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Todo } from 'src/app/core/api/models/todos/todo';

@Service()
export class TodoService {
  private http = inject(HttpClient);

  baseQueryUrl = '/api/v1/todos';

  getAll() {
    return firstValueFrom(this.http.get<Todo[]>(this.baseQueryUrl));
  }

  getById(id: string) {
    return firstValueFrom(this.http.get<Todo>(`${this.baseQueryUrl}/${id}`));
  }
}
