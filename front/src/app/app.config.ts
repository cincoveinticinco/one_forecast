import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeuix/themes/lara';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { EFFECT_CONFIG, EFFECT_CONFIG_TOKEN, LAYOUT_EFFECT_CONFIG, LAYOUT_EFFECT_CONFIG_TOKEN } from './components/layout/config/effect.config';
import { CONTROL_CONFIG, CONTROL_CONFIG_TOKEN } from './components/layout/config/control.config';
import { VALIDATOR_CONFIG, VALIDATOR_CONFIG_TOKEN } from './components/layout/config/validator.config';
import { BLOCK_CONFIG, BLOCK_CONFIG_TOKEN } from './components/layout/config/block.config';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FILTER_CONFIG, FILTER_CONFIG_TOKEN } from './components/table/config/filter.config';
import { CELL_CONFIG, CELL_CONFIG_TOKEN } from './components/table/config/cell.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(),
    provideZonelessChangeDetection(),
    providePrimeNG({
      theme: {
        preset: Lara,
        options: {
          darkModeSelector: 'false',
          cssLayer: false
        }
      }
    }),
    {
      provide: EFFECT_CONFIG_TOKEN,
      useValue: EFFECT_CONFIG
    },
    {
      provide: CONTROL_CONFIG_TOKEN,
      useValue: CONTROL_CONFIG
    },
    {
      provide: VALIDATOR_CONFIG_TOKEN,
      useValue: VALIDATOR_CONFIG
    },
    {
      provide: BLOCK_CONFIG_TOKEN,
      useValue: BLOCK_CONFIG
    },
    {
      provide: LAYOUT_EFFECT_CONFIG_TOKEN,
      useValue: LAYOUT_EFFECT_CONFIG
    },
    {
      provide: FILTER_CONFIG_TOKEN,
      useValue: FILTER_CONFIG
    },
    {
      provide: CELL_CONFIG_TOKEN,
      useValue: CELL_CONFIG
    },
    DialogService,
    ConfirmationService,
    MessageService
  ]
};
