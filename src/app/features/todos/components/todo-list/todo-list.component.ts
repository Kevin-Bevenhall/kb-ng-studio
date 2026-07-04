import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { PaletteEnum, ThemeService } from 'src/app/shared/services/theme.service';
import { TodoService } from 'src/app/shared/services/todo.service';
import { EnumDataSourceItem, getEnumDataSource } from 'src/app/shared/utils/get-enum-data-source';

@Component({
  selector: 'app-todo-list',
  imports: [MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  private todoService = inject(TodoService);
  private router = inject(Router);
  private themeService = inject(ThemeService);
  private profileService = inject(ProfileService);

  currentPalette = signal<PaletteEnum | string>('');
  palettes: EnumDataSourceItem<typeof PaletteEnum>[] = [];

  ngOnInit(): void {
    this.currentPalette.set(this.profileService.profile()?.palette ?? '');
    this.palettes = getEnumDataSource(PaletteEnum);
  }

  onSelectionChange(event: MatSelectChange) {
    console.log(event)
    this.themeService.setTheme(event.value);
    this.profileService.updateProfile({ palette: event.value });
  }
}
