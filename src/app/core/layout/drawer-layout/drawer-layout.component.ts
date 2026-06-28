import { Component, viewChild } from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-drawer-layout',
  imports: [MatSidenavModule, RouterOutlet],
  templateUrl: './drawer-layout.component.html',
  styleUrl: './drawer-layout.component.scss',
})
export class DrawerLayoutComponent {
  drawer = viewChild.required(MatDrawer);

  onActivate() {
    this.drawer().open();
  }

  onDeactivate() {
    this.drawer().close();
  }
}
