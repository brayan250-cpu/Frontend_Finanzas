import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { CLIENT_MANAGEMENT_PROVIDERS } from './app/bc/client-management/infrastructure/http/providers';
import { httpErrorInterceptor } from './app/core/interceptors/http-error.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpErrorInterceptor])),
    ...CLIENT_MANAGEMENT_PROVIDERS,
  ],
}).catch(err => console.error(err));
