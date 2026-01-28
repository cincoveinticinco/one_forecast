import { IBaseControl } from "../../../../interfaces/base-control.interface";
import { ILabel } from "../../partials/label/label.interface";

export interface IDateControl extends ILabel, IBaseControl {
    date_format?: string, //yy | mm/yy 
    min_date?: string,
    max_date?: string,
    range?: boolean,
    time_only?: boolean,
    view?: 'month' | 'year' | 'date'
}