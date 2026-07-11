import { Component, input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.scss',
})
export class EmptyComponent implements OnInit {
  feature = input<'Todo'>();

  icon: string = '';
  caption: string = '';
  text: string = '';
  buttonText: string = '';

  ngOnInit(): void {
    switch(this.feature()) {
      case 'Todo':
        this.icon = 'check_box_outline_blank';
        this.caption = 'No Todos Yet';
        this.text = `You haven't created any todos yet. Get started by creating your first todo.`;
        this.buttonText = 'Create Todo';
        break;
    }
  }
}
