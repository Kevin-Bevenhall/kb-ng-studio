import { Component } from '@angular/core';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { DrawerLayoutComponent } from "src/app/core/layout/drawer-layout.component";
import { TodoComponent } from 'src/app/features/todos/todo.component';

@Component({
  selector: 'app-todos-page',
  imports: [TodoComponent, RouterOutlet, RouterLinkWithHref, DrawerLayoutComponent],
  template: `
  <app-drawer-layout>
    <div>Hello all</div>
    <a routerLink="/todos/create">Create todo</a>
  </app-drawer-layout>
  `,
})
export default class TodosPageComponent {}
