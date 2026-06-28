import { provideFileRouter, requestContextInterceptor, withExtraRoutes } from '@analogjs/router';
import { provideHttpClient, withInterceptors, } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, } from '@angular/core';
import { routes } from './app.routes';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import {
  provideTanStackQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental'

export const appConfig: ApplicationConfig = {
  providers: [
    provideTanStackQuery(new QueryClient()),
    provideBrowserGlobalErrorListeners(),
    provideFileRouter(),
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([requestContextInterceptor])
    ),
    //provideClientHydration(withEventReplay()),
  ],
};