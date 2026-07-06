import { StoreBaseService } from "src/app/shared/services/store-base.service";
import { BaseComponent } from "./base-component";

export abstract class BaseDataDetail<T> extends BaseComponent {
  protected abstract readonly dataService: StoreBaseService<T>;

  constructor() {
    super();

    this.destroyRef.onDestroy(() => {
      this.dataService.resetDetailData();
    })
  }
}
