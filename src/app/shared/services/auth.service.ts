import { computed, Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from 'src/environment';
import { createBrowserClient } from '@supabase/ssr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  supabase = createBrowserClient(environment.supabaseUrl, environment.supabaseKey);

  private _currentUser = signal<User | undefined>(undefined);
  currentUser = computed(() => this._currentUser());

  constructor() {
    this.supabase.auth.onAuthStateChange((event, session) => {
      this._currentUser.set(session?.user);
    });
  }

  async signInWithGoogle() {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    console.log(data);
  }

  signOut() {
    return this.supabase?.auth.signOut();
  }
}
