import { MenuItem } from "primeng/api";
import { ButtonSeverity } from "primeng/button";

export interface IActionTable<T> extends MenuItem {
    key?: string;
    severity?: ButtonSeverity;
    is_visible?: (row: T) => boolean;
}