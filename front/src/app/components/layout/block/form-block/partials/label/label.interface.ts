import { IControl } from "../../../../interfaces/control.interface";

export interface ILabel extends IControl {
    label?: string;
    help_text?: string;
    placeholder?: string;
}