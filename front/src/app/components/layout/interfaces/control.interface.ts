import { IControlConfig } from "./control-component.interface";
import { IEffect } from "./effect.interface";
import { IValidator } from "./validator.interface";

export interface IControl {
    key: string;
    classes?: string;
    effects?: IEffect[];
    validators?: IValidator[];
    disabled?: boolean;
    hidden?: boolean;
    config?: IControlConfig;
    value?: any;
}