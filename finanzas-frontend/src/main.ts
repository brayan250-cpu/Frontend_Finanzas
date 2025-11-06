import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { httpErrorInterceptor } from './app/core/interceptors/http-error.interceptor';
import { INFRASTRUCTURE_PROVIDERS } from './app/bc/client-management/infrastructure/http/providers';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpErrorInterceptor])),
    ...INFRASTRUCTURE_PROVIDERS,
  ],
}).catch(err => console.error(err));
