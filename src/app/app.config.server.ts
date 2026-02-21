import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideServerRendering } from '@angular/platform-server';

const serverConfig: ApplicationConfig = {
  providers: [
/*     provideServerRendering(),
    provideClientHydration(withEventReplay()) */
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
