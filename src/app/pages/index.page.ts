import { Component } from '@angular/core';
import { ButtonComponent } from '../core/ui/button/button.component';

@Component({
  selector: 'app-home',
  imports: [ButtonComponent],
  template: `
  <div>
    <kb-button>heys</kb-button>
  </div>`,
})
export default class Home { }
