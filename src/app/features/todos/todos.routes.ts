import { Routes } from "@angular/router";
import { DrawerLayoutComponent } from "src/app/core/layout/drawer-layout/drawer-layout.component";
import { TodoDetailPageComponent } from "./pages/todo-detail-page/todo-detail-page.component";
import { TodoListPageComponent } from "./pages/todo-list-page/todo-list-page.component";
import { TodoDetailResolver } from "src/app/shared/services/todo.service";

export const todosRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DrawerLayoutComponent,
        children: [
          {
            path: '',
            component: TodoListPageComponent,
            outlet: 'content'
          },
          {
            path: ':todoId',
            component: TodoDetailPageComponent,
            resolve: {
              todoDetail: TodoDetailResolver
            }
          }
        ]
      },
    ]
  }
]