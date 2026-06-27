import { inject, Service } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

export enum PaletteEnum {
  Red = 'red-palette',
  Green = 'green-palette',
  Blue = 'blue-palette',
  Yellow = 'yellow-palette',
  Cyan = 'cyan-palette',
  Magenta = 'magenta-palette',
  Orange = 'orange-palette',
  Chartreuse = 'chartreuse-palette',
  SpringGreen = 'spring-green-palette',
  Azure = 'azure-palette',
  Violet = 'violet-palette',
  Rose = 'rose-palette'
}

@Service()
export class ThemeService {
  private localStorageService = inject(LocalStorageService);

  setTheme(palette: PaletteEnum) {
    const html = document.documentElement;

    html.classList.remove(...Object.values(PaletteEnum));
    html.classList.add(palette);
    this.localStorageService.setItem('palette', palette);
  }
}
