import { Component } from '@angular/core';
import { FilterComponentBase } from '../../lib/filter-component.base';
import { IFilterComponent } from '../../interfaces/filter-component.interface';
import { IFilter } from '../../interfaces/filter.interface';

@Component({
  selector: 'app-check-filter',
  imports: [],
  templateUrl: './check-filter.html',
  styleUrl: './check-filter.scss',
})
export class CheckFilter extends FilterComponentBase implements IFilterComponent {

  constructor() {
    super();
  }

  load(filter: IFilter) {
    this.add(filter);
  }

}
