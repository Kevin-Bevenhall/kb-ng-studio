import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { LocalStorageService } from './shared/services/local-storage.service';
import { PaletteEnum, ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule],
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  protected themeService = inject(ThemeService);
  protected authService = inject(AuthService);
  private localStorageService = inject(LocalStorageService);

  ngOnInit(): void {
    const theme = this.localStorageService.getItem('palette') as PaletteEnum;

    if (theme && Object.values(PaletteEnum).includes(theme as PaletteEnum)) {
      this.themeService.setTheme(theme);
    }
  }

  test() {
    this.authService.signIn()
  }
}
