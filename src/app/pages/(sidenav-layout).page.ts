import {
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet, RouterLinkWithHref, Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFilm } from '@ng-icons/lucide';
import {
  matArrowForwardOutline,
  matAssignmentOutline,
  matCloseOutline,
  matDashboardOutline,
  matHomeOutline,
  matPushPinOutline,
  matSearchOutline,
} from '@ng-icons/material-icons/outline';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';

@Component({
  selector: 'app-sidenav-layout-page',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    NgIcon,
    HlmIcon,
    HlmItemImports,
    HlmInputGroupImports,
    RouterLinkWithHref,
    FormsModule,
    HlmTooltipImports,
  ],
  providers: [
    provideIcons({
      matHomeOutline,
      matAssignmentOutline,
      matDashboardOutline,
      lucideFilm,
      matArrowForwardOutline,
      matSearchOutline,
      matPushPinOutline,
      matCloseOutline,
    }),
  ],
  template: `
    <mat-sidenav-container
      hasBackdrop="false"
      class="w-full h-full">
      <mat-sidenav
        opened="true"
        disableClose="true"
        position="start"
        mode="side"
        [style.width]="sidenavWidth()"
        class="bg-sidebar h-full transition-all duration-400 ease-in-out overflow-hidden">
        <div
          hlmInputGroup
          class="h-12 overflow-hidden">
          <button
            hlmBtn
            (click)="toggleSidenavWidth()"
            class="p-3 mt-1 hover:cursor-text border-none outline-none">
            <ng-icon
              hlm
              name="matSearchOutline"></ng-icon>
          </button>
          <input
            #searchInput
            type="text"
            hlmInputGroupInput
            placeholder="Filter menu items..."
            [(ngModel)]="searchTerm"
            class="pl-0" />
          <button
            hlmBtn
            (click)="toggleSidenavPinned()"
            [hlmTooltip]="sidenavPinned() ? 'Unpin menu' : 'Pin menu'"
            position="right"
            class="hover:cursor-pointer mr-[16px] mt-1">
            @if (sidenavPinned()) {
              <ng-icon
                hlm
                name="matCloseOutline"
                class="text-action"></ng-icon>
            } @else {
              <ng-icon
                hlm
                name="matPushPinOutline"
                class="text-action"></ng-icon>
            }
          </button>
        </div>
        <div hlmItemGroup>
          @for (item of filteredMenuItems(); track item.path) {
            <a
              hlmItem
              variant="outline"
              size="sm"
              [routerLink]="item.path"
              (click)="onNavigation()"
              class="flex flex-nowrap pl-3 overflow-hidden">
              <div
                hlmItemMedia
                [hlmTooltip]="item.label"
                position="right"
                [tooltipDisabled]="!sidenavCollapsed()">
                <ng-icon
                  hlm
                  [name]="item.icon"></ng-icon>
              </div>
              @if (!sidenavCollapsed()) {
                <div hlmItemContent>
                  <div hlmItemTitle>{{ item.label }}</div>
                </div>
                <div hlmItemActions>
                  <ng-icon
                    hlm
                    name="matArrowForwardOutline"></ng-icon>
                </div>
              }
            </a>
          }
        </div>
      </mat-sidenav>
      <mat-sidenav-content
        (click)="onBackdropClick()"
        [style.margin-left]="
          !sidenavCollapsed() && sidenavPinned() ? '300px' : '52px'
        "
        class="transition-all duration-400 ease-in-out">
        <router-outlet />
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
})
export default class SidenavLayoutPageComponent {
  private router = inject(Router);
  searchInput = viewChild.required<ElementRef>('searchInput');

  sidenavCollapsed = signal(true);
  sidenavPinned = signal(false);
  sidenavWidth = computed(() => (this.sidenavCollapsed() ? '52px' : '300px'));

  searchTerm = signal('');

  menuItems = [
    { label: 'Home', icon: 'matHomeOutline', path: 'home' },
    { label: 'Todos', icon: 'matAssignmentOutline', path: 'todos' },
    { label: 'Boards', icon: 'matDashboardOutline', path: 'boards' },
    { label: 'Movies', icon: 'lucideFilm', path: 'Movies' },
  ];
  filteredMenuItems = computed(() => {
    const searchTerm = this.searchTerm().trim().toLowerCase();
    if (!searchTerm) return this.menuItems;

    return this.menuItems.filter((x) =>
      x.label.toLowerCase().includes(searchTerm),
    );
  });

  onBackdropClick() {
    console.log('hello');
    if (this.sidenavPinned()) return;
    this.sidenavCollapsed.set(true);
  }

  toggleSidenavWidth() {
    if (this.sidenavPinned()) return;
    this.sidenavCollapsed.set(false);

    setTimeout(() => {
      this.searchInput().nativeElement.focus();
    }, 410);
  }

  toggleSidenavPinned() {
    this.sidenavPinned.set(!this.sidenavPinned());

    if (!this.sidenavPinned() && !this.sidenavCollapsed()) {
      this.sidenavCollapsed.set(true);
    }
  }

  onNavigation() {
    if (!this.sidenavPinned()) {
      this.sidenavCollapsed.set(true);
    }
  }
}
