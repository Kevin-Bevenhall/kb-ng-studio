import { Routes } from "@angular/router";
import { AuthGuard } from "./shared/guards/auth.guard";
import { GuestGuard } from "./shared/guards/guest.guard";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./features/auth/sign-in/sign-in.component').then(m => m.SignInComponent),
    canActivate: [GuestGuard]
  },
  {
    path: 'todos',
    loadChildren: () => import('./features/todos/todos.routes').then(m => m.todosRoutes),
    canActivate: [AuthGuard]
  }
]