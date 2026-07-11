import { Component, inject, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

export interface DetailField {
  caption: string;
  type: 'text' | 'number' | 'select';
  formField: FieldTree<string>;
  options?: { key: string, value: string }[];
}

@Component({
  selector: 'app-data-detail',
  imports: [MatFormFieldModule, MatInputModule, FormField, TranslocoPipe, MatSelectModule, MatButtonModule, MatIconModule, MatProgressSpinner],
  templateUrl: './data-detail.component.html',
  styleUrl: './data-detail.component.scss',
})
export class DataDetailComponent {
  private router = inject(Router);

  form = input.required<FieldTree<unknown>>();
  detailFields = input.required<DetailField[]>();
}
