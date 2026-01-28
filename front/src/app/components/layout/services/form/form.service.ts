import { Inject, Injectable, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { Subject } from 'rxjs';
import { IControl } from '../../interfaces/control.interface';
import { IValidator, ValidatorConfig } from '../../interfaces/validator.interface';
import { VALIDATOR_CONFIG_TOKEN } from '../../config/validator.config';
import { EffectConfig, IEffect } from '../../interfaces/effect.interface';
import { EFFECT_CONFIG_TOKEN } from '../../config/effect.config';
import { LayoutCoreService } from '../layout-core/layout-core.service';

@Injectable({
  providedIn: 'root',
})
export class FormService implements OnDestroy {
  
  destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(VALIDATOR_CONFIG_TOKEN) private VALIDATOR_CONFIG: ValidatorConfig,
    @Inject(EFFECT_CONFIG_TOKEN) private EFFECT_CONFIG: EffectConfig,
    private fb: FormBuilder,
    private layoutCoreService: LayoutCoreService
  ) {}

  ngOnDestroy(): void {
      this.destroy.next(true);
      this.destroy.unsubscribe;
  }

  public addControl(form: FormGroup | FormArray, control: IControl, form_type?: string): AbstractControl {
    const validators = this.createValidator(control.validators!);
    let abstractControl: AbstractControl;
    switch(form_type) {
      case "group":
        abstractControl = this.fb.group({}, {validators})
        break;
      case "array":
        abstractControl = this.fb.array([]);
        break;
      default:
        abstractControl = this.fb.control(control.value, validators);
        break;
    }
      
    if (form.constructor.name == FormGroup.name) {
      (form as FormGroup).addControl(control.key!, abstractControl);
    } else {
      (form as FormArray).push(abstractControl);
    }

    if (control.disabled) {
      setTimeout(() => { abstractControl.disable() }, 0);      
    }
    this.createEffect(control.effects!, abstractControl);
    return abstractControl;
  }

  public createValidator(validators: IValidator[]): ValidatorFn[] {
    const response: ValidatorFn[] = [];
    if (!validators) return response;
    for (const validator of validators) {
      response.push(this.VALIDATOR_CONFIG[validator.validator_type!](validator.params!, validator.value!));
    }
    return response;
  }

  public createEffect(effects: IEffect[], control: AbstractControl): void {
    if (!effects) {
      return;
    }
    for (const effect of effects) {
      const effectComponentClass = this.EFFECT_CONFIG[effect.effect_type!];
      if (!effectComponentClass) {
        console.warn("Effect component not found");
      }
      const effectComponent = new effectComponentClass(this.destroy, effect, this.layoutCoreService, control);
      effectComponent.execute();
    }
  }

}
