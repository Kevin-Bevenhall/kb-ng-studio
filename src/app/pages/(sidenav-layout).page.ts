import { RouteMeta } from '@analogjs/router';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import SidenavLayoutComponent from '../core/layout/sidenav-layout/sidenav-layout.component';
import { AuthService } from '../shared/services/auth.service';

export const routeMeta: RouteMeta = {
  canActivate: [
    async () => {
      const router = inject(Router);
      const authService = inject(AuthService);

      const {
        data: { session },
      } = await authService.supabase.auth.getSession();

      if (session) {
        return true;
      } else {
        return router.navigateByUrl('/sign-in');
      }
    },
  ],
};

@Component({
  selector: 'app-sidenav-layout-page',
  imports: [SidenavLayoutComponent],
  template: `
    <app-sidenav-layout />
  `,
})
export default class SidenavLayoutPageComponent {}
