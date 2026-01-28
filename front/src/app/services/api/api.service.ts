import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { IApiService } from '../../interfaces/api-service.interface';
import { environment } from '../../../environments/environment';
import { isDateRange } from '../../helpers/services/formatDate';
import { formatDate } from '@angular/common';
import { IFilterService } from '../../components/table/interfaces/filter-service.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements IApiService {
  private httpClient: HttpClient;
  protected apiUrl = environment.apiUrl;

  constructor(
    protected injector: Injector
  ) {
    this.httpClient = injector.get(HttpClient);
  }

  async get<T>(path: string, options: { [param: string]: unknown } = {}): Promise<T> {
    return lastValueFrom(this.httpClient.get<T>(`${this.apiUrl}${path}`, options));
  }

  async post<T>(path: string, body: unknown = {}, options: { [param: string]: unknown } = {}): Promise<T> {
    return lastValueFrom(this.httpClient.post<T>(`${this.apiUrl}${path}`, body, options));
  }

  async patch<T>(path: string, body: unknown = {}, options: { [param: string]: unknown } = {}): Promise<T> {
    return lastValueFrom(this.httpClient.patch<T>(`${this.apiUrl}${path}`, body, options));
  }

  async put<T>(path: string, body: unknown = {}, options: { [param: string]: unknown } = {}): Promise<T> {
    return lastValueFrom(this.httpClient.put<T>(`${this.apiUrl}${path}`, body, options));
  }

  async delete<T>(path: string, options: { [param: string]: unknown } = {}): Promise<T> {
    return lastValueFrom(this.httpClient.delete<T>(`${this.apiUrl}${path}`, options));
  }

  buildParams(parameters: Record<string, any>): HttpParams {
    let params = new HttpParams();

    Object.entries(parameters).forEach(([key, value]) => {
      params = this.validateParam(key, value, params);
    });

    return params;
  }

  buildDynamicallyParams(parameters: Record<string, IFilterService>): HttpParams {
    let params = new HttpParams();

    Object.entries(parameters).forEach(([key, param]) => {
      const { dinamyc, value } = param;
      const newKey = dinamyc ? `filter_${key}` : key; 
      params = this.validateParam(newKey, value, params);
    });

    return params;
  }

  private validateParam(key: string, value: any, params: HttpParams): HttpParams {
    if (value === null || value === undefined || value === '') return params;

    if (isDateRange(value)) {
      const from = value[0];
      const to = value[1];
      params = params.append(`${key}_from`, formatDate(from, 'yyyy-MM-dd', 'en-US'))
      params = params.append(`${key}_to`, formatDate(to, 'yyyy-MM-dd', 'en-US'))
    } else if (Array.isArray(value)) {
      value.forEach(v => {
        params = params.append(`${key}[]`, v);
      });
    } else {
      params = params.append(key, value);
    }
    return params;
  }
  
}
