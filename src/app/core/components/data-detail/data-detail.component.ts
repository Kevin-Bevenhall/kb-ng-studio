import { A11yModule } from "@angular/cdk/a11y";
import { Component, computed, inject, input, signal } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { StoreBaseService } from 'src/app/shared/services/store-base.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from "../snackbar/snackbar.component";

export interface DetailField {
  key: string;
  caption: string;
  type: 'text' | 'number' | 'select';
  formField: FieldTree<string>;
  options?: { key: string, value: string }[];
}

@Component({
  selector: 'app-data-detail',
  imports: [MatFormFieldModule, MatInputModule, FormField, TranslocoPipe, MatSelectModule, MatButtonModule, MatIconModule, MatProgressSpinner, A11yModule],
  templateUrl: './data-detail.component.html',
  styleUrl: './data-detail.component.scss',
})
export class DataDetailComponent<T> {
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);

  form = input.required<FieldTree<unknown>>();
  detailFields = input.required<DetailField[]>();
  dataService = input.required<StoreBaseService<T>>();
  returnUrl = input.required<string>();
  todoId = input.required<number>();

  isSaving = signal(false);

  hasChanges = computed(() => this.detailFields().some(x => x.formField().dirty()));

  return() {
    this.router.navigateByUrl(`${this.returnUrl()}`);
  }

  async onSave() {
    this.isSaving.set(true);
    const changes = this.getChanges();
    await this.dataService().updateById(this.todoId(), changes);
    this.isSaving.set(false);
    this.form()().reset();
    this.displaySnackbar();
  }

  async onSaveAndClose() {
    this.isSaving.set(true);
    const changes = this.getChanges();
    await this.dataService().updateById(this.todoId(), changes);
    this.isSaving.set(false);
    this.displaySnackbar();
    this.return();
  }

  getChanges() {
    const changes: any = {};

    for (const field of this.detailFields()) {
      if (field.formField().dirty()) {
        changes[field.key] = field.formField().value();
      }
    }

    return changes;
  }

  displaySnackbar() {
    this.snackbar.openFromComponent(SnackbarComponent, {
      duration: 3000
    });
  }

}