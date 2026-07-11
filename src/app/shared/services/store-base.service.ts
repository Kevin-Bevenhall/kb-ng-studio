import { HttpClient, httpResource } from '@angular/common/http';
import { computed, inject, Signal, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, firstValueFrom, map } from 'rxjs';

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
  private detailResource = httpResource<T>(() => this.detailId() ? `${this.baseQueryUrl}/${this.detailId()}` : undefined);

  detailData = computed(() => this.detailResource.value());
  detailHasValue = computed(() => this.detailResource.hasValue());
  detailIsLoading = computed(() => this.detailResource.isLoading());
  detailHasError = computed(() => this.detailResource.error() !== undefined);
  detailError = computed(() => this.detailResource.error());
  detailStatus = computed(() => this.detailResource.status());
  detailStatus$ = toObservable(this.detailStatus);

  reloadData() {
    this.resource.reload();
  }

  setDetailId(detailId: number | string) {
    this.detailId.set(Number(detailId));
  }

  resetDetailData() {
    this.detailId.set(undefined);
  }

  reloadDetailData() {
    this.detailResource.reload();
  }

  getAll() {
    return firstValueFrom(this.httpClient.get<T[]>(this.baseQueryUrl));
  }

  getById(id: number) {
    return firstValueFrom(this.httpClient.get<T>(`${this.baseQueryUrl}/${id}`));
  }

  async create(payload: any) {
    const result = await firstValueFrom(this.httpClient.post<T>(this.baseQueryUrl, payload));
    this.resource.reload();
    return result;
  }

  async delete(ids: number[]) {
    await firstValueFrom(this.httpClient.delete(this.baseQueryUrl, {
      body: { ids }
    }));
    this.resource.reload();
  }

  async updateById(id: number, payload: Partial<T>) {
    const result = await firstValueFrom(this.httpClient.patch<T>(`${this.baseQueryUrl}/${id}`, payload));
    this.resource.reload();
    this.detailResource.reload();
    return result;
  }

  resolveDetailById(detailId: number | string) {
    this.setDetailId(Number(detailId));

    return firstValueFrom(this.detailStatus$.pipe(
      filter((status) => status === 'resolved' || status === 'local' || status === 'error'),
      map(() => {
        const error = this.detailResource.error();
        if (error) {
          throw error;
        }

        const data = this.detailData();
        if (data === undefined) {
          throw new Error('No data available');
        }

        return data;
      })
    ));
  }
}
