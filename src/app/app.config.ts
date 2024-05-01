import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApiKeyInterceptorService } from './interceptors/api-key-interceptor.service';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { ErrorInterceptorService } from './interceptors/error-interceptor.service';
import { JwtInterceptorService } from './interceptors/jwt-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([
      // ErrorInterceptorService,
      // ApiKeyInterceptorService,
      // JwtInterceptorService,
      // AuthInterceptorService
    ])),
    importProvidersFrom(TablerIconsModule.pick(TablerIcons))
  ]
};
