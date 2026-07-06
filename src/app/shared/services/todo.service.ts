import { inject, Injectable, Service } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ResolveFn, Router } from '@angular/router';
import { filter, firstValueFrom } from 'rxjs';
import { Todo } from 'src/app/core/api/models/todos/todo';
import { StoreBaseService } from './store-base.service';

@Service({})
export class TodoService extends StoreBaseService<Todo> {
  protected baseQueryUrl = '/api/v1/todos';

  constructor() {
    super(
    )
    console.log('yo')
  }
}

export const TodoDetailResolver: ResolveFn<Todo | undefined> = async (route, state) => {
  const todoService = inject(TodoService);
  const router = inject(Router);

  const id = Number(route.paramMap.get('todoId'));
  todoService.setDetailId(id);

  const detailStatus$ = toObservable(todoService.detailStatus);
  const resolved = await firstValueFrom(detailStatus$.pipe(
    filter(status => status === 'resolved')
  ));

  return todoService.detailData()
};
