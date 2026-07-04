import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Profile } from 'src/app/core/api/models/profiles/profile';
import { ThemeService } from './theme.service';

@Service()
export class ProfileService {
  private http = inject(HttpClient);
  private themeService = inject(ThemeService);

  private _profile = signal<Profile | null | undefined>(undefined);
  public readonly profile = this._profile.asReadonly();

  private baseQueryUrl = '/api/v1/profiles'

  async getProfile() {
    const profile = await firstValueFrom(this.http.get<Profile>(this.baseQueryUrl));
    if (profile) {
      this._profile.set(profile);
    }
  }

  private setProfile(profile: Profile) {
    this._profile.set(profile);
  }

  async updateProfile(body: Partial<Profile>) {
    try {
      const prevProfile = this._profile();

      const profile = await firstValueFrom(this.http.put<Profile>(this.baseQueryUrl, body));
      this.setProfile(profile);

      if (profile.palette !== prevProfile?.palette) {
        this.themeService.setTheme(profile.palette);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
