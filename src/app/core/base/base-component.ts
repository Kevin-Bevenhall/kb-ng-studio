import { DestroyRef, inject } from "@angular/core";
import { Subscription } from "rxjs";

export class BaseComponent {
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly subscriptions: Subscription[] = [];

  constructor() {
    this.destroyRef.onDestroy(() => {
      for (const subscription of this.subscriptions) {
        subscription.unsubscribe();
      }
    })
  }
}
