import { IBaseControl } from "../../../../interfaces/base-control.interface";
import { ILabel } from "../../partials/label/label.interface";

export interface ICreditcardnumberControl extends ILabel, IBaseControl {
    number_to_show?: number;
}