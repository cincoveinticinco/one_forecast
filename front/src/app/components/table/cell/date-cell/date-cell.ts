import { Component } from '@angular/core';
import { CellComponentBase } from '../../lib/cell-component.base';
import { ICellComponent } from '../../interfaces/cell-component.interface';
import { IColumn } from '../../interfaces/column.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date-cell',
  imports: [DatePipe],
  templateUrl: './date-cell.html',
  styleUrl: './date-cell.scss',
})
export class DateCell extends CellComponentBase implements ICellComponent {

  constructor() {
    super();
  }

  load(column: IColumn, row: any) {
    this.add(column, row);
  }

}
