import { computed, inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private localStorageService = inject(LocalStorageService);

  public sidenavCollapsed = signal(true);
  public sidenavPinned = signal(false);
  public sidenavWidth = computed(() => (this.sidenavCollapsed() ? '52px' : '300px'));

  constructor() {
    const sidenavState = this.localStorageService.get('sidenavState');
    if (sidenavState == 'pinned') {
      this.sidenavCollapsed.set(false);
      this.sidenavPinned.set(true);
    }
  }

  onBackdropClick() {
    if (this.sidenavPinned()) return;
    this.sidenavCollapsed.set(true);
  }

  toggleSidenavWidth() {
    if (this.sidenavPinned()) return;
    this.sidenavCollapsed.set(false);
  }

  toggleSidenavPinned() {
    this.sidenavPinned.set(!this.sidenavPinned());

    this.localStorageService.set('sidenavState', this.sidenavPinned() ? 'pinned' : 'collapsed');

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
