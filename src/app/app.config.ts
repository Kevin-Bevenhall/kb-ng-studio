import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';
import { provideHttpClient, withInterceptors, } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideFileRouter(),
    provideHttpClient(
      withInterceptors([requestContextInterceptor])
    ),
    //provideClientHydration(withEventReplay()),
  ],
};