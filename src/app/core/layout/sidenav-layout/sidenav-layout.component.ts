import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-sidenav-layout',
  imports: [MatSidenavModule, MatListModule, MatIconModule, RouterLinkActive, RouterLinkWithHref, MatMenuModule, MatButtonModule, MatTooltipModule],
  templateUrl: './sidenav-layout.component.html',
  styleUrl: './sidenav-layout.component.scss',
})
export class SidenavLayoutComponent implements OnInit {
  private localStorageService = inject(LocalStorageService);

  isSidenavExpanded = signal(false);
  sidenavControl = signal<'expanded' | 'collapsed' | 'hover'>('collapsed');

  menuItems = [
    {
      path: 'home',
      caption: 'Home',
      icon: 'home'
    },
    {
      path: 'todos',
      caption: 'Todos',
      icon: 'assignment'
    }
  ];

  sidenavControlItems = [
    {
      caption: 'Expanded',
      control: 'expanded'
    },
    {
      caption: 'Collapsed',
      control: 'collapsed'
    },
    {
      caption: 'Expand on hover',
      control: 'hover'
    }
  ] as const;

  ngOnInit(): void {
    const control = this.localStorageService.getItem('sidenavControl');
    if (control === 'expanded' || control === 'collapsed' || control === 'hover') {
      this.sidenavControl.set(control);

      if (control === 'expanded') {
        this.isSidenavExpanded.set(true);
      }
    }
  }

  onMouseEnter() {
    this.isSidenavExpanded.set(true);
  }

  onMouseLeave() {
    if (this.sidenavControl() === 'expanded') return;
    this.isSidenavExpanded.set(false);
  }

  onSidenavControlClick(control: 'expanded' | 'collapsed' | 'hover') {
    this.sidenavControl.set(control);
    this.localStorageService.setItem('sidenavControl', control)

    if (control === 'expanded') {
      this.isSidenavExpanded.set(true);
    }
  }
}
