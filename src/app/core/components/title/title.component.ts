import { Component, input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-title',
  imports: [MatToolbarModule, TranslocoPipe],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
})
export class TitleComponent {
  title = input.required<string>();
}
