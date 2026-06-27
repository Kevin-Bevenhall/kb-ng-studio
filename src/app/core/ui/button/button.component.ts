import { Component, input } from '@angular/core';
import { RippleDirective } from 'src/app/shared/directives/ripple/ripple.directive';

@Component({
  selector: 'kb-button',
  imports: [RippleDirective],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  disabled = input(false);
  loading = input(false);
  color = input<'primary' | 'danger'>('primary');
}
