import { Component, inject, Input, OnInit } from '@angular/core';
import { DynamicTableBase } from '../../lib/dynamic-table.base';
import { Table } from '../../components/table/lib/table/table';
import { FormSubmissionService } from '../../components/layout/services/form-submission/form-submission.service';
import { END_TEMPLATE_RESPONSES_COLUMNS, TEMPLATE_RESPONSES_COLUMNS } from './config/template_responses_columns';
import { cloneDeep } from 'lodash';
import { TableLazyLoadEvent } from 'primeng/table';
import { IColumn } from '../../components/table/interfaces/column.interface';

@Component({
  selector: 'app-template-responses',
  imports: [Table],
  templateUrl: './template-responses.html',
  styleUrl: './template-responses.scss',
})
export class TemplateResponses extends DynamicTableBase implements OnInit {

  @Input() tenant_id!: number;
  protected responses: any[] = [];
  private formSubmissionService = inject(FormSubmissionService);

  constructor() {
    super();
  }

  async ngOnInit(): Promise<void> {
    await this.getFilterOptions();
    this.setColumns();
  }

  getResponses = async (event?: TableLazyLoadEvent) => {
    this.getPagination(event);
    const { data, pagination } = await this.formSubmissionService.findResponses(this.id, this.getDinamicallyFilters());
    this.responses = data.length > 0 ? data.map(res => ({...res, ...res['values'], form_template_name: this.filtersOptions()['form_template'].name})) : [];
    this.pagination.set({...pagination, current_count: this.filters()['limit']});
  }

  override async getFilters(filters: Record<string, any>): Promise<void> {
    super.getFilters(filters);
    await this.getResponses();
  }

  private async getFilterOptions() {
    this.filtersOptions.set(await this.formSubmissionService.findFilterOptions(+this.id));
  }

  private setColumns() {
    this.columns.set(cloneDeep(TEMPLATE_RESPONSES_COLUMNS));
    for (const column of this.filtersOptions()['columns']) {
      const newColumn: IColumn = {
        header: column.label,
        key: column.key
      }
      this.addColumn(newColumn);
    }
    for (const column of END_TEMPLATE_RESPONSES_COLUMNS) {
      this.addColumn(column);
    }
  }

}
