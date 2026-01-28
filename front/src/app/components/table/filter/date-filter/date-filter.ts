import { Component } from '@angular/core';
import { FilterComponentBase } from '../../lib/filter-component.base';
import { IFilterComponent } from '../../interfaces/filter-component.interface';
import { IFilter } from '../../interfaces/filter.interface';
import { DatePickerModule } from 'primeng/datepicker';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-filter',
  imports: [DatePickerModule, ReactiveFormsModule],
  templateUrl: './date-filter.html',
  styleUrl: './date-filter.scss',
})
export class DateFilter extends FilterComponentBase implements IFilterComponent {

  constructor() {
    super();
  }

  load(filter: IFilter) {
    this.add(filter);
  }

}
