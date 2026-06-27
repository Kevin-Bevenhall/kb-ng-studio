import { provideFileRouter, requestContextInterceptor, withExtraRoutes } from '@analogjs/router';
import { provideHttpClient, withInterceptors, } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, } from '@angular/core';
import { routes } from './app.routes';
import { provideRouter, withViewTransitions } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    //provideFileRouter(withExtraRoutes(routes)),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(
      withInterceptors([requestContextInterceptor])
    ),
    //provideClientHydration(withEventReplay()),
  ],
};