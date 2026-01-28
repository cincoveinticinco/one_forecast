export interface IFilter {
    filter_type: FilterType;
    key: string;
    value: any;
    placeholder?: string;
    options?: Option[]
}

type FilterType = 'text' | 'select' | 'date' | 'multiselect';

type Option = { id: string, name: string }