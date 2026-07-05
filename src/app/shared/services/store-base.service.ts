import { HttpClient } from '@angular/common/http';
import { computed, inject, Service, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { firstValueFrom } from 'rxjs';

@Service()
export abstract class StoreBaseService<T> {
  private http = inject(HttpClient);

  protected abstract readonly baseQueryUrl: string;
  protected abstract readonly queryKey: string;

  private query = injectQuery<T[]>(() => ({
    queryKey: [`${this.queryKey}`],
    queryFn: () => this.getAll()
  }));

  data = computed<T[] | undefined>(() => this.query.data());
  isLoading = computed(() => this.query.isLoading());
  isError = computed(() => this.query.isError());

  detailId = signal<number | undefined>(undefined);

  private detailQuery = injectQuery<T>(() => ({
    queryKey: [`${this.queryKey}`, this.detailId()],
    queryFn: () => this.getById(this.detailId()!),
    enabled: this.detailId() !== undefined
  }));

  detailData = computed<T | undefined>(() => this.detailQuery.data());
  detailIsLoading = computed(() => this.detailQuery.isLoading());
  detailIsError = computed(() => this.detailQuery.isError());

  setDetailId(id: number) {
    this.detailId.set(id);
  }

  private getAll() {
    return firstValueFrom(this.http.get<T[]>(this.baseQueryUrl));
  }

  private getById(id: number) {
    return firstValueFrom(this.http.get<T>(`${this.baseQueryUrl}/${id}`));
  }
}
