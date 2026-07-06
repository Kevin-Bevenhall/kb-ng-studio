import { HttpClient, httpResource } from '@angular/common/http';
import { computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export abstract class StoreBaseService<T> {
  private httpClient = inject(HttpClient);

  protected abstract readonly baseQueryUrl: string;

  private resource = httpResource<T[]>(() => this.baseQueryUrl, {
    defaultValue: []
  });

  readonly data = computed(() => this.resource.value());
  readonly error = computed(() => this.resource.error());
  readonly isLoading = computed(() => this.resource.isLoading());
  readonly isError = computed(() => this.resource.error() !== undefined);

  private detailId = signal<number | undefined>(undefined);
  private detailResource = httpResource<T>(() => this.detailId() !== undefined ? `${this.baseQueryUrl}/${this.detailId()}` : undefined);

  readonly detailData = computed(() => this.detailResource.value());
  readonly detailError = computed(() => this.detailResource.error());
  readonly detailIsLoading = computed(() => this.detailResource.isLoading());
  readonly detailIsError = computed(() => this.detailResource.error() !== undefined);

  setDetailId(id: number) {
    this.detailId.set(id);
  }

  resetDetailData() {
    this.detailId.set(undefined);
  }

  async create(payload: Partial<T>) {
    const response = await firstValueFrom(this.httpClient.post<T>(this.baseQueryUrl, payload));
    this.resource.reload();
    return response;
  }
}
