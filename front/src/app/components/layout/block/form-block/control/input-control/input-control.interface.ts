import { IBaseControl } from "../../../../interfaces/base-control.interface";
import { ILabel } from "../../partials/label/label.interface";

export interface IInputControl extends ILabel, IBaseControl {
    type?: string;
}