import { Injectable, Injector } from '@angular/core';
import { ApiService } from '../../../../services/api/api.service';
import { IFieldLayoutBack, IFormTemplate } from '../../../../interfaces/field-layout-back.interface';

interface ITemplateFilterOptions {
  status: string[];
  template_type: string[];
  access_type: string[];
  order: string[];
}

@Injectable({
  providedIn: 'root',
})
export class FormTemplateService extends ApiService {

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  async findAll(): Promise<IFormTemplate[]> {
    return await this.get<IFormTemplate[]>(`form_templates`);
  }
  
  async find(form_template_slug: string, tenant_slug: string): Promise<IFieldLayoutBack[]> {
    return await this.get<IFieldLayoutBack[]>(`tenants/${tenant_slug}/form_templates/${form_template_slug}/tree`);
  }

  async create(form_template: IFormTemplate): Promise<void> {
    return await this.post(`form_templates`, { form_template });
  }

  async update(form_template: IFormTemplate, form_template_id: number): Promise<void> {
    return await this.patch(`form_templates/${form_template_id}`, { form_template });
  }

  async publish(form_template_id: number): Promise<void> {
    return await this.post(`form_templates/${form_template_id}/publish`);
  }
  
  async unpublish(form_template_id: number): Promise<void> {
    return await this.post(`form_templates/${form_template_id}/unpublish`);
  }

  async archive(form_template_id: number): Promise<void> {
    return await this.post(`form_templates/${form_template_id}/archive`);
  }

  async restore(form_template_id: number): Promise<void> {
    return await this.post(`form_templates/${form_template_id}/restore`);
  }

  async duplicate(form_template_id: number): Promise<void> {
    return await this.post(`form_templates/${form_template_id}/duplicate`);
  }

  async remove(form_template_id: number): Promise<void> {
    return await this.delete(`form_templates/${form_template_id}`);
  }

  async findFilterOptions(): Promise<Record<string, unknown>> {
    return await this.get<Record<string, unknown>>(`form_templates/filter_options`);
  }

  async assignWorkflow(form_template_id: number, workflow_id: number) {
    return await this.post(`form_template/${form_template_id}/assign_workflow`, { workflow_id });
  }
  
}
