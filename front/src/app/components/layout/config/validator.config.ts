import { Validators } from "@angular/forms";
import { ValidatorConfig, ValidatorParam } from "../interfaces/validator.interface";
import { InjectionToken } from "@angular/core";

export const VALIDATOR_CONFIG: ValidatorConfig = {
    min: (params: ValidatorParam[], value: ValidatorParam) => Validators.min(value as number),
    max: (params: ValidatorParam[], value: ValidatorParam) => Validators.max(value as number),
    required: (params: ValidatorParam[], value: ValidatorParam) => Validators.required,
    requiredTrue: (params: ValidatorParam[], value: ValidatorParam) => Validators.requiredTrue,
    email: (params: ValidatorParam[], value: ValidatorParam) => Validators.email,
    minlength: (params: ValidatorParam[], value: ValidatorParam) => Validators.minLength(value as number),
    maxlength: (params: ValidatorParam[], value: ValidatorParam) => Validators.maxLength(value as number),
    pattern: (params: ValidatorParam[], value: ValidatorParam) => Validators.pattern(value as (string | RegExp)),
}

export const VALIDATOR_CONFIG_TOKEN = new InjectionToken<string>('VALIDATOR_CONFIG');