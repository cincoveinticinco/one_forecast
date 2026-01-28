import { IBaseControl } from "../../../../interfaces/base-control.interface";
import { ILabel } from "../../partials/label/label.interface";


export interface ICheckControl extends ILabel, IBaseControl {
    options: any[];
    option_value?: string,
    option_name?: string,
}