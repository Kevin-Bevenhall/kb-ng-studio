import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterOutlet } from '@angular/router';
import { filter, firstValueFrom } from 'rxjs';
import { SidenavLayoutComponent } from './core/layout/sidenav-layout/sidenav-layout.component';
import { AuthService } from './shared/services/auth.service';
import { ProfileService } from './shared/services/profile.service';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, SidenavLayoutComponent],
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  protected themeService = inject(ThemeService);
  protected authService = inject(AuthService);
  protected profileService = inject(ProfileService);
  private router = inject(Router);

  private session$ = toObservable(this.authService.session);

  applicationStarted = signal(false);
  applicationStartFailed = signal(false);

  constructor() {
    effect(() => {
      const session = this.authService.session();

      if (this.applicationStarted() && !session) {
        this.router.navigate(['/sign-in']);
      }
    })
  }

  ngOnInit(): void {
    this.startApplication();
  }

  async startApplication() {
    const session = await firstValueFrom(this.session$.pipe(
      filter(session => session !== undefined)
    ));

    if (session) {
      try {
        await this.profileService.getProfile();
      } catch (error) {
        this.applicationStartFailed.set(true);
      }
    }

    this.applicationStarted.set(true);
  }
}
