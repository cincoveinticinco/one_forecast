import { IColumn } from "../../../components/table/interfaces/column.interface";

export const TEMPLATE_COLUMNS: IColumn[] = [
    {
        header: 'Name',
        key: 'name',
        column_type: 'text',
    },
    {
        header: 'Status',
        key: 'status',
        column_type: 'text',
        filter: {
            key: 'status',
            filter_type: 'select',
            value: null
        }
    },
    {
        header: 'Template type',
        key: 'template_type',
        column_type: 'text',
        filter: {
            key: 'template_type',
            filter_type: 'select',
            value: null
        }
    },
    {
        header: 'Access type',
        key: 'access_type',
        column_type: 'text',
        filter: {
            key: 'access_type',
            filter_type: 'select',
            value: null
        }
    },
    {
        header: 'Slug',
        key: 'slug',
        column_type: 'text',
    },
    {
        header: 'URL',
        key: 'url_front',
        column_type: 'text',
    },
    {
        header: 'Published at',
        key: 'published_at',
        column_type: 'date',
    },
    {
        header: 'Archived at',
        key: 'archived_at',
        column_type: 'date',
    },
    {
        header: 'Created at',
        key: 'created_at',
        column_type: 'date',
    },
    {
        header: 'Updated at',
        key: 'updated_at',
        column_type: 'date',
    },
]