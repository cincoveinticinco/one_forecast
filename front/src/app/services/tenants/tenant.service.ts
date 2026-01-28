import { Injectable, Injector } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ITenant } from '../../interfaces/tenant.interface';
import { IFormTemplate } from '../../interfaces/field-layout-back.interface';
import { IPagination } from '../../components/table/interfaces/pagination.interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TenantService extends ApiService {
  
  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  async findAll(): Promise<ITenant[]> {
    return await this.get<ITenant[]>(`tenants`);
  }

  async findTemplatesByTenant(tenant_id: number, filters: Record<string, any>): Promise<{data: IFormTemplate[], pagination: IPagination}> {
    const params = this.buildParams(filters);
    return await this.get<{data: IFormTemplate[], pagination: IPagination}>(`tenants/${tenant_id}/form_templates`, { params });
  }

}
