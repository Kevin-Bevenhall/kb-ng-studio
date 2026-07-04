import { provideFileRouter, requestContextInterceptor, withExtraRoutes } from '@analogjs/router';
import { provideHttpClient, withInterceptors, } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode, } from '@angular/core';
import { routes } from './app.routes';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import {
  provideTanStackQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@jsverse/transloco'

export const appConfig: ApplicationConfig = {
  providers: [
    provideTanStackQuery(new QueryClient()),
    provideBrowserGlobalErrorListeners(),
    provideFileRouter(),
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([requestContextInterceptor])
    ), provideHttpClient(), provideTransloco({
        config: { 
          availableLangs: ['en', 'sv'],
          defaultLang: 'en',
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      }),
    //provideClientHydration(withEventReplay()),
  ],
};