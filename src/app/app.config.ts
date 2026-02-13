import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';
import { withViewTransitions } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideFileRouter(
      withViewTransitions()
    ),
    provideClientHydration(
      withEventReplay()
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([requestContextInterceptor])
    ),
  ],
};
