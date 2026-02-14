import { Component, signal, viewChild } from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-drawer-layout',
  imports: [MatSidenavModule, RouterOutlet],
  template: `
    <mat-drawer-container class="h-full block">
      <mat-drawer
        position="end"
        disableClose="true"
        mode="over"
        class="transition-all duration-400 ease-in-out shadow-xl">
        <router-outlet
          (activate)="openDrawer()"
          (deactivate)="closeDrawer()"></router-outlet>
      </mat-drawer>

      <mat-drawer-content
      [style.background-color]="drawerOpen() ? 'var(--muted-foreground)' : ''"
      class="h-full">
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
