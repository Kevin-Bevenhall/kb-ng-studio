import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Service()
export abstract class BaseService<T> {
  protected http = inject(HttpClient);

  abstract baseQueryUrl: string;

  getAll() {
    return firstValueFrom(this.http.get(this.baseQueryUrl))
  }
}
