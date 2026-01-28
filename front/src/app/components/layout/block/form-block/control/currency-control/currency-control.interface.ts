import { IBaseControl } from "../../../../interfaces/base-control.interface";
import { ILabel } from "../../partials/label/label.interface";

export interface ICurrencyControl extends ILabel, IBaseControl {
    currency?: string,
    locale?: string,
}