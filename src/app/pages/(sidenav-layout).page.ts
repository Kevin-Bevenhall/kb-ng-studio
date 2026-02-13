import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav'

@Component({
  selector: 'app-sidenav-layout-page',
  imports: [RouterOutlet, MatSidenavModule],
  template: `
  <mat-sidenav-container class="w-full h-full">
    <mat-sidenav
    opened="true"
    disableClose="true"
    position="start"
    [mode]="sidenavPinned() ? 'side' : 'over'"
    [style.width]="sidenavWidth()"
    class="bg-sidebar h-full">
    </mat-sidenav>
    <mat-sidenav-content>
      <router-outlet />
    </mat-sidenav-content>
  </mat-sidenav-container>
  `,
})
export default class SidenavLayoutPageComponent {
  sidenavCollapsed = signal(false);
  sidenavPinned = signal(false);
  sidenavWidth = computed(() => this.sidenavCollapsed() ? '55px' : '300px');
}
