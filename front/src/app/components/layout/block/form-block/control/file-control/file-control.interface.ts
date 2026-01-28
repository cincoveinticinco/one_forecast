import { IBaseControl } from "../../../../interfaces/base-control.interface";
import { ILabel } from "../../partials/label/label.interface";

export interface IFileControl extends ILabel, IBaseControl {
    extensions_allowed?: string;
    multiple?: boolean;
    url?: string;
    max_file_size?: number;
}