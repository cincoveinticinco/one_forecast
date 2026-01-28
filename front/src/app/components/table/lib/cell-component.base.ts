import { Component, OnDestroy } from "@angular/core";
import { IColumn } from "../interfaces/column.interface";

@Component({template: ''})
export abstract class CellComponentBase implements OnDestroy {

    column!: IColumn;
    row!: any;

    ngOnDestroy(): void {}

    add(column: IColumn, row: any) {
        this.column = column;
        this.row = row;
    }

}