import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Service()
export class TodoService {
  private http = inject(HttpClient);

  baseQueryUrl = '/api/v1/todos';

  getAll() {
    return firstValueFrom(this.http.get(this.baseQueryUrl));
  }

  getById(id: string) {
    return firstValueFrom(this.http.get(`${this.baseQueryUrl}/${id}`));
  }
}
