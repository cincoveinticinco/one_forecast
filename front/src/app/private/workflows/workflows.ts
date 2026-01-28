import { Component, inject, OnInit } from '@angular/core';
import { Table } from '../../components/table/lib/table/table';
import { DynamicTableBase } from '../../lib/dynamic-table.base';
import { RenderFormLayout } from '../../components/render-form-layout/render-form-layout';
import { cloneDeep } from 'lodash';
import { setDataLayout } from '../../helpers/layout/set-data-layout';
import { WORKFLOW_FORM_LAYOUT } from './config/workflow_form_layout';
import { IWorkflow } from '../../interfaces/workflow.interface';
import { WorkflowsService } from '../../services/workflows/workflows.service';
import { WORKFLOW_COLUMNS } from './config/workflow_columns';
import { WORKFLOW_ACTIONS, WORKFLOW_GLOBAL_ACTIONS } from './config/workflow_actions';
import { TableLazyLoadEvent } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-workflows',
  imports: [Table, ToastModule, ConfirmDialogModule],
  templateUrl: './workflows.html',
  styleUrl: './workflows.scss',
})
export class Workflows extends DynamicTableBase implements OnInit {

  protected workflows: IWorkflow[] = [];
  private workflowService = inject(WorkflowsService)

  constructor() {
    super();
  }

  async ngOnInit(): Promise<void> {
    await this.getFilterOptions();
    this.columns.set(cloneDeep(WORKFLOW_COLUMNS))
    this.actions.set(cloneDeep(WORKFLOW_ACTIONS))
    this.globalActions.set(cloneDeep(WORKFLOW_GLOBAL_ACTIONS))
  }

  getWorkflows = async(event?: TableLazyLoadEvent) => {
    await this.getFilterOptions();
    this.getPagination(event);
    const { data, pagination } = await this.workflowService.findAll(this.id, this.filters());
    this.workflows = data;
    this.pagination.set({...pagination, current_count: this.filters()['limit']});
  }

  override async getFilters(filters: Record<string, any>): Promise<void> {
    super.getFilters(filters);
    await this.getWorkflows();
  }

  private async getFilterOptions() {
    this.filtersOptions.set(await this.workflowService.findFilterOptions());
  }

  async handleActions(action: {key: string, id: number}) {
    const actions: Record<string, Function> = {
      edit: this.edit,
      create: this.create,
      delete: this.delete,
      settings: this.settings,
    }
    await actions[action.key!](action.id);
  }

  private edit = async (id: number) => {
    //set information directly on the layout
    const layout = setDataLayout(cloneDeep(WORKFLOW_FORM_LAYOUT), this.workflows, id);
    const edit = async (body: {workflow: IWorkflow}) => {
      await this.workflowService.update(body.workflow, id);
      await this.getWorkflows();
      this.openToast('success', 'Workflows updated');
      this.closeDialog();
    }
    this.dialog = {
      component: RenderFormLayout,
      header: 'Edit workflow',
      input_values: {
        layout,
        nextCallback: edit
      }
    }
    this.openContentDialog();
  }

  private create = async () => {
    const layout = cloneDeep(WORKFLOW_FORM_LAYOUT);
    const create = async (body: {workflow: IWorkflow}) => {
      await this.workflowService.create({...body.workflow, tenant_id: this.id});
      await this.getWorkflows();
      this.openToast('success', 'Workflow created');
      this.closeDialog();
    }
    this.dialog = {
      component: RenderFormLayout,
      header: 'Edit workflow',
      input_values: {
        layout,
        nextCallback: create
      }
    }
    this.openContentDialog();
  }

  private delete = async (id: number) => {
    const remove = async () => {
      await this.workflowService.remove(id);
      await this.getWorkflows();
      this.openToast('success', 'Worflow deleted');
    }
    this.confirmationDialog = {
      header: 'Delete workflow',
      message: 'Do you want to delete this workflow?',
      on_accept: remove
    }
    this.openConfirmationDialog();
  }

  private settings = async(id: number) => {
    this.router.navigate([this.id, 'workflow', 'steps', id]);
  }
}
