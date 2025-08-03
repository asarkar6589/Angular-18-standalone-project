import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// This is a standalone project.
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
