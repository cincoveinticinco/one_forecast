import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FORM_ERROR_FACTORIES } from './form-error.factories';

@Injectable({ providedIn: 'root' })
export class FormErrorService {

  getError(control: AbstractControl | null): string | null {
    if (!control?.errors || !(control.touched || control.dirty)) {
      return null;
    }

    for (const key of Object.keys(control.errors)) {
      const factory = FORM_ERROR_FACTORIES.get(key);
      if (factory) {
        return factory(control.errors[key]);
      }
    }

    return null;
  }
}