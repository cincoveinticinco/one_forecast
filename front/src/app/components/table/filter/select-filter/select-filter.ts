import { Component } from '@angular/core';
import { FilterComponentBase } from '../../lib/filter-component.base';
import { IFilterComponent } from '../../interfaces/filter-component.interface';
import { IFilter } from '../../interfaces/filter.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { MultiSelect } from 'primeng/multiselect';

@Component({
  selector: 'app-select-filter',
  imports: [ReactiveFormsModule, MultiSelect],
  templateUrl: './select-filter.html',
  styleUrl: './select-filter.scss',
})
export class SelectFilter extends FilterComponentBase implements IFilterComponent {

  constructor() {
    super();
  }

  load(filter: IFilter) {
    this.add(filter);
  }

}
