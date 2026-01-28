import { InjectionToken } from "@angular/core";
import { DisableControlEffect } from "../effects/disable-control.effect";
import { EffectConfig } from "../interfaces/effect.interface";
import { ChangeListControlEffect } from "../effects/changelist-control.effect";
import { ChangeCurrencyControlEffect } from "../effects/changecurrency-control.effect";
import { HiddenControlEffect } from "../effects/hidden-control.effect";
import { AutosaveLayoutEffect } from "../effects/autosave-layout.effect";

export const EFFECT_CONFIG: EffectConfig = {
    disable: DisableControlEffect,
    changelist: ChangeListControlEffect,
    changecurrency: ChangeCurrencyControlEffect,
    hidden: HiddenControlEffect,
}

export const EFFECT_CONFIG_TOKEN = new InjectionToken<string>('EFFECT_CONFIG');

export const LAYOUT_EFFECT_CONFIG: EffectConfig = {
    autosave: AutosaveLayoutEffect
};

export const LAYOUT_EFFECT_CONFIG_TOKEN = new InjectionToken<string>('LAYOUT_EFFECT_CONFIG');