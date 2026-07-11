import { Component, inject, input, signal } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
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
  imports: [MatFormFieldModule, MatInputModule, FormField, TranslocoPipe, MatSelectModule, MatButtonModule, MatIconModule, MatProgressSpinner],
  templateUrl: './data-add.component.html',
  styleUrl: './data-add.component.scss',
})
export class DataAddComponent<T> {
  private router = inject(Router);

  form = input.required<FieldTree<unknown>>();
  addFields = input.required<AddField[]>();
  dataService = input.required<StoreBaseService<T>>();
  returnUrl = input.required<string>();

  isCreating = signal(false);

  async onSubmit(event: SubmitEvent) {
    event.preventDefault();

    this.isCreating.set(true);
    await this.dataService().create(this.form()().value());
    this.isCreating.set(false);
    this.return();
  }

  return() {
    this.router.navigateByUrl(`${this.returnUrl()}`);
  }
}