import { computed, Service, signal } from '@angular/core';
import { createBrowserClient } from "@supabase/ssr";
import { Session } from '@supabase/supabase-js';

@Service()
export class AuthService {
  private supabase = createBrowserClient(import.meta.env['VITE_SUPABASE_URL'], import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY']);
  private _session = signal<Session | null | undefined>(undefined);
  
  public readonly isLoggedIn = computed(() => !!this._session());
  public session = this._session.asReadonly();

  constructor() {
    this.supabase.auth.onAuthStateChange((event, session) => {
      this._session.set(session);
    })
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
  }

  async signIn() {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email: 'k.bevenhall@gmail.com', password: 'test123' });
  }
}
