import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-todos',
  imports: [MatButtonModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent {
  fetch() {
    fetch('/api/v1/todos', { credentials: 'include' }).then(res => res.json().then(data => console.log(data)))
  }

  fetch2() {
     fetch('/api/v1/profiles', { credentials: 'include' }).then(res => res.json().then(data => console.log(data)))
  }
}
