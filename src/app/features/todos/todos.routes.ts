import { Routes } from "@angular/router";
import { DrawerLayoutComponent } from "src/app/core/layout/drawer-layout/drawer-layout.component";
import { TodoCreatePageComponent } from "./pages/todo-create-page/todo-create-page.component";
import { TodoDetailPageComponent } from "./pages/todo-detail-page/todo-detail-page.component";
import { TodoListPageComponent } from "./pages/todo-list-page/todo-list-page.component";

export const todosRoutes: Routes = [
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
        path: 'create',
        component: TodoCreatePageComponent
      },
      {
        path: ':todoId',
        component: TodoDetailPageComponent,
      }
    ]
  }
]