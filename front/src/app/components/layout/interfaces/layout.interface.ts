import { IBlock } from "./block.interface";
import { IEffect } from "./effect.interface";

export interface ILayoutActionConfig {
    show_cancel?: boolean,
    show_back?: boolean,
    show_next?: boolean,
    cancel_text?: string,
    back_text?: string,
    next_text?: string,
}

export interface ILayout {
    title?: string;
    blocks?: IBlock[];
    effects?: IEffect[];
    action_config?: ILayoutActionConfig;
}