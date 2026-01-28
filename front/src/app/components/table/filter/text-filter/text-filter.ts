import { Component } from '@angular/core';
import { FilterComponentBase } from '../../lib/filter-component.base';
import { IFilterComponent } from '../../interfaces/filter-component.interface';
import { IFilter } from '../../interfaces/filter.interface';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { FormService } from '../../../layout/services/form/form.service';
import { LayoutCoreService } from '../../../layout/services/layout-core/layout-core.service';

@Component({
  selector: 'app-text-filter',
  imports: [ReactiveFormsModule, InputText, ],
  templateUrl: './text-filter.html',
  styleUrl: './text-filter.scss',
})
export class TextFilter extends FilterComponentBase implements IFilterComponent {

  constructor(
  ) {
    super();
  }

  load(filter: IFilter) {
    this.add(filter);
  }

}
