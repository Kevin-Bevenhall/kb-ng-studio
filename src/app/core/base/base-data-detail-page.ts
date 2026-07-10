import { StoreBaseService } from "src/app/shared/services/store-base.service";
import { BaseComponent } from "./base-component";

export abstract class BaseDataDetailPage<T> extends BaseComponent {
  protected abstract dataService: StoreBaseService<T>;

  constructor() {
    super();

    this.destroyRef.onDestroy(() => {
      this.dataService.resetDetailData();
    })
  }
}
