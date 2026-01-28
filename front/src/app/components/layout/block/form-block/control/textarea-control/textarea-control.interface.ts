import { IBaseControl } from "../../../../interfaces/base-control.interface";
import { ILabel } from "../../partials/label/label.interface";

export interface ITextareControl extends ILabel, IBaseControl {
    rows?: number,
    auto_resize?: boolean,
}