import { Routes } from "@angular/router";
import { TodoListPageComponent } from "./pages/todo-list-page/todo-list-page.component";
import { DrawerLayoutComponent } from "src/app/core/layout/drawer-layout/drawer-layout.component";
import { TodoDetailPageComponent } from "./pages/todo-detail-page/todo-detail-page.component";
import { TodoService } from "src/app/shared/services/todo.service";

export const todosRoutes: Routes = [
  {
    path: '',
    component: DrawerLayoutComponent,
    providers: [TodoService],
    children: [
      {
        path: '',
        component: TodoListPageComponent,
        outlet: 'content'
      },
      {
        path: ':todoId',
        component: TodoDetailPageComponent
      }
    ]
  },
]