import { IBaseControl } from "../../../../interfaces/base-control.interface";
import { IBlock } from "../../../../interfaces/block.interface";
import { IControl } from "../../../../interfaces/control.interface";
import { ILabel } from "../../partials/label/label.interface";

export interface IArrayControl extends ILabel, IBaseControl {
    blocks?: IBlock[];
    add_config?: IAddConfig;
    has_initial: boolean;
}

export interface IAddConfig {
    show_add?: boolean;
    show_index?: boolean;
    add_text?: string;
    can_remove_first?: boolean;
    limit?: number;
}

export interface IArrayGroup {
    blocks: IBlock[];
    id?: number;
}