import { Type } from "@angular/core";
import { IControl } from "./control.interface";
import { IBaseControl } from "./base-control.interface";

export interface IControlComponent {
    control: IControl;
    // config: any;
    load(control: IControl): void;
}

export type ControlConfig = {[key: string]: Type<IControlComponent>}

export interface IControlConfig extends IBaseControl {
    [prop: string]: any;
}