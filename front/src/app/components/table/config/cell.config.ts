import { InjectionToken } from "@angular/core";
import { DateCell } from "../cell/date-cell/date-cell";
import { TextCell } from "../cell/text-cell/text-cell";
import { CellConfig } from "../interfaces/cell-component.interface";

export const CELL_CONFIG: CellConfig = {
    text: TextCell,
    date: DateCell,
}

export const CELL_CONFIG_TOKEN = new InjectionToken<string>('CELL_CONFIG');