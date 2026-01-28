import { IPagination } from "../../table/interfaces/pagination.interface";

export interface IFormSubmissionResponse {
    id?: number;
    status?: 'submitted' | 'draft';
    submitted_at?: Date;
    values?: IFormSubmissionField[];
}

export interface IFormSubmission {
    form_submission: IFormSubmissionValuesAttributes;
}

export interface IFormSubmissionValuesAttributes {
    form_submission_values_attributes: IFormSubmissionField[]
}

export interface IFormSubmissionField {
    id?: number,
    form_field_id: number,
    value: any
}

export interface IFormSubmissionFieldResponse {
    id?: number,
    response?: any,
    form_field_id?: number,
    key?: string,
    label?: string,
    created_at?: Date,
}

export interface IFormTemplateSubmissionResponse {
    data: Record<string, any>[],
    pagination: IPagination
}