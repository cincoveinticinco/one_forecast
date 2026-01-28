import { Injectable, Injector } from '@angular/core';
import { ApiService } from '../../../../services/api/api.service';
import { HttpParams } from '@angular/common/http';
import { IFormSubmissionFieldResponse } from '../../interfaces/form-submission.interface';

@Injectable({
  providedIn: 'root',
})
export class FormSubmissionValuesService extends ApiService {

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  async findById(form_template_slug: string, tenant_slug: string, form_submission_id: number): Promise<IFormSubmissionFieldResponse[]> {
    const params = new HttpParams()
      .set('form_submission_id', `${form_submission_id}`)
    return await this.get<IFormSubmissionFieldResponse[]>(`tenants/${tenant_slug}/form_templates/${form_template_slug}/form_submission_values`, { params });
  }
  
}

