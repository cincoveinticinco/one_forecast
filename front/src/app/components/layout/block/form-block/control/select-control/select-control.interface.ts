import { ILabel } from "../../partials/label/label.interface";

export interface ISelectControl extends ILabel {
    options?: any[];
    option_label?: string,
    option_value?: string;
    multiple?: boolean;
    searchable?: boolean;
    limit_multiple?: number;
    can_select_all?: boolean;
    add_options?: boolean;
}