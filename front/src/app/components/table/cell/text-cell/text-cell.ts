import { Component } from '@angular/core';
import { CellComponentBase } from '../../lib/cell-component.base';
import { ICellComponent } from '../../interfaces/cell-component.interface';
import { IColumn } from '../../interfaces/column.interface';

@Component({
  selector: 'app-text-cell',
  imports: [],
  templateUrl: './text-cell.html',
  styleUrl: './text-cell.scss',
})
export class TextCell extends CellComponentBase implements ICellComponent {

  constructor() {
    super();
  }

  load(column: IColumn, row: any) {
    this.add(column, row);
  }

}
