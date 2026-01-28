import { Type } from "@angular/core";
import { IColumn } from "./column.interface";

export interface ICellComponent {
    column: IColumn;
    load(column: IColumn, row: any): void;
}

export type CellConfig = {[key: string]: Type<ICellComponent>};