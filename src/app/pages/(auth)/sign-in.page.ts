import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-in-page',
  imports: [],
  template: `
    <div>sign in works</div>
    <button (click)="authService.signInWithGoogle()" >Click here to sign in</button>
    <button (click)="check()" >check creds</button>
  `,
})
export default class SignInPageComponent {
  protected authService = inject(AuthService);

  check() {
    this.authService.supabase?.auth.getUser().then((user) => console.log(user.data.user))
  }
}
