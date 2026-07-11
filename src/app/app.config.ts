import { provideFileRouter, requestContextInterceptor, withExtraRoutes } from '@analogjs/router';
import { provideHttpClient, withInterceptors, } from '@angular/common/http';
import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners, } from '@angular/core';
import { withComponentInputBinding } from '@angular/router';
import { provideTransloco } from '@jsverse/transloco';
import { provideTanStackQuery, QueryClient, } from '@tanstack/angular-query-experimental';
import { routes } from './app.routes';
import { TranslocoHttpLoader } from './shared/services/transloco-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideTanStackQuery(new QueryClient()),
    provideBrowserGlobalErrorListeners(),
    provideFileRouter(withExtraRoutes(routes), withComponentInputBinding()),
    provideHttpClient(withInterceptors([requestContextInterceptor])),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['en', 'sv'],
        defaultLang: 'sv',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    }),
    //provideClientHydration(withEventReplay()),
  ],
};