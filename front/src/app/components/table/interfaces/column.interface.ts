import { IFilter } from "./filter.interface";

export interface IColumn {
    header?: string;
    key?: string;
    filter?: IFilter;
    sortable?: string;
    column_type?: 'date' | 'text';
}