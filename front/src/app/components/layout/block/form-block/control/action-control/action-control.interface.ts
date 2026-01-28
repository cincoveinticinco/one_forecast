import { IBlock } from "../../../../interfaces/block.interface";
import { ISelectControl } from "../select-control/select-control.interface";

export interface IActionControl extends ISelectControl {
    children?: IBlock[];
}