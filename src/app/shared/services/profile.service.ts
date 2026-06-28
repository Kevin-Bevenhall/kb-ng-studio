import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Profile } from 'src/app/core/api/models/profiles/profile';

@Service()
export class ProfileService {
  private http = inject(HttpClient);

  private _profile = signal<Profile | null | undefined>(undefined);
  public readonly profile = this._profile.asReadonly();

  setProfile(profile: Profile) {
    this._profile.set(profile);
  }

  async getProfile() {
    const profile = await firstValueFrom(this.http.get<Profile>('/api/v1/profiles'));
    if (profile) {
      this.setProfile(profile);
    }
  }
}
