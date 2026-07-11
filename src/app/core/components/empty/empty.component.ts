import { Component, input, OnInit, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-empty',
  imports: [MatIconModule, MatButtonModule, TranslocoPipe],
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.scss',
})
export class EmptyComponent implements OnInit {
  feature = input<'Todo'>();

  create = output();

  icon: string = '';
  title: string = '';
  description: string = '';
  buttonText: string = '';

  ngOnInit(): void {
    switch(this.feature()) {
      case 'Todo':
        this.icon = 'check_box_outline_blank';
        this.title = 'TodosEmptyTitle';
        this.description = `TodosEmptyDescription`;
        this.buttonText = 'CreateTodo';
        break;
    }
  }
}
