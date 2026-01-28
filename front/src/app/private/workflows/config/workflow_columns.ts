import { IColumn } from "../../../components/table/interfaces/column.interface";

export const WORKFLOW_COLUMNS: IColumn[] = [
    {
        header: 'Name',
        key: 'name',
        column_type: 'text'
    },
    {
        header: 'Workflow type',
        key: 'workflow_type',
        column_type: 'text',
        filter: {
            filter_type: 'select',
            key: 'workflow_type',
            value: null
        }
    },
    {
        header: 'Status',
        key: 'status',
        column_type: 'text',
        filter: {
            filter_type: 'select',
            key: 'status',
            value: null
        }
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