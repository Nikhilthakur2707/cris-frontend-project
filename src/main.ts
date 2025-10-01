import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './app/services/auth.interceptor';

bootstrapApplication(App, {
  providers: [
    ...appConfig.providers,
    provideHttpClient(
      withInterceptors([AuthInterceptor])   
    )
  ]
})
.catch((err) => console.error(err));
