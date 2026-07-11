import { inject, Service } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { Todo } from 'src/app/core/api/models/todos/todo';
import { StoreBaseService } from './store-base.service';

@Service()
export class TodoService extends StoreBaseService<Todo> {
  protected baseQueryUrl = '/api/v1/todos';
}


export const TodoDetailResolver: ResolveFn<Todo> = async (route, state) => {
  const todoService = inject(TodoService);
  const router = inject(Router);
  const todoId = route.paramMap.get('todoId');

  if (!todoId) {
    return new RedirectCommand(router.parseUrl('/todos'));
  }

  return todoService.resolveDetailById(todoId);
};
