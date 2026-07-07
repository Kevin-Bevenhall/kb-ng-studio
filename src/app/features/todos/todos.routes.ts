import { Routes } from "@angular/router";
import { DrawerLayoutComponent } from "src/app/core/layout/drawer-layout/drawer-layout.component";
import { TodoDetailComponent } from "./components/todo-detail/todo-detail.component";
import { TodoListComponent } from "./components/todo-list/todo-list.component";
import { TodoListPageComponent } from "./pages/todo-list-page/todo-list-page.component";

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
            component: TodoDetailComponent,
          }
        ]
      },
    ]
  }
]