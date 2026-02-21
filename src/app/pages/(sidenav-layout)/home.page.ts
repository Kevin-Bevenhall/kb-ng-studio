import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule],
  template: `
    <div>
      <button (click)="signOut()">sign out!</button>
      <div> {{ authService.currentUser()?.user_metadata?.['full_name'] }} </div>
      <div>
        <button (click)="test()">
          click
        </button>
      </div>
    </div>
  `,
})
export default class HomePageComponent {
  protected authService = inject(AuthService);
  private router = inject(Router);

  async signOut() {
    await this.authService.signOut();
    this.router.navigateByUrl('/sign-in');
  }

  test() {
    this.authService.supabase.auth.getUser().then(user => console.log(user))
  }
}
