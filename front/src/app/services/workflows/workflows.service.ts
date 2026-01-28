import { Injectable, Injector } from '@angular/core';
import { ApiService } from '../api/api.service';
import { IWorkflow } from '../../interfaces/workflow.interface';
import { IPagination } from '../../components/table/interfaces/pagination.interface';

@Injectable({
  providedIn: 'root',
})
export class WorkflowsService extends ApiService {
  
  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  async findAll(tenant_id: number, filters: Record<string, any>): Promise<{data: IWorkflow[], pagination: IPagination[]}> {
    const params = this.buildParams(filters);
    return await this.get<{data: IWorkflow[], pagination: IPagination[]}>(`tenants/${tenant_id}/workflows`, { params });
  }
  
  async find(workflow_id: number): Promise<IWorkflow> {
    return await this.get<IWorkflow>(`workflows/${workflow_id}`);
  }

  async create(workflow: IWorkflow): Promise<void> {
    return await this.post(`workflows`, { workflow });
  }

  async update(workflow: IWorkflow, workflow_id: number): Promise<void> {
    return await this.put(`workflows/${workflow_id}`, { workflow });
  }

  async remove(workflow_id: number): Promise<void> {
    return await this.delete(`workflows/${workflow_id}`);
  }

  async findFilterOptions(): Promise<Record<string, unknown>> {
    return await this.get<Record<string, unknown>>(`workflows/filter_options`);
  }

}
