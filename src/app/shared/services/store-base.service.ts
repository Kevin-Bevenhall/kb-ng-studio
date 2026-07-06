import { HttpClient, httpResource } from '@angular/common/http';
import { computed, inject, Signal, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';

export abstract class StoreBaseService<T> {
  private httpClient = inject(HttpClient);

  protected abstract readonly baseQueryUrl: string;

  private resource = httpResource<T[]>(() => this.baseQueryUrl, { defaultValue: [] });

  data = computed(() => this.resource.value());
  hasValue = computed(() => this.resource.hasValue());
  isLoading = computed(() => this.resource.isLoading());
  hasError = computed(() => this.resource.error() !== undefined);
  error = computed(() => this.resource.error());
  status = computed(() => this.resource.status());

  private detailId = signal<number | undefined>(undefined);
  private detailResource = httpResource(() => this.detailId() ? `${this.baseQueryUrl}/${this.detailId()}` : undefined);

  detailData = computed(() => this.detailResource.value());
  detailHasValue = computed(() => this.detailResource.hasValue());
  detailIsLoading = computed(() => this.detailResource.isLoading());
  detailHasError = computed(() => this.detailResource.error() !== undefined);
  detailError = computed(() => this.detailResource.error());
  detailStatus = computed(() => this.detailResource.status());

  reloadData() {
    this.resource.reload();
  }

  setDetailId(detailId: Signal<number>) {
    this.detailId.set(detailId());
  }

  resetDetailData() {
    this.detailId.set(undefined);
  }

  reloadDetailData() {
    this.detailResource.reload();
  }

  getAll() {
    return lastValueFrom(this.httpClient.get<T[]>(this.baseQueryUrl));
  }

  getById(id: number) {
    return lastValueFrom(this.httpClient.get<T>(`${this.baseQueryUrl}/${id}`));
  }
}
