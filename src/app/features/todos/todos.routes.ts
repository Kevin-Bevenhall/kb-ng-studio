import { Routes } from "@angular/router";
import { TodoListPageComponent } from "./pages/todo-list-page/todo-list-page.component";
import { DrawerLayoutComponent } from "src/app/core/layout/drawer-layout/drawer-layout.component";
import { TodoDetailPageComponent } from "./pages/todo-detail-page/todo-detail-page.component";

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
        path: ':todoId',
        component: TodoDetailPageComponent
      }
    ]
  },
]