import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';
import { withComponentInputBinding, withViewTransitions } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
/*     provideClientHydration(withEventReplay()), */
    provideBrowserGlobalErrorListeners(),
    provideFileRouter(withViewTransitions(), withComponentInputBinding()),
    provideHttpClient(withFetch(), withInterceptors([requestContextInterceptor])),
  ],
};
