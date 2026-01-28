import { ILabel } from "../../partials/label/label.interface";
import { IBaseControl } from "../../../../interfaces/base-control.interface";

export interface IRadioControl extends ILabel, IBaseControl  {
    options: any[],
    option_value?: string,
    option_name?: string,
    dependent_value?: any;
    dependent_id?: string;
}