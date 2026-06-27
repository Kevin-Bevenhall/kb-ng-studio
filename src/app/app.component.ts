import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { PaletteEnum, ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule],
  templateUrl: 'app.component.html'
})
export class App {
  protected themeService = inject(ThemeService);

  setTheme() {
    this.themeService.setTheme(PaletteEnum.Rose);
  }
}
