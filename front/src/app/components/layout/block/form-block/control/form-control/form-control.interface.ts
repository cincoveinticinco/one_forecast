import { IBaseControl } from "../../../../interfaces/base-control.interface";
import { IControl } from "../../../../interfaces/control.interface";

export interface IFormControl extends IBaseControl {
    controls?: IControl[];
}