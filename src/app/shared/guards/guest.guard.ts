import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn, Router } from '@angular/router';
import { filter, first, map } from 'rxjs';
import { AuthService } from '../services/auth.service';


export const GuestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return toObservable(authService.session).pipe(
    filter(session => session !== undefined),
    first(),
    map(session => !session || router.parseUrl('/home'))
  );
};
