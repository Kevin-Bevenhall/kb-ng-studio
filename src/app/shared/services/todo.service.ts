import { Service } from '@angular/core';
import { Todo } from 'src/app/core/api/models/todos/todo';
import { StoreBaseService } from './store-base.service';

@Service({})
export class TodoService extends StoreBaseService<Todo> {
  protected baseQueryUrl = '/api/v1/todos';
}
