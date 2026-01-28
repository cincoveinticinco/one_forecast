import { Type } from "@angular/core";
import { IBlock } from "./block.interface";

export interface IBlockComponent {
    block: IBlock;
    config: any;
    // load(block: IBlock): void;
    //temp TILL form config comes from backend
    load(block: IBlock): void;
}

export type BlockConfig = {[key: string]: Type<IBlockComponent>};

export interface IBlockConfig {}