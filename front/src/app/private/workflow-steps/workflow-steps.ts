import { Component, inject, Input, OnInit } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { Table } from '../../components/table/lib/table/table';
import { DynamicTableBase } from '../../lib/dynamic-table.base';
import { IWorkflowStep } from '../../interfaces/workflow-step.interface';
import { WorkflowStepsService } from '../../services/workflow-steps/workflow-steps.service';
import { cloneDeep } from 'lodash';
import { WORKFLOW_STEPS_COLUMNS } from './config/workflow_steps_columns';
import { WORKFLOW_STEPS_ACTIONS, WORKFLOW_STEPS_GLOBAL_ACTIONS } from './config/workflow_steps_actions';
import { TableLazyLoadEvent } from 'primeng/table';
import { setDataLayout } from '../../helpers/layout/set-data-layout';
import { WORKFLOW_STEPS_FORM_LAYOUT } from './config/workflow_steps_form_layout';
import { RenderFormLayout } from '../../components/render-form-layout/render-form-layout';

@Component({
  selector: 'app-workflow-steps',
  imports: [ToastModule, ConfirmDialogModule, Table],
  templateUrl: './workflow-steps.html',
  styleUrl: './workflow-steps.scss',
})
export class WorkflowSteps extends DynamicTableBase implements OnInit {

  @Input() tenant_id!: number;
  protected steps: IWorkflowStep[] = [];
  private workflowStepsService = inject(WorkflowStepsService)

  constructor() {
    super();
  }

  async ngOnInit(): Promise<void> {
    await this.getFilterOptions();
    this.columns.set(cloneDeep(WORKFLOW_STEPS_COLUMNS))
    this.actions.set(cloneDeep(WORKFLOW_STEPS_ACTIONS))
    this.globalActions.set(cloneDeep(WORKFLOW_STEPS_GLOBAL_ACTIONS))
  }

  getSteps = async(event?: TableLazyLoadEvent) => {
    await this.getFilterOptions();
    this.getPagination(event);
    const { data, pagination } = await this.workflowStepsService.findAll(this.id, this.filters());
    this.steps = data;
    this.pagination.set({...pagination, current_count: this.filters()['limit']});
  }

  override async getFilters(filters: Record<string, any>): Promise<void> {
    super.getFilters(filters);
    await this.getSteps();
  }

  private async getFilterOptions() {
    this.filtersOptions.set({});
    // this.filtersOptions.set(await this.workflowStepsService.findFilterOptions());
  }

  async handleActions(action: {key: string, id: number}) {
    const actions: Record<string, Function> = {
      edit: this.edit,
      create: this.create,
      delete: this.delete,
    }
    await actions[action.key!](action.id);
  }

  private edit = async (id: number) => {
    //set information directly on the layout
    const layout = setDataLayout(cloneDeep(WORKFLOW_STEPS_FORM_LAYOUT), this.steps, id);
    const edit = async (body: {workflow_step: IWorkflowStep}) => {
      await this.workflowStepsService.update(body.workflow_step, id);
      await this.getSteps();
      this.openToast('success', 'Workflow step updated');
      this.closeDialog();
    }
    this.dialog = {
      component: RenderFormLayout,
      header: 'Edit workflow step',
      input_values: {
        layout,
        nextCallback: edit
      }
    }
    this.openContentDialog();
  }

  private create = async () => {
    const layout = cloneDeep(WORKFLOW_STEPS_FORM_LAYOUT);
    const create = async (body: {workflow_step: IWorkflowStep}) => {
      await this.workflowStepsService.create(body.workflow_step, this.id);
      await this.getSteps();
      this.openToast('success', 'Workflow step created');
      this.closeDialog();
    }
    this.dialog = {
      component: RenderFormLayout,
      header: 'Create workflow step',
      input_values: {
        layout,
        nextCallback: create
      }
    }
    this.openContentDialog();
  }

  private delete = async (id: number) => {
    const remove = async () => {
      await this.workflowStepsService.remove(id);
      await this.getSteps();
      this.openToast('success', 'Worflow step deleted');
    }
    this.confirmationDialog = {
      header: 'Delete workflow step',
      message: 'Do you want to delete this workflow step?',
      on_accept: remove
    }
    this.openConfirmationDialog();
  }

}
