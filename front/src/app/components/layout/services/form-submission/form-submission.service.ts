import { Injectable, Injector } from '@angular/core';
import { ApiService } from '../../../../services/api/api.service';
import { IFormSubmission, IFormSubmissionResponse, IFormTemplateSubmissionResponse } from '../../interfaces/form-submission.interface';
import { IFilterService } from '../../../table/interfaces/filter-service.interface';

@Injectable({
  providedIn: 'root',
})
export class FormSubmissionService extends ApiService {

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  async findByTemplate(form_template_slug: string, tenant_slug: string): Promise<IFormSubmissionResponse[]> {
    return await this.get<IFormSubmissionResponse[]>(`tenants/${tenant_slug}/form_templates/${form_template_slug}/form_submissions`);
  }

  async create(form_submission: IFormSubmission, tenant_slug: string, form_template_slug: string): Promise<{id: number}> {
    return await this.post(`tenants/${tenant_slug}/form_templates/${form_template_slug}/form_submissions`, form_submission);
  }

  async update(form_submission: IFormSubmission, tenant_slug: string, form_template_slug: string, form_submission_id: number): Promise<void> {
    return await this.patch(`tenants/${tenant_slug}/form_templates/${form_template_slug}/form_submissions/${form_submission_id}`, form_submission);
  }

  async autosave(form_submission_id: number, field: {field_key: string, value: string}): Promise<void> {
    return await this.patch(`form_submissions/${form_submission_id}/autosave`, field);
  }

  async submit(tenant_slug: string, form_template_slug: string, form_submission_id: number): Promise<void> {
    return await this.post(`tenants/${tenant_slug}/form_templates/${form_template_slug}/form_submissions/${form_submission_id}/submit`);
  }

  async findResponses(form_template_id: number, filters: Record<string, any>): Promise<IFormTemplateSubmissionResponse> {
    const params = this.buildDynamicallyParams(filters);
    return await this.get<IFormTemplateSubmissionResponse>(`form_templates/${form_template_id}/form_submissions`, { params });
  }

  async findFilterOptions(form_template_id: number): Promise<Record<string, any[]>> {
    return await this.get<Record<string, any[]>>(`form_templates/${form_template_id}/form_submissions/filter_options`);
  }
  
}
