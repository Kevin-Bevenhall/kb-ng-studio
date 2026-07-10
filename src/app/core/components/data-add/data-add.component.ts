import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { StoreBaseService } from 'src/app/shared/services/store-base.service';

export interface AddField {
  caption: string;
  type: 'text' | 'number' | 'select';
  formField: FieldTree<string>;
  options?: { key: string, value: string }[];
}

@Component({
  selector: 'app-data-add',
  imports: [MatFormFieldModule, MatInputModule, FormField, TranslocoPipe, MatSelectModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './data-add.component.html',
  styleUrl: './data-add.component.scss',
})
export class DataAddComponent<T> {
  private router = inject(Router);

  dataService = input.required<StoreBaseService<T>>()
  form = input.required<FieldTree<unknown>>();
  fields = input.required<AddField[]>();
  returnUrl = input.required<string>();

  return() {
    this.router.navigateByUrl(`${this.returnUrl()}`);
  }
}