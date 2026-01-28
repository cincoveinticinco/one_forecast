import { Injectable, Injector } from '@angular/core';
import { ApiService } from '../api/api.service';
import { IWorkflowStep } from '../../interfaces/workflow-step.interface';
import { IPagination } from '../../components/table/interfaces/pagination.interface';

@Injectable({
  providedIn: 'root',
})
export class WorkflowStepsService extends ApiService {

  constructor(injector: Injector) {
    super(injector);
  }

  async findAll(workflow_id: number, filters: Record<string, any>): Promise<{data: IWorkflowStep[], pagination: IPagination[]}> {
    const params = this.buildParams(filters);
    return await this.get<{data: IWorkflowStep[], pagination: IPagination[]}>(`workflows/${workflow_id}/workflow_steps`, { params });
  }
  
  async find(workflow_step_id: number): Promise<IWorkflowStep> {
    return await this.get<IWorkflowStep>(`workflow_steps/${workflow_step_id}`);
  }

  async create(workflow_step: IWorkflowStep, workflow_id: number): Promise<void> {
    return await this.post(`workflows/${workflow_id}/workflow_steps`, { workflow_step });
  }

  async update(workflow_step: IWorkflowStep, workflow_step_id: number): Promise<void> {
    return await this.put(`workflows/${workflow_step_id}`, { workflow_step });
  }

  async remove(workflow_step_id: number): Promise<void> {
    return await this.delete(`workflow_steps/${workflow_step_id}`);
  }

  async findFilterOptions(): Promise<Record<string, unknown>> {
    return await this.get<Record<string, unknown>>(`workflow_steps/filter_options`);
  }
  
}
