import { Type } from "@angular/core";
import { Subject } from "rxjs";

export type EffectParam = number | string | number[] | string[] | boolean | Function;

export interface IEffect {
    effect_type?: string,
    key?: string,
    key_control?: string,
    target_path?: string,
    value_path?: any,
    params?: EffectParam[];
}

export interface IEffectComponent {
    destroy: Subject<boolean>;
    effect: IEffect;
    // layoutCoreService: LayoutCoreService;
    init(): void;
    execute(): void;
}

export type EffectConfig = {[key: string]: Type<IEffectComponent>}