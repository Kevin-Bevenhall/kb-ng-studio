import { Component, signal, viewChild } from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-drawer-layout',
  imports: [MatSidenavModule, RouterOutlet],
  template: `
    <mat-drawer-container class="h-full">
      <mat-drawer
        position="end"
        disableClose="true"
        mode="over"
        [style.border-left]="'1px solid var(--sidebar-border)'"
        [style.background-color]="'var(--sidebar)'"
        [style.box-shadow]="'-4px 0 16px rgba(0, 0, 0, 0.3)'"
        class="transition-all duration-400 ease-in-out">
        <router-outlet
          (activate)="openDrawer()"
          (deactivate)="closeDrawer()"></router-outlet>
      </mat-drawer>

      <mat-drawer-content class="p-4"
      [style.opacity]="drawerOpen() ? '50%' : '100%'">
        <ng-content></ng-content>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
})
export class DrawerLayoutComponent {
  matDrawer = viewChild.required(MatDrawer);
  drawerOpen = signal(false);

  openDrawer() {
    this.drawerOpen.set(true);
    this.matDrawer().open();
  }

  closeDrawer() {
    this.drawerOpen.set(false);
    this.matDrawer().close();
  }
}
