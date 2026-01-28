import { NgModule, provideZonelessChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { tokenProviders } from './app/shared/providers/tokens.providers';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
    imports: [ReactiveFormsModule],
    providers: [
        provideZonelessChangeDetection(),
        provideHttpClientTesting(),
        provideHttpClient(),
        ...tokenProviders
    ]
})
class GlobalTestConfigModule {}

getTestBed().initTestEnvironment(
    [BrowserTestingModule, GlobalTestConfigModule],
    platformBrowserTesting(),
)